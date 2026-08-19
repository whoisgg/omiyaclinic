# Omiya Clinic — Pendientes

> Lista viva de lo que falta para pasar del wireframe/demo al producto. Marca con `[x]` cuando esté hecho.

---

## 🔄 Para retomar (estado al 2026-08-19)

**Hero rehecho de cero: layout japonés.** Se descartó el hero de la foto de
recepción y con él toda la transición de máscara. `hero-stage.tsx` ya no
existe; en su lugar está `src/components/hero-momiji.tsx`, una sección normal
de `100dvh` sobre blanco.

La jerarquía se invierte: el protagonista es el verso `美しく、時を重ねると
いうこと。` en vertical (`writing-mode: vertical-rl`, dos columnas, corte
explícito con `<br>` porque el automático partía palabras). El titular en
español baja a un rail lateral horizontal —hairline dorado largo y tres líneas
cortas, sin número de sección— y la rama de momiji entra por abajo, centrada,
cruzando en diagonal entre ambos. Al pie: hint de scroll a la izquierda y
"Machalí, Chile" a la derecha.

El `h1` es la frase en español, no el verso: es un sitio en español. El verso
va como `<p lang="ja">` con el texto plano en `aria-label`, porque leído
carácter por carácter en vertical el lector de pantalla lo destroza.

**Probado y descartado:** el rail en vertical con las letras derechas
(`text-orientation: upright`), como en 12b, y con numeral romano. Con las dos
columnas verticales simétricas el hero perdía el contrapunto —el japonés
vertical se lee como gesto justamente porque lo latino no lo acompaña— y la
"I" romana en sans quedaba idéntica al hairline que tenía debajo.

Nace del layout que el usuario tenía en mente desde el principio, no de los
wireframes 12a/12b del canvas de diseño (esos eran sobre crema, con el árbol
de pie y el rail en vertical; quedaron descartados).

### Consecuencias en otros archivos

- `page.tsx`: el hero ya no envuelve a la página. "Nuestro enfoque", que vivía
  dentro del stage como destino de la máscara, es ahora una sección propia
  sobre `#faf6ec`.
- `site-header.tsx`: se eliminaron `overHero`, `pastStage` y `onBlackPanel`.
  Existían para alternar el header a blanco mientras el hero era una foto
  oscura con un panel negro detrás; con el hero claro el header va en tinta en
  todas las páginas y el velo al scrollear es siempre blanco.
- `layout.tsx` + `globals.css`: se sumó **Shippori Mincho** como `--font-jp`.
  Va con `subsets: ["latin", "japanese"]` — con solo `latin` la webfont no
  trae los kanji y el verso caía al mincho del sistema. Google parte el subset
  japonés por `unicode-range`, así que de las 245 declaraciones `@font-face`
  el navegador baja **solo 4**: las de los caracteres del verso. Sin `preload`
  para no competir con el LCP.

### La imagen de la rama

`public/momiji/momiji-rama-v6.webp` (1800×1187, alfa). Generada con Gemini y
procesada en tres pasos, todos necesarios:

1. **Campo plano.** El original traía degradado de fondo (245 a la izquierda,
   230 a la derecha). Se estima el campo de iluminación dilatando el claro con
   `MaxFilter` sobre una versión reducida y difuminando; dividir por ese campo
   deja el fondo parejo sin aplastar las hojas.
2. **Punto blanco en 250.** Tras el campo plano el fondo quedaba en 252 y esos
   tres niveles contra el blanco de la página **se veían como un rectángulo**.
3. **Fundido de alfa** del 3.5% en los bordes.

El sufijo versionado importa: el cache de imagen optimizada de Next retiene la URL,
así que reencuadrar el archivo sin renombrarlo sigue sirviendo el recorte
viejo.

### Pendiente

### Tratamiento por breakpoint de la rama

No es la misma imagen escalada: en desktop va anclada abajo, centrada y con
tope `min(78%, 86vh)`. En móvil se pasa del ancho del viewport (`w-[135%]`,
`left-[-14%]`) y se despega del borde inferior (`bottom-[6%]`) — dimensionada
por ancho y pegada abajo quedaba minúscula y arrinconada contra los 930px de
alto de un teléfono. Sangra por los dos lados y su masa cae al centro.

**"Machalí, Chile" no se muestra en móvil** (`hidden lg:flex`): con la rama
ocupando el centro, el pie se llenaba de dos líneas apiladas y la pantalla
perdía el aire. La ubicación sigue en el footer del sitio.

### Pendiente

