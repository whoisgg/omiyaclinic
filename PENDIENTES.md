# Omiya Clinic — Pendientes

> Lista viva de lo que falta para pasar del wireframe/demo al producto. Marca con `[x]` cuando esté hecho.

---

## 🗄️ Backend (Supabase)  ✅ baseline listo

- [x] Schema base (todas las tablas + índices + RLS)
- [x] RLS policies (catálogo público; pacientes/reservas/pagos vía SECURITY DEFINER RPC)
- [x] Función SQL `available_slots(profesional_id, fecha, duration_min)`
- [x] Función `create_pending_reservation` (booking atómico anti-doble-reserva)
- [x] Función `get_reservation_summary` (para pantalla de confirmación)
- [x] Función `confirm_reservation_payment` (idempotente, webhook MP)
- [x] Función + cron `expire_pending_reservations` (corre cada minuto vía pg_cron)

## 💳 Pagos — Mercado Pago  ⏳ código listo, faltan credenciales

- [x] Lib `src/lib/mp.ts` con Checkout Pro Preference + payment lookup + HMAC signature verify
- [x] `POST /api/mp/webhook` valida firma, llama `confirm_reservation_payment`, idempotente
- [x] Server action `bookReservationAction` redirige a `init_point` cuando MP está configurado, mock-mode si no
- [x] `/reserva/confirmacion?id=...` lee la reserva real (incluyendo estado para mostrar el copy correcto)
- [x] `/reserva/error?id=...&reason=...` cubre rechazo / pending / expirada
- [ ] **Pegar credenciales** en `.env.local`:
  - `MP_ACCESS_TOKEN` (Producción o Test) del panel https://www.mercadopago.cl/developers/panel/app
  - `MP_WEBHOOK_SECRET` (settings → webhooks → secret)
  - `NEXT_PUBLIC_SITE_URL` apuntando al dominio público (en dev usar ngrok si quieres probar el webhook real)
- [ ] Probar end-to-end con tarjeta sandbox MP (Visa 4509 9535 6623 3704 / CVV 123 / 11/30)
- [ ] Para producción: configurar el webhook en MP apuntando a `https://omiyaclinic.cl/api/mp/webhook`

## 📅 Calendario y notificaciones

- [x] **Export a Google Calendar / .ics desde la pantalla de confirmación**
  - [x] Generar archivo `.ics` (RFC 5545) válido para Apple Calendar, Outlook, etc.
  - [x] URL de "Add to Google Calendar" usando el template
  - [x] Botón **"Agregar a calendario"** abre menú con 3 opciones: Google, Outlook, descargar .ics
  - [x] Incluir: nombre del servicio, profesional, ubicación física (Del Pucará 50, Of. 410, Machalí), 60 min de recordatorio
- [ ] Observabilidad route handlers (estructured logs + error tracking) — para cuando despleguemos a Vercel
- [ ] Email de confirmación (Resend / Vercel Email) con `.ics` adjunto
- [ ] WhatsApp Cloud API o Twilio para notificación de confirmación
- [ ] Recordatorio automático 24h antes (cron + email/WhatsApp)
- [ ] Política de cancelación: hasta 24h antes con reembolso del abono

## 🖥️ Back-office (panel interno)

- [ ] Login para el equipo (Supabase Auth + RLS por rol)
- [ ] Vista de agenda diaria/semanal por profesional
- [ ] Acciones: confirmar manualmente, reagendar, marcar no-show, reembolsar
- [ ] CRUD de servicios y profesionales (sin tocar código)
- [ ] Dashboard básico: reservas del mes, ingresos, tasa de no-show

## 🎨 Frontend / UX

- [ ] Definir paleta final (ya estamos cerca: cremoso + dorado #b08a4f + negro)
- [ ] Tipografías finales (Geist + Montserrat + Ovo ya cargadas; revisar consistencia)
- [ ] Fotos reales: hero, fundadora, equipo, clínica (reemplazar placeholders del repo de referencia)
- [ ] Video del hero scrubbing: producir uno propio (10–15s, 30fps, optimizado para web)
- [ ] Mobile del scrubbing hero (actualmente solo desktop está pulido)
- [ ] Página de detalle de tratamiento con galería real + antes/después
- [ ] SEO: metadata por página, sitemap, robots.txt, Open Graph images
- [ ] Accesibilidad: contraste de cremoso/dorado sobre blanco, focus states, alt text

## ⚙️ Infra y deploys

- [ ] Conectar repo a Vercel
- [ ] Variables de entorno productivas (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `MP_ACCESS_TOKEN`, etc.)
- [ ] Dominio `omiyaclinic.cl` apuntado
- [ ] Supabase project (separado del dev local)
- [ ] Logs / observabilidad (Vercel Observability + Sentry opcional)

## 📋 Pendiente con la clínica

- [ ] Lista real de servicios, duraciones, precios y montos de abono
- [ ] Política de cancelación y reembolso por escrito
- [ ] Horarios oficiales de atención
- [ ] CV / credenciales del equipo médico
- [ ] Fotos clínicas (instalaciones y antes/después con consentimiento)
- [ ] Texto definitivo de "Acerca de" y filosofía
