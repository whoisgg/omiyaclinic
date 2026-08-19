import Image from "next/image";

/**
 * Hero editorial japonés.
 *
 * Reemplaza al stage con transición de máscara: acá no hay lockup viajero ni
 * clip-path. El hero es una sección normal de 100dvh y "Nuestro enfoque" pasó
 * a ser su propia sección en page.tsx.
 *
 * La jerarquía se invierte respecto del hero anterior: el protagonista es el
 * verso en japonés, en vertical y a escala de titular, no un display latino.
 * El titular en español baja a un rail lateral horizontal —hairline dorado
 * y tres líneas cortas— y la rama de momiji entra por abajo, centrada,
 * cruzando en diagonal entre el verso y el rail.
 *
 * La altura va en `svh` y no en `dvh`. `dvh` cambia mientras se scrollea en
 * móvil, porque la barra de URL se colapsa: la sección crecía en pleno scroll
 * y la rama —anclada a un porcentaje de esa altura— se deslizaba hacia abajo,
 * como si el hero se estirara. `svh` es la altura con la barra desplegada, un
 * valor fijo, así que nada se mueve. El costo es que con la barra oculta
 * asoma un poco la sección siguiente, que es el intercambio correcto.
 *
 * Sobre el corte de columnas del verso: en `vertical-rl` las columnas avanzan
 * hacia la izquierda, así que el `<br>` deja `美しく、` en la columna derecha
 * y `時を重ねるということ。` en la de al lado. Va explícito y no por altura
 * disponible, porque dependiendo del alto de viewport el quiebre automático
 * caía en mitad de palabra.
 */

// Gris cálido para las etiquetas chicas. El dorado de marca sobre blanco da
// 3.6:1 y estas van a 8-9px, así que el dorado queda solo para el punto y las
// líneas —donde no hay que leer— y el texto va en un tono que sí se lee.
const INK = "#1e1c19";
const INK_SOFT = "#6b6259";
const GOLD = "#b08a4f";