- [ ] **Tablet (768–1024px) sin revisar.** El tramo `sm:` no lo vi corriendo.
- [ ] **Móvil verificado por geometría, no a ojo.** La ventana de Chrome quedó
      físicamente chica y las capturas salían a 215px aunque el viewport
      emulado fuera 430×932, así que el último ajuste de la rama en móvil se
      comprobó midiendo rects (verso 129–479 bajo el header, rail 291–510,
      rama 493–876, scroll 891 sin solape). Falta mirarlo.
- [x] ~~"Machalí, Chile" roza el follaje~~ — resuelto en dos pasos: centrar
      la rama (`left-[24%]`, `w-[min(78%,86vh)]`), que despejó el rail, y
      bajar la ubicación al pie, donde el texto es corto y no alcanza al
      tronco. En móvil además se alinea a la izquierda, porque a la derecha
      caía sobre la parte densa del follaje. El tope en `vh` de la rama se
      mantiene: sin él, en pantallas bajas y anchas crece por ancho hasta
      tapar el rail.
- [x] ~~El verso chocaba con el logo del header en móvil~~ — el contenedor
      lleva `pt-20 lg:pt-0`. El padding va solo bajo `lg` a propósito: en
      desktop corría el verso 57px hacia abajo sin necesidad.
- [ ] `public/momiji/momiji-arbol.webp` (1400×2087) quedó **sin usar**: es el
      árbol de pie sobre crema con su sombra proyectada, generado antes de
      cambiar de rumbo. Sirve para otra sección.
- [ ] Quedaron sin usar los recortes de la foto de recepción
      (`hero-recepcion-v4*.webp`) y `public/clinica/ritual.webp`.
- [ ] Lint: 3 errores preexistentes de `react-hooks/set-state-in-effect` en
      `display-heading.tsx` y `loader.tsx`. No son de este cambio.

### Pendientes que este rediseño dejó sin objeto

Del estado al 2026-08-18: el copy del bloque descriptor del hero y su
contraste de 3.7:1, el ancho del texto de "Nuestro enfoque" en su versión
dentro del stage, y la resolución de la foto de recepción. Ninguno de esos
elementos existe ya.

---

## 🔄 Para retomar (estado al 2026-08-18)

**Hero rehecho con foto real de la recepción.** Base fotográfica de Claudia
Ferrer (`_DSC4822`) reinterpretada con IA para vestir el arce, que en la toma
real está pelado. Layout editorial tomado de una referencia: bloque abajo a la
izquierda, sin CTA en el hero, scroll con raya al pie. Velo parejo sobre la
foto (sube el contraste del texto blanco de 1.1:1 a 9-11:1).

**Sistema de tipografía display** (`src/components/display-heading.tsx`):
titulares de 2-3 palabras por línea, serif light, interlineado 0.92. Aplicado
al hero y a las cuatro secciones del home.

**Eje único**: header, hero, secciones y footer comparten
`max-w-[1600px]` con los mismos paddings. Antes eran cuatro ejes distintos.

### Pendiente

- [ ] **Texto del bloque descriptor del hero.** Hoy dice "Combinamos ciencia,
      tecnología y un enfoque médico integral…", que viene de un mockup y está
      a revisar. Se propusieron ~10 alternativas; la mejor evaluada fue
      "Cuatro líneas de tratamiento —piel, expresión, firmeza y sonrisa— bajo
      un mismo criterio médico" (informa el alcance completo, incluido dental).
- [ ] **Contraste de ese bloque: 3.7–3.9:1**, bajo el mínimo AA de 4.5 para
      texto chico. Cae sobre la zona más luminosa del muro. Se arregla bajando
      el bloque a una zona más oscura o reforzando el velo solo ahí.
- [ ] **Ancho del texto en el panel "Nuestro enfoque".** Topado en `max-w-2xl`
      (672px) cuando en tablet/desktop hay >900 disponibles, así que queda aire
      muerto a la derecha. Alternativa descartada por ahora: centrar el bloque
      en tablet, que rompería el eje único.
- [ ] **Resolución de la foto del hero.** El archivo mide 1448px y se sirve a
      resolución nativa, así que no está estirada, pero en pantalla retina
      queda blanda. Falta pasarla por el upscaler y regenerar los dos `.webp`.
- [ ] **Unificar el criterio de animación.** El hero quedó sin blur ni duotono;
      las cuatro secciones del home los conservan. Hoy conviven dos criterios.
- [ ] `public/clinica/ritual.webp` está commiteada pero sin usar: es para la
      sección Acerca de (bandeja de bienvenida con la publicación de Galderma).

### Notas de entorno

- **No correr `next build` con el dev server encendido**: pisa el `.next` que
  el server tiene en uso y deja el sitio sirviendo CSS roto. Apagar primero.
- Con el proyecto en OneDrive el watcher se pierde ediciones de `globals.css`.
  Si una regla nueva no aparece en el bundle, escribirla como utilidades de
  Tailwind en el JSX, que sí se regeneran.

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
