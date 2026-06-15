import Image from "next/image";
import { WellagingPillars } from "@/components/wellaging-pillars";

export default function AcercaPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="bg-[#faf6ec]">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-32 lg:px-10 lg:pb-28 lg:pt-40">
          <p className="text-xs uppercase tracking-[0.4em] text-[#b08a4f]">
            Filosofía Omiya
          </p>
          <h1 className="mt-6 font-serif text-5xl font-light leading-[1.05] tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl">
            Acerca de Omiya
          </h1>
          <p className="mt-8 max-w-2xl font-serif text-xl font-light leading-relaxed text-zinc-600 sm:text-2xl">
            Una visión de la medicina estética centrada en el well-aging, donde
            salud, prevención y bienestar conviven en equilibrio.
          </p>
        </div>
      </section>

      {/* ¿QUÉ ES WELL-AGING? */}
      <section className="bg-[#f0eee8]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-28">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#b08a4f]">
              Nuestro concepto
            </p>
            <h2 className="mt-6 font-serif text-3xl font-light leading-tight text-zinc-900 sm:text-4xl">
              ¿Qué es Well-aging?
            </h2>
            <p className="mt-8 text-base leading-relaxed text-zinc-700 sm:text-lg">
              El well-aging es el arte de envejecer con plenitud. A diferencia
              del concepto tradicional de &ldquo;anti-envejecimiento&rdquo;,
              abrazamos el paso del tiempo como un proceso natural que puede
              gestionarse con elegancia y consciencia.
            </p>
            <p className="mt-6 font-serif text-xl font-light italic leading-relaxed text-zinc-800">
              &ldquo;La belleza más duradera nace de hábitos, prevención y
              bienestar sostenidos en el tiempo.&rdquo;
            </p>
          </div>
          <div className="relative aspect-[4/5] max-h-[640px] w-full overflow-hidden">
            <Image
              src="/esencia.webp"
              alt="Atmósfera de bienestar en Omiya Clinic"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[20%_center] grayscale-[0.4] transition-[filter] duration-1000 hover:grayscale-0"
            />
          </div>
        </div>
      </section>

      {/* PILARES — nuestro diseño */}
      <WellagingPillars />

      {/* EL SIGNIFICADO DE OMIYA */}
      <section className="bg-[#f0eee8]">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center lg:py-32">
          <div
            aria-hidden="true"
            className="font-serif text-7xl leading-none text-[#b08a4f]/25 sm:text-8xl"
          >
            大宮
          </div>
          <h2 className="mt-8 font-serif text-3xl font-light leading-tight text-zinc-900 sm:text-4xl">
            El significado de Omiya
          </h2>
          <p className="mt-8 text-base leading-loose text-zinc-600 sm:text-lg">
            Inspirado en la serenidad de los templos japoneses y la precisión de
            la medicina contemporánea, Omiya (大宮) simboliza el &ldquo;Gran
            Palacio&rdquo; del bienestar. Para nosotros, el cuerpo es un templo
            que merece ser cuidado con la máxima delicadeza, honrando su
            historia y su evolución natural a través del tiempo.
          </p>
        </div>
      </section>

      {/* NUESTRA FILOSOFÍA */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-28">
          <div className="lg:col-span-6">
            <p className="text-xs uppercase tracking-[0.4em] text-[#b08a4f]">
              Nuestra filosofía
            </p>
            <blockquote className="mt-8 font-serif text-3xl font-light leading-snug text-zinc-900 sm:text-4xl">
              &ldquo;Creemos que la medicina estética debe ayudar a las personas
              a sentirse mejor consigo mismas, sin perder aquello que las hace
              únicas.&rdquo;
            </blockquote>
            <div className="mt-10 space-y-6 text-base leading-relaxed text-zinc-600">
              <p>
                En Omiya rechazamos la estandarización de la belleza. Cada
                rostro cuenta una historia única, y nuestro objetivo es
                preservar su carácter mientras optimizamos su vitalidad.
              </p>
              <p>
                Nuestra metodología combina técnicas avanzadas con una visión
                artística, asegurando que cada intervención sea sutil, elegante
                y, sobre todo, imperceptible. Es la belleza del silencio.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="aspect-[3/4] overflow-hidden border border-zinc-200 p-4">
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src="/hero-clinic.webp"
                  alt="Interior de Omiya Clinic"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LA FUNDADORA — grilla editorial */}
      <section className="overflow-hidden bg-[#faf6ec]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          {/* Encabezado */}
          <div className="mb-16 lg:mb-20">
            <p className="text-xs uppercase tracking-[0.4em] text-[#b08a4f]">
              La Fundadora
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light text-zinc-900 sm:text-5xl">
              Dra. Antonieta Ortega
            </h2>
            <div className="mt-6 h-px w-16 bg-[#b08a4f]" />
          </div>

          {/* Grilla asimétrica */}
          <div className="grid grid-cols-12 items-start gap-8 lg:gap-12">
            {/* Retrato principal vertical */}
            <div className="col-span-12 md:col-span-5">
              <div className="group relative aspect-[2/3] overflow-hidden bg-zinc-100">
                <Image
                  src="/founder-portrait.webp"
                  alt="Dra. Antonieta Ortega, fundadora de Omiya Clinic"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover object-top transition-transform duration-[3s] group-hover:scale-105"
                />
                <div className="absolute inset-x-6 bottom-6">
                  <p className="font-serif text-2xl italic text-white drop-shadow">
                    Liderando la medicina del bienestar.
                  </p>
                </div>
              </div>
            </div>

            {/* Contenido editorial lateral */}
            <div className="col-span-12 space-y-12 md:col-span-7">
              {/* Fila superior: cita + imagen cuadrada */}
              <div className="grid grid-cols-12 items-center gap-8">
                <div className="col-span-12 md:col-span-7">
                  <blockquote className="relative font-serif text-[28px] font-light leading-tight text-zinc-900 sm:text-[36px]">
                    <span
                      aria-hidden="true"
                      className="absolute -left-4 -top-6 font-serif text-6xl text-[#b08a4f]/30"
                    >
                      &ldquo;
                    </span>
                    La estética debe ayudarnos a sentirnos mejor con quienes
                    somos,{" "}
                    <span className="italic text-[#b08a4f]">
                      no a convertirnos en alguien diferente.
                    </span>
                  </blockquote>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <div className="relative aspect-square overflow-hidden bg-zinc-100">
                    <Image
                      src="/treatments/bioestimulacion.webp"
                      alt="Detalle de un tratamiento facial en Omiya"
                      fill
                      sizes="(min-width: 768px) 20vw, 100vw"
                      className="object-cover grayscale transition-all duration-1000 hover:grayscale-0"
                    />
                  </div>
                  <p className="mt-4 font-serif text-sm italic text-zinc-500">
                    Visión artística y rigor científico.
                  </p>
                </div>
              </div>

              {/* Fila inferior: contexto clínico + espacio */}
              <div className="grid grid-cols-12 items-end gap-8">
                <div className="col-span-12 md:col-span-4">
                  <div className="aspect-[3/4] overflow-hidden border border-zinc-200 bg-zinc-100 p-2">
                    <div className="relative h-full w-full overflow-hidden">
                      <Image
                        src="/hero-clinic.webp"
                        alt="Contexto clínico de Omiya"
                        fill
                        sizes="(min-width: 768px) 18vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="mt-6 space-y-2">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#b08a4f]">
                      Trayectoria
                    </h4>
                    <p className="text-sm leading-relaxed text-zinc-600">
                      Más de una década integrando bienestar y salud celular.
                    </p>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-8">
                  <div className="relative aspect-[16/9] overflow-hidden bg-zinc-100">
                    <Image
                      src="/esencia.webp"
                      alt="Espacio de consulta de Omiya"
                      fill
                      sizes="(min-width: 768px) 36vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <p className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.2em] text-white/90">
                      Silent luxury space
                    </p>
                  </div>
                  <div className="mt-8 grid grid-cols-2 gap-8 border-t border-zinc-200 pt-8">
                    <div className="space-y-2">
                      <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#b08a4f]">
                        Especialidad
                      </h4>
                      <p className="text-sm leading-relaxed text-zinc-600">
                        Medicina estética preventiva y personalizada.
                      </p>
                    </div>
                    <div className="flex items-center justify-end gap-5 text-[#b08a4f]">
                      <a
                        href="mailto:hola@omiya.cl"
                        aria-label="Enviar correo"
                        className="transition-colors hover:text-zinc-900"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="h-5 w-5"
                        >
                          <rect x="3" y="5" width="18" height="14" rx="2" />
                          <path d="m3 7 9 6 9-6" />
                        </svg>
                      </a>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="transition-colors hover:text-zinc-900"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="h-5 w-5"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="5" />
                          <circle cx="12" cy="12" r="4" />
                          <circle
                            cx="17.5"
                            cy="6.5"
                            r="1"
                            fill="currentColor"
                            stroke="none"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
