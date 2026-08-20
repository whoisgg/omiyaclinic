import { HeroMomiji } from "@/components/hero-momiji";
import { HomeEnfoque } from "@/components/home-enfoque";
import { HomeTreatmentsGallery } from "@/components/home-treatments-gallery";
import { Reveal } from "@/components/reveal";
import { HomeFounder } from "@/components/home-founder";
import { HomeExperiencia } from "@/components/home-experiencia";
import { HomeCierre } from "@/components/home-cierre";
import { PhotoBand } from "@/components/photo-band";
import { DisplayHeading } from "@/components/display-heading";

const COMPROMISO = [
  {
    title: "Resultados naturales",
    desc: "Buscamos armonizar, no transformar.",
  },
  {
    title: "Progresión gradual",
    desc: "Cambios que evolucionan contigo.",
  },
  {
    title: "Acompañamiento médico",
    desc: "Seguimiento antes, durante y después.",
  },
  {
    title: "Protocolos personalizados",
    desc: "Adaptados a tus necesidades y objetivos.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO — verso japonés en vertical y la rama de momiji */}
      <HeroMomiji />

      {/* NUESTRO ENFOQUE — sección 02, con la foto de la recepción */}
      <HomeEnfoque />

      {/* TRATAMIENTOS — galería editorial con parallax */}
      <HomeTreatmentsGallery />

      {/* NUESTRO COMPROMISO — wireframes 23a (desktop) / 24a (móvil).
          Pasa de fondo negro a claro, como el resto del sitio, y suma la foto
          de productos a sangre entre el titular y los principios. */}
      <section
        id="compromiso"
        className="relative scroll-mt-20 overflow-hidden"
        style={{ backgroundColor: "#fbfaf7" }}
      >
        {/* Mismo lenguaje que Tratamientos: numeral romano, regla horizontal
            bajo él, eyebrow, titular; y al costado el kanji con su vertical.
            Dos líneas por sección y no más — el hairline colgando del borde
            superior que traía el wireframe era una tercera. */}
        <div className="mx-auto flex w-full max-w-[1600px] items-start justify-between gap-8 px-6 pt-20 sm:px-8 lg:px-12 lg:pt-24">
          <div className="max-w-[38rem]">
            <Reveal>
              {/* Sección III: Nuestro enfoque es la I y Tratamientos la II. */}
              <p
                className="font-serif text-[17px] leading-none tracking-[0.12em] lg:text-[22px]"
                style={{ color: "#b08a4f" }}
              >
                III
              </p>
              <span
                aria-hidden="true"
                className="mt-4 block hairline-h w-9 lg:mt-5 lg:w-11"
                style={{ backgroundColor: "#b08a4f" }}
              />
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-6 text-[10px] uppercase tracking-[0.5em] text-[#b08a4f]">
                Nuestro compromiso
              </p>
            </Reveal>
            {/* Tres líneas declaradas y no dos: DisplayHeading está pensado
                para 2-3 palabras por línea y con "los mismos principios."
                junto el navegador lo partía por su cuenta en cuatro renglones
                desparejos. Al declararlas, el corte es el que se decidió y no
                el que sobra. */}
            <DisplayHeading
              lines={["Cada tratamiento", "con los mismos", "principios."]}
              size="sm"
              className="mt-6 text-zinc-900"
            />
          </div>

          {/* "Una promesa que no cambia". El margen superior lo baja hasta que
              el kanji arranca a la altura del eyebrow, igual que en
              Tratamientos. Ancho explícito y shrink-0 porque en WebKit el
              texto vertical no propaga su ancho al ítem flex. */}
          <Reveal delay={200} className="mr-4 mt-14 w-11 shrink-0 lg:mr-16 lg:mt-[4.2rem] lg:w-14">
            <div className="flex flex-col items-center gap-6">
              <span
                lang="ja"
                className="w-9 font-jp text-[19px] leading-[1.6] [writing-mode:vertical-rl] lg:w-11 lg:text-[24px]"
                style={{ color: "#b08a4f" }}
              >
                変わらぬ約束
              </span>
              <span
                aria-hidden="true"
                className="h-32 hairline-v lg:h-40"
                style={{ backgroundColor: "#b08a4f" }}
              />
            </div>
          </Reveal>
        </div>

        {/* La foto va dentro del eje del sitio y no a sangre como el
            wireframe: con los mismos paddings que el resto de las secciones,
            su borde queda alineado con el del texto de arriba y el de los
            principios de abajo.
            El encuadre salió de medir el archivo: las tapas de los envases
            altos arrancan en la fila 516 de 1440 y las bases apoyan en la
            1345, o sea 834 filas de alto útil. Con una banda de 430px solo
            entraban 662 y había que elegir entre las tapas o las bases.

            El alto va por aspect-ratio y no en px porque las filas visibles
            dependen del ancho: `cover` escala por ancho, así que un alto fijo
            muestra más filas en una pantalla angosta que en una ancha.
            1800/834 fija la ventana en esas 834 filas en cualquier viewport
            —616px de alto a 1440, 697px a 1920—, y el 84% la ancla en las
            filas 509–1343.

            En móvil el ratio daría una banda de 158px, así que ahí sigue
            mandando un alto fijo: a 390px la foto entra completa de todos
            modos, porque el recorte pasa a ser horizontal. */}
        <Reveal delay={150}>
          <div className="relative mx-auto mt-12 h-[340px] w-full max-w-[1600px] px-6 sm:px-8 lg:mt-16 lg:h-auto lg:px-12">
            <PhotoBand
              className="h-full w-full lg:aspect-[1800/834] lg:h-auto"
              sizes="100vw"
              imageClassName="object-cover object-[50%_86%] lg:object-[50%_84%]"
              images={[
                {
                  src: "/clinica/productos.webp",
                  alt: "Selección de productos de cuidado de la piel sobre el mesón de la clínica",
                },
                {
                  src: "/clinica/productos-2.webp",
                  alt: "Ficha de plan de tratamiento completándose junto a las cajas de producto",
                  // Encuadre propio: esta toma es más cerrada que la anterior
                  // de la misma escena, así que con el 84% común la banda se
                  // iba al pie de la ficha y perdía las cajas. Al 30% entra la
                  // fila de producto arriba y la ficha en foco abajo.
                  className: "object-cover object-[50%_35%] lg:object-[50%_30%]",
                },
                {
                  src: "/clinica/productos-3.webp",
                  alt: "Box de atención de la clínica, con el sillón junto al ventanal y la vista de la ciudad",
                  // Encuadre propio, el fijado en la 48a. El 84% común está
                  // calibrado para que los envases de la primera foto queden
                  // apoyados en el mesón, y acá dejaba el ventanal fuera.
                  //
                  // A diferencia de las otras dos, esta foto no se normalizó al
                  // aspect 1.25: su ancla horizontal es 62% y no 50%, así que
                  // recortarla por el centro habría movido ese porcentaje a
                  // otro cuadro. En desktop la banda muestra el ancho completo
                  // —el 62% no hace nada ahí— y recién en móvil, donde la caja
                  // es más angosta, es el que deja el sillón y el ventanal
                  // dentro del recorte.
                  //
                  // El 40% vertical de la 48a subió al 85%: dejaba el sillón
                  // cortado a media altura y no se veía dónde apoya. La foto
                  // ya llega hasta su base, así que el 85% es casi todo lo que
                  // se le puede bajar.
                  className: "object-cover object-[62%_85%]",
                },
              ]}
            />
          </div>
        </Reveal>

        <div className="mx-auto w-full max-w-[1600px] px-6 pb-20 pt-8 sm:px-8 lg:grid lg:grid-cols-4 lg:gap-6 lg:px-12 lg:pb-28 lg:pt-14">
          {COMPROMISO.map((c, i) => (
            <Reveal
              key={c.title}
              delay={i * 80}
              className="border-t border-[#e6e0d5] py-4 lg:py-0 lg:pt-3"
            >
              <span className="font-sans text-[9px] tracking-[0.2em] text-[#b08a4f]">
                {`0${i + 1}`}
              </span>
              <h3 className="mt-2 font-serif text-lg italic leading-snug text-zinc-900">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                {c.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LA FUNDADORA — sección IV, retrato recortado sobre el crema */}
      <HomeFounder />

      {/* TU EXPERIENCIA — sección V, wireframes 36a/36b */}
      <HomeExperiencia />

      {/* CIERRE — wireframes 38a/40b, la única sección centrada y sin numeral */}
      <HomeCierre />
    </>
  );
}