export function HeroMomiji() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-white">
      {/* Rama de momiji: entra por abajo y cruza en diagonal saliendo por el
          borde derecho. El archivo ya trae el fondo llevado a blanco puro y
          los bordes desvanecidos a alfa, así que no hay rectángulo que tapar
          ni recorte que se note.
          El sufijo versionado no es decorativo: el cache de imagen
          optimizada de Next retiene la URL vieja, así que reencuadrar el
          archivo sin renombrarlo deja sirviendo el recorte anterior. */}
      {/* Móvil y desktop la tratan distinto a propósito.

          En móvil se pasa del ancho del viewport (135%) y se despega del
          borde inferior: dimensionada por ancho y pegada abajo quedaba
          minúscula y arrinconada contra los 850-950px de alto del teléfono.
          Así sangra por los dos lados y su masa cae al centro de la pantalla,
          que es donde tiene que estar.

          El tope en vh va en los tres breakpoints, no solo en desktop: la
          rama se dimensiona por ancho, así que en cualquier pantalla más baja
          de lo normal —un portátil de 1440x728, un teléfono en horizontal, un
          móvil con la barra del navegador desplegada— crecía hasta tapar el
          rail y dejar el descriptor ilegible sobre las hojas. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[6%] left-[-14%] w-[min(135%,58vh)] sm:bottom-[4%] sm:left-[2%] sm:w-[min(116%,62vh)] lg:bottom-0 lg:left-[24%] lg:w-[min(78%,86vh)]"
      >
        <Image
          src="/momiji/momiji-rama-v6.webp"
          alt=""
          width={1800}
          height={1187}
          priority
          sizes="(min-width: 1024px) 78vw, 135vw"
          className="h-auto w-full select-none"
        />
      </div>

      {/* El padding superior solo existe bajo lg: ahí el verso nacía pegado
          al logo del header fijo. En desktop el hero ya tiene aire de sobra y
          meterlo corría el verso 57px hacia abajo. */}
      <div className="hero-intro relative mx-auto flex h-full w-full max-w-[1600px] flex-col px-6 pt-20 sm:px-8 lg:px-12 lg:pt-0">
        <div className="relative flex-1">
          {/* Verso vertical: es el protagonista visual, pero no el h1 — en un
              sitio en español el encabezado de la página tiene que ser la
              frase en español, que vive en el rail. */}
          <p
            lang="ja"
            aria-label="美しく、時を重ねるということ。"
            className="absolute left-0 top-[6%] font-jp font-normal leading-[1.5] [writing-mode:vertical-rl] sm:left-[2%] sm:top-[10%] lg:left-[6%] lg:top-[13%]"
            style={{
              color: INK,
              // Se dimensiona contra el ALTO, no el ancho: el verso es una
              // columna vertical, así que lo que tiene que caber es su largo.
              // Con vw se pasaba de 700px de alto en desktop y se comía el
              // hint de scroll. El tope en vw lo cuida en pantallas bajas y
              // anchas, donde 7vh se vuelve una letra desproporcionada.
              fontSize: "clamp(1.9rem, min(6.9vh, 7.4vw), 4.8rem)",
            }}
          >
            <span aria-hidden="true">
              美しく、
              <br />
              時を重ねるということ。
            </span>
          </p>

          {/* Rail derecho: hairline dorado y el titular en tres líneas cortas. Va en horizontal a propósito —se probó en
              vertical, como el verso, y con las dos columnas simétricas el
              hero perdía el contrapunto: el japonés vertical se lee como
              gesto justamente porque lo latino no lo acompaña—. */}
          <div className="absolute right-0 top-[26%] flex flex-col items-start lg:left-[68%] lg:right-auto">
            {/* Sin número de sección: el hairline solo, y más largo, abre el
                bloque mejor que un "01" que prometía una numeración que el
                hero no continúa. */}
            <span
              aria-hidden="true"
              className="mb-6 h-16 w-px lg:mb-8 lg:h-20"
              style={{ backgroundColor: GOLD }}
            />
            <h1
              className="font-sans text-[10px] font-normal uppercase leading-[2.1] tracking-[0.26em] lg:text-[11px] lg:tracking-[0.3em]"
              style={{ color: INK }}
            >
              El arte de
              <br />
              envejecer
              <br />
              mejor
            </h1>
            <p
              className="mt-8 font-sans text-[9px] uppercase leading-[2] tracking-[0.22em] lg:mt-10 lg:text-[10px]"
              style={{ color: INK_SOFT }}
            >
              Clínica premium
              <br />
              de well-aging
            </p>
            {/* Cierra el rail con una horizontal. El motivo que se repite en
                el sitio es un par de rayas formando una L: como el bloque ya
                abre con una vertical, la que cierra tiene que ir cruzada. */}
            <span
              aria-hidden="true"
              className="mt-5 block h-px w-16 lg:mt-6 lg:w-20"
              style={{ backgroundColor: GOLD }}
            />
          </div>
        </div>

        {/* Pie: hint de scroll a la izquierda y la ubicación a la derecha.
            El descriptor de la clínica volvió al rail; abajo queda solo la
            ubicación, que es corta y por eso no alcanza al tronco.

            En móvil la ubicación no se muestra: con la rama ocupando el
            centro, el pie se llenaba de dos líneas apiladas y la pantalla
            perdía el aire que sostiene el diseño. La ubicación sigue en el
            footer del sitio. */}
        <div className="relative flex flex-col-reverse items-start gap-4 pb-7 sm:pb-9 lg:flex-row lg:items-end lg:justify-between lg:pb-10">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="h-px w-7 sm:w-9"
              style={{ backgroundColor: GOLD }}
            />
            <span
              className="font-sans text-[9px] uppercase tracking-[0.26em] lg:text-[10px]"
              style={{ color: INK_SOFT }}
            >
              Scroll para explorar
            </span>
          </div>

          <p className="hidden items-center gap-3 self-start font-sans text-[9px] uppercase tracking-[0.24em] lg:flex lg:self-end lg:text-[10px]">
            <span
              aria-hidden="true"
              className="h-1 w-1 shrink-0 rounded-full"
              style={{ backgroundColor: GOLD }}
            />
            <span style={{ color: INK_SOFT }}>Machalí, Chile</span>
          </p>
        </div>
      </div>
    </section>
  );
}
