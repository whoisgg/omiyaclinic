import Link from "next/link";
import Image from "next/image";
import { BOOKING_URL } from "@/lib/links";
import { HeroMomiji } from "@/components/hero-momiji";
import { HomeEnfoque } from "@/components/home-enfoque";
import { HomeTreatmentsGallery } from "@/components/home-treatments-gallery";
import { Reveal } from "@/components/reveal";
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
                className="mt-4 block h-px w-9 lg:mt-5 lg:w-11"
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
                className="h-32 w-px lg:h-40"
                style={{ backgroundColor: "#b08a4f" }}
              />
            </div>
          </Reveal>
        </div>

        {/* La foto va dentro del eje del sitio y no a sangre como el
            wireframe: con los mismos paddings que el resto de las secciones,
            su borde queda alineado con el del texto de arriba y el de los
            principios de abajo.
            El encuadre vertical se eligió midiendo sobre el archivo: por
            debajo del 60% se cortan los envases por abajo, y ahí es donde
            está el producto. */}
        <Reveal delay={150}>
          <div className="relative mx-auto mt-12 h-[300px] w-full max-w-[1600px] px-6 sm:px-8 lg:mt-16 lg:h-[430px] lg:px-12">
            <div className="relative h-full w-full overflow-hidden">
            <Image
              src="/clinica/productos.webp"
              alt="Selección de productos de cuidado de la piel sobre el mesón de la clínica"
              fill
              sizes="100vw"
                className="object-cover object-[50%_60%] lg:object-[50%_70%]"
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

      {/* FUNDADORA — wireframe placeholder */}
      <section className="bg-white">
        <div className="founder-card mx-auto w-full max-w-[1600px] grid gap-12 px-6 py-20 sm:grid-cols-2 sm:items-center sm:px-8 lg:px-12">
          <div className="group founder-photo relative aspect-[4/5] overflow-hidden">
            <Image
              src="/founder-portrait.webp"
              alt="Dra. Antonieta Ortega, fundadora de Omiya Clinic"
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover object-top grayscale-[0.7] sepia-[0.1] brightness-[1.08] contrast-[0.95] transition-[transform,filter] duration-1000 group-hover:scale-105 group-hover:grayscale-0 group-hover:sepia-0 group-hover:brightness-100 group-hover:contrast-100"
            />
          </div>
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#b08a4f]">
              Dra. Antonieta Ortega · Fundadora, Omiya Clinic
            </p>
            <blockquote className="mt-6 font-serif text-2xl font-light leading-snug text-zinc-900 sm:text-3xl">
              &ldquo;La estética debe ayudarnos a sentirnos mejor con quienes
              somos, no a convertirnos en alguien diferente.&rdquo;
            </blockquote>
            <p className="mt-6 text-base leading-relaxed text-zinc-600">
              Creé Omiya con la convicción de que el cuidado estético puede
              acompañar el paso del tiempo sin alterar aquello que nos hace
              únicos. Cada decisión dentro de la clínica busca reflejar esa
              filosofía: priorizar la armonía, la autenticidad y el bienestar
              por sobre las tendencias o los cambios excesivos.
            </p>
            <Link
              href="/acerca"
              className="btn-underline mt-8 inline-block text-xs text-[#b08a4f]"
            >
              Ver más
            </Link>
          </Reveal>
        </div>
      </section>

      {/* TU EXPERIENCIA — imagen del box con fade hacia el crema */}
      <section className="relative overflow-hidden border-t border-zinc-200 bg-[#faf6ec]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[62%]"
        >
          <Image
            src="/box-omiya-2.webp"
            alt=""
            fill
            sizes="(min-width: 1024px) 62vw, 100vw"
            className="object-cover object-center"
          />
          {/* Fade horizontal hacia la columna de texto */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#faf6ec] via-[#faf6ec]/90 to-[#faf6ec]/30 lg:via-[#faf6ec]/40 lg:to-transparent" />
          {/* Fade vertical suave para fundir con las secciones vecinas */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf6ec]/40 via-transparent to-[#faf6ec]/40" />
        </div>
        <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-8 lg:px-12 relative z-10 flex min-h-[560px] items-center py-20 lg:min-h-[680px] lg:py-28">
          <div className="max-w-xl">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.4em] text-[#b08a4f]">
                Tu experiencia en Omiya
              </p>
            </Reveal>
            <DisplayHeading
              lines={["Comprender", "tu piel", "hoy."]}
              dimFrom={2}
              size="sm"
              className="mt-6 text-zinc-900"
            />
            <div className="mt-8 h-px w-16 bg-[#b08a4f]" />
            <p className="mt-8 max-w-md text-base leading-relaxed text-zinc-700">
              Cada tratamiento comienza con una evaluación personalizada que nos
              permite comprender tu piel, tus objetivos y la etapa en la que te
              encuentras.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxe mt-10 inline-block px-8 py-4 text-xs text-[#b08a4f]"
              style={
                {
                  "--luxe-fill": "#b08a4f",
                  "--luxe-fill-text": "#ffffff",
                } as React.CSSProperties
              }
            >
              Agenda tu evaluación
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zinc-900 text-white">
        <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-8 lg:px-12 py-24 text-center lg:py-32">
          {/* Momento firma de la home: la cascada va letra por letra */}
          <DisplayHeading
            lines={["Tu bienestar", "empieza aquí."]}
            split="letter"
            tone="dark"
            className="text-white"
          />
          <Reveal>
            <div className="mx-auto mt-8 h-px w-16 bg-[#b08a4f]" />
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-8 text-lg font-light text-zinc-300">
              Cada piel tiene una historia diferente.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxe mt-10 inline-block px-10 py-4 text-xs text-white"
              style={
                {
                  "--luxe-fill": "#ffffff",
                  "--luxe-fill-text": "#18181b",
                } as React.CSSProperties
              }
            >
              Agendar consulta
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
