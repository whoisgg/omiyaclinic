import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getPayment, verifyWebhookSignature, isMpConfigured } from "@/lib/mp";

/**
 * POST /api/mp/webhook
 * Mercado Pago calls this on every payment status change. We:
 *   1. Verify the signature (when MP_WEBHOOK_SECRET is set)
 *   2. Look up the payment via the MP API to confirm its real status
 *   3. Resolve the reserva via the payment's `external_reference`
 *   4. Call `confirm_reservation_payment` RPC to update reserva + insert pago
 *
 * MP retries on non-2xx, so this handler must be idempotent (it is — the RPC
 * is upsert-by-mp_payment_id).
 */
export async function POST(request: NextRequest) {
  if (!isMpConfigured()) {
    return NextResponse.json({ ok: true, ignored: "mp_not_configured" });
  }

  const signature = request.headers.get("x-signature");
  const requestId = request.headers.get("x-request-id");
  const dataId = request.nextUrl.searchParams.get("data.id") ?? request.nextUrl.searchParams.get("id");

  // Parse the body once; MP sends either {data: {id}} or query-param style
  let body: { type?: string; action?: string; data?: { id?: string | number } } = {};
  try {
    body = await request.json();
  } catch {
    /* MP sometimes sends no body — query params carry the id */
  }

  const paymentId = body.data?.id ? String(body.data.id) : dataId;
  if (!paymentId) {
    console.warn("[mp.webhook] no payment id in body or query");
    return NextResponse.json({ ok: false, error: "no_payment_id" }, { status: 400 });
  }

  const valid = await verifyWebhookSignature({ signature, requestId, dataId: paymentId });
  if (!valid) {
    console.warn("[mp.webhook] invalid signature");
    return NextResponse.json({ ok: false, error: "invalid_signature" }, { status: 401 });
  }

  // We only care about payment notifications
  const type = body.type ?? body.action?.split(".")[0];
  if (type && type !== "payment") {
    return NextResponse.json({ ok: true, ignored: type });
  }

  const payment = await getPayment(paymentId);
  if (!payment) {
    return NextResponse.json({ ok: false, error: "payment_lookup_failed" }, { status: 502 });
  }

  const reservaId = payment.externalReference;
  if (!reservaId) {
    console.warn("[mp.webhook] payment has no external_reference", paymentId);
    return NextResponse.json({ ok: false, error: "no_external_reference" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .rpc("confirm_reservation_payment", {
      p_reserva_id: reservaId,
      p_mp_payment_id: payment.id,
      p_monto_clp: Math.round(payment.transactionAmount ?? 0),
      p_mp_status: payment.status,
      p_raw_payload: payment.raw,
    })
    .single();

  if (error) {
    console.error("[mp.webhook] confirm_reservation_payment failed", error);
    return NextResponse.json({ ok: false, error: "rpc_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, result: data });
}

// MP also issues GETs as health checks — return 200 OK so they don't mark us as down.
export async function GET() {
  return NextResponse.json({ ok: true });
}
