/**
 * Mercado Pago Checkout Pro integration.
 *
 * Graceful degradation: if `MP_ACCESS_TOKEN` is not set, `isMpConfigured()`
 * returns false and the booking flow falls back to the mock path (redirect
 * directly to /reserva/confirmacion). When the env var is present, the
 * server action redirects users to MP's hosted Checkout Pro.
 */
import "server-only";
import MercadoPago, { Preference, Payment } from "mercadopago";
import type { ReservationSummary } from "@/lib/booking";

const ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export function isMpConfigured(): boolean {
  return Boolean(ACCESS_TOKEN);
}

let _client: InstanceType<typeof MercadoPago> | null = null;
function getClient() {
  if (!ACCESS_TOKEN) throw new Error("MP_ACCESS_TOKEN is not set");
  if (!_client) {
    _client = new MercadoPago({
      accessToken: ACCESS_TOKEN,
      options: { timeout: 8000 },
    });
  }
  return _client;
}

export type PreferenceResult = {
  preferenceId: string;
  initPoint: string;
  sandboxInitPoint: string | null;
};

/**
 * Creates a Checkout Pro preference for the given reserva. Returns the init
 * point URL we redirect the user to. The reserva id is stored as
 * `external_reference` so the webhook can correlate the payment back.
 */
export async function createCheckoutPreference(
  reservation: ReservationSummary,
): Promise<PreferenceResult> {
  if (!ACCESS_TOKEN) throw new Error("MP_ACCESS_TOKEN is not set");

  const preference = new Preference(getClient());
  const successUrl = SITE_URL
    ? `${SITE_URL}/reserva/confirmacion?id=${reservation.reservaId}`
    : undefined;
  const failureUrl = SITE_URL
    ? `${SITE_URL}/reserva/error?id=${reservation.reservaId}`
    : undefined;
  const notificationUrl = SITE_URL
    ? `${SITE_URL}/api/mp/webhook`
    : undefined;

  const result = await preference.create({
    body: {
      items: [
        {
          id: reservation.servicioSlug,
          title: `Abono ${reservation.servicioName} — Omiya Clinic`,
          description: `Reserva con ${reservation.profesionalName} · ${reservation.fecha} ${reservation.horaInicio.slice(0, 5)}`,
          quantity: 1,
          unit_price: reservation.depositClp,
          currency_id: "CLP",
        },
      ],
      external_reference: reservation.reservaId,
      payer: reservation.pacienteEmail
        ? { email: reservation.pacienteEmail }
        : undefined,
      back_urls:
        successUrl && failureUrl
          ? { success: successUrl, failure: failureUrl, pending: successUrl }
          : undefined,
      auto_return: successUrl ? "approved" : undefined,
      notification_url: notificationUrl,
      // MP rejects pending TTL > 24h, ours is 10 min so the window matches
      expires: true,
      expiration_date_to: reservation.expiresAt ?? undefined,
      metadata: { reserva_id: reservation.reservaId },
    },
  });

  const initPoint = result.init_point;
  const sandboxInitPoint = result.sandbox_init_point ?? null;
  const id = result.id;
  if (!id || !initPoint) {
    throw new Error("MP preference response missing id or init_point");
  }
  return {
    preferenceId: id,
    initPoint,
    sandboxInitPoint,
  };
}

export type MpPayment = {
  id: string;
  status: string; // 'approved' | 'rejected' | 'cancelled' | 'pending' | 'in_process' | 'refunded' | 'charged_back' | etc.
  statusDetail: string | null;
  externalReference: string | null;
  transactionAmount: number | null;
  raw: unknown;
};

/**
 * Looks up a payment by id (used inside the webhook handler).
 */
export async function getPayment(paymentId: string): Promise<MpPayment | null> {
  if (!ACCESS_TOKEN) return null;
  try {
    const payment = new Payment(getClient());
    const result = await payment.get({ id: paymentId });
    return {
      id: String(result.id),
      status: result.status ?? "unknown",
      statusDetail: result.status_detail ?? null,
      externalReference: result.external_reference ?? null,
      transactionAmount: result.transaction_amount ?? null,
      raw: result,
    };
  } catch (err) {
    console.error("[mp.getPayment]", err);
    return null;
  }
}

/**
 * Verifies MP's `x-signature` header per
 * https://www.mercadopago.com/developers/en/docs/your-integrations/notifications/webhooks
 *
 * If `MP_WEBHOOK_SECRET` is not set we accept without verification but log a
 * warning. Production deployments must set this.
 */
export async function verifyWebhookSignature(opts: {
  signature: string | null;
  requestId: string | null;
  dataId: string | null;
}): Promise<boolean> {
  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) {
    console.warn("[mp.verifyWebhookSignature] MP_WEBHOOK_SECRET not set — accepting webhook without verification");
    return true;
  }
  if (!opts.signature || !opts.requestId || !opts.dataId) return false;

  // Parse "ts=...,v1=..." format
  const parts = Object.fromEntries(
    opts.signature.split(",").map((kv) => {
      const [k, v] = kv.split("=");
      return [k.trim(), v?.trim() ?? ""];
    }),
  );
  const ts = parts.ts;
  const v1 = parts.v1;
  if (!ts || !v1) return false;

  const manifest = `id:${opts.dataId};request-id:${opts.requestId};ts:${ts};`;
  const { createHmac, timingSafeEqual } = await import("node:crypto");
  const expected = createHmac("sha256", secret).update(manifest).digest("hex");

  // timingSafeEqual requires equal-length buffers
  const a = Buffer.from(v1, "hex");
  const b = Buffer.from(expected, "hex");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
