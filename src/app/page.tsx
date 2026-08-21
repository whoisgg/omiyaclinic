import Image from "next/image";

import { HeroMomiji } from "@/components/hero-momiji";
import { HomeEnfoque } from "@/components/home-enfoque";
import { HomeTreatmentsGallery } from "@/components/home-treatments-gallery";
import { Reveal } from "@/components/reveal";
import { HomeFounder } from "@/components/home-founder";
import { HomeExperiencia } from "@/components/home-experiencia";
import { HomeCierre } from "@/components/home-cierre";
import { HomeSocial } from "@/components/home-social";
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
                className="font-serif text-[17px] leading-none tracking-[0.12em] lg:text-[22px] text-gold"
              >
                III
              </p>
              <span
                aria-hidden="true"
                className="mt-4 block hairline-h w-9 lg:mt-5 lg:w-11 bg-gold"
              />
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-6 eyebrow text-gold">
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
                className="w-9 font-jp text-[19px] leading-[1.6] [writing-mode:vertical-rl] lg:w-11 lg:text-[24px] text-gold"
              >
                変わらぬ約束
              </span>
              <span
                aria-hidden="true"
                className="h-32 hairline-v lg:h-40 bg-gold"
              />
            </div>
          </Reveal>
        </div>

        {/* La foto va dentro del eje del sitio y no a sangre como el
            wireframe: con los mismos paddings que el resto de las secciones,
            su borde queda alineado con el del texto de arriba y el de los
            principios de abajo.

            Era una banda de tres fotos que se relevaban solas cada cinco
            segundos; quedó fija en esta —la ficha de plan completándose junto
            a las cajas de producto— porque es la que cuenta el acompañamiento
            del que habla la sección. El componente `PhotoBand` salió del
            proyecto al quedar sin uso: vive en el commit `ba5be32`.

            El encuadre es el que traía esta toma y no el común de la banda:
            es más cerrada que la de los envases, así que con el ancla de
            aquélla se iba al pie de la ficha y perdía las cajas. Al 30% entra
            la fila de producto arriba y la ficha en foco abajo.

            El alto va por aspect-ratio y no en px porque las filas visibles
            dependen del ancho: `cover` escala por ancho, así que un alto fijo
            muestra más filas en una pantalla angosta que en una ancha.

            En móvil el ratio daría una banda de 158px, así que ahí sigue
            mandando un alto fijo: a 390px la foto entra completa de todos
            modos, porque el recorte pasa a ser horizontal. */}
        <Reveal delay={150}>
          <div className="relative mx-auto mt-12 h-[340px] w-full max-w-[1600px] px-6 sm:px-8 lg:mt-16 lg:h-auto lg:px-12">
            <div className="relative h-full w-full overflow-hidden lg:aspect-[1800/834] lg:h-auto">
              <Image
                src="/clinica/productos-2.webp"
                alt="Ficha de plan de tratamiento completándose junto a las cajas de producto"
                fill
                sizes="100vw"
                className="object-cover object-[50%_35%] lg:object-[50%_30%]"
              />
            </div>
          </div>
        </Reveal>

        <div className="mx-auto w-full max-w-[1600px] px-6 pb-20 pt-8 sm:px-8 lg:grid lg:grid-cols-4 lg:gap-6 lg:px-12 lg:pb-28 lg:pt-14">
          {COMPROMISO.map((c, i) => (
            <Reveal
              key={c.title}
              delay={i * 80}
              className="border-t border-[#e6e0d5] py-4 lg:py-0 lg:pt-3"
            >
              <span className="font-sans text-[9px] tracking-[0.2em] text-gold">
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
      {/* SÍGUENOS — sección VI, el feed de Instagram. Va acá y no después
          del cierre: el cierre es el punto final de la página y nada puede ir
          detrás de él. */}
      <HomeSocial />

      <HomeCierre />
    </>
  );
}
