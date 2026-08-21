import Link from "next/link";
import Image from "next/image";
import { CATEGORIES, getTreatments, type Category } from "@/lib/treatments";
import { BOOKING_URL } from "@/lib/links";
import { DisplayHeading } from "@/components/display-heading";
import { Reveal } from "@/components/reveal";
import { RuleLink } from "@/components/rule-link";
import { SectionRail } from "@/components/section-rail";
import { LogoMark } from "@/components/logo-mark";

type SearchParams = Promise<{ cat?: string }>;

const VALID_CATEGORIES: Category[] = ["glow", "smooth", "lift", "smile", "general"];

export default async function TratamientosPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { cat } = await searchParams;
  const active = (VALID_CATEGORIES as string[]).includes(cat ?? "")
    ? (cat as Category)
    : null;
  const list = await getTreatments(active ?? undefined);
  const all = await getTreatments();
  const activeCategory = active ? CATEGORIES.find((c) => c.id === active) : null;

  return (
    // `cream-pale`, el token de la paleta, en vez del `#fdf9f0` que tenía.
    // Era uno de los hexadecimales sueltos que la auditoría listó en las
    // páginas internas: cada una había elegido su propio crema y ninguno era
    // el del sistema.
    <main className="bg-cream-pale">
      {/* Header — título + intro.

          Trae el marcador y el riel del resto del sitio, que es lo que las
          páginas internas no tenían: la auditoría de agosto lo dejó anotado
          como la deuda grande —el home se rehízo con un sistema y las
          internas quedaron en el anterior, y las tres están en el nav, así
          que la ruptura se ve al primer clic—.

          Lo que entra es el tratamiento del texto, no el layout: la raya
          corta que abre, el riel del kanji y la entrada en cascada. La
          grilla, los filtros y las tarjetas se quedan como están.

          **Sin numeral.** Los romanos numeran secciones dentro de una página;
          esto es el encabezado de la página, igual que el hero de Acerca de,
          que tampoco lo lleva. */}
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-36 lg:px-10">
        <div className="flex items-start gap-6 lg:gap-16">
          <div className="max-w-2xl flex-1">
            {/* Corta, porque abre. La regla de la página es que las cortas
                abren y las largas cierran. */}
            <Reveal>
              <span
                aria-hidden="true"
                className="block hairline-h w-9 bg-gold lg:w-11"
              />
            </Reveal>

            {/* A la escala display del sitio, que es lo que separaba a esta
                página del home: allá los titulares van en `DisplayHeading` y
                acá estaba en la escala de Tailwind.

                `size="sm"` y no la grande: la chica va de 36 a 76px y a 1280
                el renglón largo —"Personalizados", 14 caracteres— mide unos
                470px dentro de una columna de 672. Con la escala grande, que
                llega a 116px, se salía.

                Dos palabras, dos líneas declaradas a mano: la escala display
                está pensada para 2-3 palabras por renglón y con el corte
                automático el navegador partía donde le quedaba. La segunda va
                atenuada, que es el gesto del sitio para los titulares de dos
                tiempos. */}
            <DisplayHeading
              as="h1"
              lines={["Tratamientos", "Personalizados"]}
              size="sm"
              delay={80}
              className="mt-6 text-zinc-900"
            />

            {activeCategory ? (
              <Reveal delay={160} className="mt-6 max-w-lg">
                {/* No usa `.eyebrow`, aunque sea una línea chica en oro:
                    aquella clase lleva `letter-spacing: 0.5em` y está hecha
                    para rótulos de una o dos palabras. El subtítulo de la
                    categoría —"Calidad y luminosidad de la piel", 31
                    caracteres— con ese tracking deja de leerse como frase.

                    El 0.28em es el que el sitio usa para sus líneas doradas
                    largas, como el cargo bajo la firma de la fundadora. */}
                <p className="text-[10px] uppercase leading-[2] tracking-[0.28em] text-gold">
                  {activeCategory.subtitle}
                </p>
                <p className="mt-3 text-base leading-relaxed text-zinc-600">
                  {activeCategory.description}
                </p>
              </Reveal>
            ) : (
              <Reveal delay={160}>
                <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-600">
                  El well-aging en Omiya Clinic es un compromiso con la salud de
                  tu piel. Técnicas avanzadas diseñadas para realzar tu belleza
                  natural con resultados armónicos.
                </p>
              </Reveal>
            )}
          </div>

          {/* A la derecha, que es donde va cuando el bloque no está partido en
              dos columnas —igual que "Nuestro compromiso" y la sección social
              del landing—. Y `align="top"`: el desplazamiento que trae por
              defecto existe para alinear el kanji con el eyebrow saltándose el
              numeral, y acá no hay numeral.

              El kanji repite el de Tratamientos en el home, y es a propósito:
              es la misma materia. El sitio ya hace esto con la bajada de marca,
              que las dos portadas dicen igual en vez de inventar una variante
              por página. */}
          <SectionRail
            kanji="肌はそれぞれ違う"
            align="top"
            // Al borde derecho del contenedor y no pegado al texto: la columna
            // de texto se topa en 2xl y el contenedor mide 7xl, así que
            // apoyado contra el texto el riel quedaba flotando en la mitad
            // del blanco, sin borde al que pertenecer.
            className="ml-auto"
            // Vertical corta, la del hero de Acerca de. La larga es para
            // cuando acompaña una columna de texto que sigue bajando; acá el
            // encabezado termina en el párrafo y la vertical se metía sola en
            // el blanco.
            linea="h-16 lg:h-20"
          />
        </div>
      </section>

      {/* Grid de cards — filtros pegados sobre las imágenes */}
      <section
        id="catalogo"
        className="mx-auto max-w-7xl scroll-mt-20 px-6 pb-28 lg:px-10"
      >
        <div className="mb-8 flex flex-wrap gap-6 md:justify-end md:gap-8">
          <FilterLink href="/tratamientos" label="All" active={!active} />
          {CATEGORIES.map((c) => (
            <FilterLink
              key={c.id}
              href={`/tratamientos?cat=${c.id}`}
              label={c.label}
              active={active === c.id}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {!activeCategory &&
            CATEGORIES.map((c, idx) => {
              const count = all.filter((t) => t.category === c.id).length;
              return (
                <article key={c.id} className="group">
                  <Link
                    href={`/tratamientos?cat=${c.id}#catalogo`}
                    className="block"
                  >
                    <CardImage
                      image={c.image}
                      alt={`Tratamientos ${c.label}`}
                      badge={c.tagline}
                      idx={idx}
                    />

                    <div className="mt-6 flex items-start justify-between gap-4">
                      <h3 className="font-serif text-2xl font-normal text-zinc-900">
                        {c.label}
                      </h3>
                      <span className="mt-1.5 shrink-0 text-[10px] uppercase tracking-widest text-zinc-500">
                        {count} tratamiento{count === 1 ? "" : "s"}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600">
                      {c.subtitle}.{" "}
                      {c.description}
                    </p>
                  </Link>
                  {/* En oro, como todos los enlaces con regla del sitio. En
                      tinta se leían como texto subrayado y no como el tercer
                      botón de la marca. */}
                  <RuleLink
                    href={`/tratamientos?cat=${c.id}#catalogo`}
                    className="mt-5 text-gold"
                  >
                    Ver tratamientos
                  </RuleLink>
                </article>
              );
            })}

          {activeCategory &&
            list.map((t, idx) => {
            const catLabel =
              CATEGORIES.find((c) => c.id === t.category)?.label ?? "General";
            return (
              <article key={t.slug} className="group">
                <Link href={`/tratamientos/${t.slug}`} className="block">
                  <CardImage
                    image={t.image}
                    alt={t.name}
                    badge={catLabel}
                    idx={idx}
                  />

                  <h3 className="mt-6 font-serif text-2xl font-normal text-zinc-900">
                    {t.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600">
                    {t.shortDescription}
                  </p>
                </Link>
                <RuleLink
                  href={`/tratamientos/${t.slug}`}
                  className="mt-5 text-gold"
                >
                  Ver detalles
                </RuleLink>
              </article>
            );
          })}

        </div>
      </section>

      {/* CTA — diagnóstico, banda de cierre full-width.

          El fondo pasa de `zinc-900` a `night`, el negro cálido de la cortina
          del menú y del cierre del landing. No es un matiz: sobre un neutro
          frío el oro de la marca se ensucia, que es exactamente lo que pasaba
          con el enlace de agendar. */}
      <section className="bg-night text-night-fg">
        {/* Grid y no un `justify-between`: con aquel el enlace se pegaba al
            canto derecho y la raya tenía que medir un ancho fijo, o sea un
            número que se descalibra en cada viewport. Acá la columna define
            dónde arranca y la raya rellena lo que queda.

            Las columnas van 3:2 y no 1:1. Con mitades iguales el enlace caía
            justo en el medio y la raya se estiraba 406px: demasiada raya para
            un rótulo de dos palabras. A 3:2 arranca cerca del 60% y la raya
            queda en unos 280, que es lo que pesa un cierre sin volverse el
            elemento principal de la banda. */}
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-[3fr_2fr] md:items-center lg:px-10">
          <div className="max-w-xl">
            <h3 className="font-serif text-3xl font-light leading-snug sm:text-4xl">
              ¿No sabes qué elegir?
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-night-fg/70">
              Agenda una consulta de diagnóstico personalizada con la Dra.
              Antonieta Ortega para definir tu plan de tratamiento.
            </p>
          </div>
          <RuleLink
            href={BOOKING_URL}
            external
            // `wide`: la raya rellena la columna en vez de medir un ancho
            // fijo. Es el mismo cierre que la sección social del landing, y
            // resuelve móvil solo: ahí se calcula sobre el ancho de la
            // columna en vez de arrastrar la medida del escritorio.
            wide
            className="text-gold"
          >
            Agendar diagnóstico
          </RuleLink>
        </div>
      </section>
    </main>
  );
}

function CardImage({
  image,
  alt,
  badge,
  idx,
}: {
  image?: string;
  alt: string;
  badge: string;
  idx: number;
}) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden">
      {image ? (
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover grayscale-[0.7] transition-[transform,filter] duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
      ) : (
        <div
          className={`absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-105 ${
            idx % 2 === 0 ? "bg-[#f3ede3]" : "bg-[#e8e2d8]"
          }`}
        >
          <LogoMark className="h-16 w-auto text-gold/25" />
        </div>
      )}
      <div className="absolute left-4 top-4 bg-white/90 px-3 py-1 text-[10px] uppercase tracking-widest text-zinc-900 backdrop-blur">
        {badge}
      </div>
    </div>
  );
}

function FilterLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      className={`relative shrink-0 whitespace-nowrap pb-1 text-xs uppercase tracking-widest transition-colors after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:bg-zinc-900 after:transition-transform after:duration-300 ${
        active
          ? "text-zinc-900 after:scale-x-100"
          : "text-zinc-500 hover:text-zinc-900 after:scale-x-0"
      }`}
    >
      {label}
    </Link>
  );
}
