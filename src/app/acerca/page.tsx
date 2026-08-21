import { AcercaHero } from "@/components/acerca-hero";
import { AcercaConcepto } from "@/components/acerca-concepto";
import { AcercaPilares } from "@/components/acerca-pilares";
import { AcercaNombre } from "@/components/acerca-nombre";
import { AcercaFilosofia } from "@/components/acerca-filosofia";
import { AcercaFundadora } from "@/components/acerca-fundadora";
import { CierreCta } from "@/components/cierre-cta";

/**
 * Acerca de — wireframes 32a (desktop) y 32b (móvil).
 *
 * La página se rehizo entera para traerla al sistema del home. Antes vivía en
 * el lenguaje anterior del sitio —titulares en la escala de Tailwind, eyebrow
 * de 12px, sin numerales ni rieles, y cuatro cremas distintas— así que pasar
 * del home a acá era cambiar de sitio. Ahora comparte la escala tipográfica,
 * los tokens de color, el marcador de sección y la cascada de entrada.
 *
 * El ritmo de fondos alterna claro y crema para separar las secciones sin
 * reglas, y se rompe una sola vez, en la 03: el panel negro es el único del
 * sitio fuera del menú y del cierre del home, y está ahí para que el 大宮
 * pueda ir en oro a escala de titular.
 */
export default function AcercaPage() {
  return (
    <main>
      <AcercaHero />
      <AcercaConcepto />
      <AcercaPilares />
      <AcercaNombre />
      <AcercaFilosofia />
      <AcercaFundadora />

      {/* El mismo cierre del landing, repetido tal cual. La página terminaba
          en la fundadora y desde ahí solo quedaba el footer: alguien que se
          leyó Acerca de entera es exactamente quien está listo para agendar, y
          no tenía dónde hacerlo sin volver arriba.

          Repetido y no una variante: es la llamada a la acción del sitio, así
          que decirla distinta en cada página la debilita. Es el mismo criterio
          por el que las dos portadas comparten la bajada de marca. */}
      <CierreCta />
    </main>
  );
}
