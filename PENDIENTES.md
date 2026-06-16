# Omiya Clinic — Pendientes

> Lista viva de lo que falta para pasar del wireframe/demo al producto. Marca con `[x]` cuando esté hecho.

---

## 🔄 Para retomar (estado al 2026-06-11)

**Lo hecho en la sesión del 11-06:**
- **Landing nuevo**: hero crema de marca con pétalos de cerezo en canvas
  (`petals-overlay.tsx`) + transición de máscara estilo sensei.tech
  (`hero-stage.tsx`): el lienzo se recorta y el lockup viaja achicándose a un
  layout de 2 columnas (logo izq. / texto well-aging der.), pétalos se
  desvanecen al scrollear y vuelven al landing; lockup queda pinned y las
  secciones lo cubren; todo reversible con scroll natural (sin snap/hijack).
- **Logos vectoriales de marca** (svgo de los AI exports, currentColor):
  `logo-wordmark.tsx` (OMIYA con O-ligadura), `logo-clinic.tsx` (franja CLINIC
  del lockup oficial), `logo-full.tsx` (lockup completo, usado en footer),
  `logo-mark.tsx` (monograma navbar/favicon).
- **/tratamientos rediseñado**: grid de cards con fotos Unsplash license-free
  (desaturadas, color al hover), vista All con 4 cards de categoría, filtros
  sobre el grid sin saltos de scroll (`scroll={false}` + anchor #catalogo),
  banda CTA full-width de cierre. Sin descriptores de duración en cards.
- **Home**: retrato HD de la doctora + cita nueva, sección productos estática
  (foto limpia `products/composicion.webp`, generada por IA + segmentación;
  se eliminaron los 192 frames y las animaciones de scrub/capas).
- **Navbar**: transparente absoluto en todas las páginas, botón Agendar
  cuadrado (btn-luxe). Loader con tipografía del sistema (serif + eyebrow).
- Si las imágenes no se actualizan tras un cambio: renombrar el archivo
  (cache-bust) — los caches de imagen optimizada retienen la URL vieja.
- **Sesión tarde 11-06**: transición de máscara final en `hero-stage.tsx`
  (lockup oficial OMIYA/CLINIC viaja a columna izq., crema funde a blanco y
  logo a dorado #a4884f, texto "Nuestro enfoque" a la der.; pinned + dwell
  20vh y luego scroll natural; reversible). Navbar ahora fixed con velo
  blanco/blur al scrollear. Galería editorial de tratamientos en el home
  (`home-treatments-gallery.tsx`): grilla escalonada con parallax vertical
  por imagen, Omiya Glow/Smooth/Lift/Smile → /tratamientos?cat=. Pétalos
  con respawn lateral para cubrir todo el alto en mobile.

---

## (sesión anterior) estado al 2026-06-10

**Setup en un computador nuevo:**
```bash
git clone https://github.com/whoisgg/omiyaclinic.git && cd omiyaclinic
pnpm install
pnpm dev          # corre en http://localhost:3004 — NO necesita .env ni variables
```

**Deploy:** `vercel deploy --prod --yes --scope whoisggs-projects` (proyecto Vercel `omiya`,
producción en https://omiya.vercel.app). El repo NO está conectado a GitHub en Vercel,
así que el deploy es manual por CLI. Ojo: la cola de Vercel estuvo lenta el 10-06;
verificar con `vercel ls --scope whoisggs-projects` que el último deploy esté ● Ready.

**Lo hecho en la sesión del 10-06:**
- Limpieza total: fuera Supabase, Mercado Pago y el flujo `/reserva` (recuperable en commit `ee88fe9`)
- Agendar/Reservar → link público de Dentalink; link de pago HealthAtom en /contacto (ambos en `src/lib/links.ts`)
- Loader del sitio anterior replicado (`src/components/loader.tsx`): corre 1 vez por sesión
  (sessionStorage + script inline anti-flash en `layout.tsx` + regla CSS en `globals.css`)
- Catálogo espejo de facelab.cl en `src/lib/treatments.ts`: Glow (limpieza facial, mesoterapia),
  Smooth (rellenos A.H.), Lift (bioestimulación, Endymed PRO, lipopapadas),
  Smile (limpieza dental, endodoncia, blanqueamiento — línea propia). Sin precios.
- Descripciones de categorías (del sitio viejo) se muestran al filtrar en /tratamientos

**Material reutilizable:** el repo del sitio anterior `whoisgg/v0-website-replication`
tiene fotos reales en `public/` (founder-portrait.webp, hero-face-1..5.jpg,
clinic-interior.webp, edificio-exterior.webp, video clinic-consultation.mp4) para
reemplazar los placeholders IMG. El loader ya se sacó de ahí.

---

## 🏗️ Arquitectura (decisión 2026-06-10)

El sitio es **100% estático/informativo**. La agenda y el pago se manejan fuera:

- **Agenda online:** Dentalink — `https://cfef9477a3f223017832f99a2e8d7eda04b5fb18.agenda.softwaredentalink.com/agenda?modalidad=1`
  (todos los botones *Agendar* / *Reservar* abren este link)
- **Link de pago:** HealthAtom — `https://ff.healthatom.io/txzPhD` (linkeado en /contacto; revisar cómo funciona exactamente con la clínica)
- Ambos links viven en `src/lib/links.ts`.

Se eliminó todo el stack anterior: Supabase (schema de reservas, RLS, RPCs), Mercado Pago
(checkout + webhook), flujo `/reserva`, export a calendario `.ics`. El proyecto de Supabase
ya no existía en la cuenta. Si algún día se retoma, está en el historial de git
(commit `ee88fe9` "Booking system end-to-end").

- [ ] Confirmar con la clínica cómo opera el link de pago HealthAtom (¿abono? ¿por tratamiento?)

## 📦 Catálogo de tratamientos

Ahora vive en código: `src/lib/treatments.ts` (datos estáticos, editar ahí).

- [x] Catálogo espejo de facelab.cl agrupado en Glow/Smooth/Lift + línea dental propia en Smile
- [x] Sin precios en el sitio (la reserva en Dentalink es por categoría o diagnóstico)
- [ ] Validar con la doctora los descriptivos y la lista dental (¿falta algo además de limpieza, endodoncia, blanqueamiento?)

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
- [ ] Banner de consentimiento de cookies (Accept / Reject / Preferences) + link a Privacy Policy; persistir elección y cargar analytics/marketing solo tras aceptar. Diseñarlo en nuestro estilo (sutil, no el genérico amarillo).
- [ ] Páginas legales: los links Privacidad / Términos / Cookies ya están en la barra inferior del footer, pero apuntan a `/privacidad`, `/terminos`, `/cookies` que aún NO existen (dan 404). Crear esas páginas con el contenido legal real.

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
