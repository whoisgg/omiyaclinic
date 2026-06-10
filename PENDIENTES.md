# Omiya Clinic — Pendientes

> Lista viva de lo que falta para pasar del wireframe/demo al producto. Marca con `[x]` cuando esté hecho.

---

## 🏗️ Arquitectura (decisión 2026-06-10)

El sitio es **100% estático/informativo**. La agenda y el pago se manejan fuera:

- **Agenda online:** Dentalink — `https://draantonietaortegamunoz.dentalink.cl/administracion/agendaonline/completa/citas`
  (todos los botones *Agendar* / *Reservar* abren este link)
- **Link de pago:** HealthAtom — `https://ff.healthatom.io/txzPhD` (linkeado en /contacto; revisar cómo funciona exactamente con la clínica)
- Ambos links viven en `src/lib/links.ts`.

Se eliminó todo el stack anterior: Supabase (schema de reservas, RLS, RPCs), Mercado Pago
(checkout + webhook), flujo `/reserva`, export a calendario `.ics`. El proyecto de Supabase
ya no existía en la cuenta. Si algún día se retoma, está en el historial de git
(commit `ee88fe9` "Booking system end-to-end").

- [ ] Confirmar con la clínica cómo opera el link de pago HealthAtom (¿abono? ¿por tratamiento?)
- [ ] Revisar el link de Dentalink: la URL contiene `/administracion/` — verificar que sea la URL pública para pacientes y no la del panel interno

## 📦 Catálogo de tratamientos

Ahora vive en código: `src/lib/treatments.ts` (datos estáticos, editar ahí).

- [ ] ⚠️ Los 8 tratamientos actuales son **placeholder** — reemplazar con la lista real (nombres, descripciones, duraciones, precios)
- [ ] Decidir si mostrar precios públicamente o solo "desde $X" / consultar

## 🎨 Frontend / UX

- [ ] Definir paleta final (ya estamos cerca: cremoso + dorado #b08a4f + negro)
- [ ] Tipografías finales (Geist + Montserrat + Ovo ya cargadas; revisar consistencia)
- [ ] Fotos reales: hero, fundadora, equipo, clínica (reemplazar placeholders del repo de referencia)
- [ ] Video del hero scrubbing: producir uno propio (10–15s, 30fps, optimizado para web)
- [ ] Mobile del scrubbing hero (actualmente solo desktop está pulido)
- [ ] Página de detalle de tratamiento con galería real + antes/después
- [ ] Google Maps embed real en /contacto
- [ ] Teléfono real en /contacto (hoy dice "+56 9 …") + botón WhatsApp
- [ ] SEO: metadata por página, sitemap, robots.txt, Open Graph images
- [ ] Accesibilidad: contraste de cremoso/dorado sobre blanco, focus states, alt text

## ⚙️ Infra y deploys

- [ ] Conectar repo a Vercel (ya no requiere variables de entorno)
- [ ] Dominio `omiyaclinic.cl` apuntado

## 📋 Pendiente con la clínica

- [ ] Lista real de servicios, duraciones y precios
- [ ] Horarios oficiales de atención
- [ ] CV / credenciales del equipo médico
- [ ] Fotos clínicas (instalaciones y antes/después con consentimiento)
- [ ] Texto definitivo de "Acerca de" y filosofía
- [ ] Instagram real (footer apunta a instagram.com genérico)
