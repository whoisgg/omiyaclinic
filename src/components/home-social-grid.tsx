"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type CeldaSocial = {
  /** Las dos piezas que se alternan en esta celda. Van emparejadas por tono
   *  —oscura con oscura, crema con crema— para que el cambio se lea como que
   *  la superficie respira y no como que una casilla se prende y se apaga
   *  mientras las otras cinco no se mueven. */
  piezas: { src: string; alt: string }[];
};

/** Cada cuánto cambia **una** celda. Con seis celdas, cada una vuelve a
 *  cambiar cada 18 segundos. Más rápido que esto y la grilla no se queda
 *  quieta el tiempo suficiente para mirarla. */
const INTERVALO = 3000;

/**
 * La grilla del feed, con las piezas alternándose.
 *
 * **Cambia una celda por vez, en round-robin.** Si las seis cambiaran juntas
 * sería un slideshow; escalonado se lee como un feed que se actualiza solo.
 *
 * **Las dos piezas de cada celda están montadas desde el inicio**, una encima
 * de la otra, y lo único que se anima es la opacidad. Esa decisión es lo que
 * hace que no haya parpadeo: no hay que precargar nada ni esperar a que
 * cargue la que entra, porque ya estaba ahí. El costo es doce imágenes en el
 * DOM en vez de seis, que con `sizes` correcto son variantes de ~200px.
 *
 * Es un componente aparte y no parte de `home-social` para que la sección siga
 * renderizándose en el servidor: lo único que necesita JavaScript es la
 * grilla.
 */
export function HomeSocialGrid({ celdas }: { celdas: CeldaSocial[] }) {
  const [alternas, setAlternas] = useState<boolean[]>(() =>
    celdas.map(() => false)
  );
  const contenedor = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // Con `prefers-reduced-motion` la grilla se queda quieta en la primera
    // pieza de cada celda. Un cambio automático es exactamente el tipo de
    // movimiento no solicitado que esa preferencia pide desactivar.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = contenedor.current;
    if (!el) return;

    // El timer solo corre con la grilla en pantalla. La sección vive al final
    // del landing: sin esto se pasa toda la visita cambiando piezas que nadie
    // está mirando.
    let turno = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    const parar = () => {
      if (timer) clearInterval(timer);
      timer = undefined;
    };
    const arrancar = () => {
      timer ??= setInterval(() => {
        setAlternas((prev) =>
          prev.map((v, i) => (i === turno % prev.length ? !v : v))
        );
        turno++;
      }, INTERVALO);
    };

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? arrancar() : parar()),
      { threshold: 0.2 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      parar();
    };
  }, []);

  return (
    <ul ref={contenedor} className="grid grid-cols-3 gap-2 lg:grid-cols-6 lg:gap-3">
      {celdas.map((celda, i) => {
        const activa = alternas[i] ? 1 : 0;
        return (
          <li
            key={celda.piezas[0].src}
            className="relative aspect-[4/5] overflow-hidden bg-zinc-100"
          >
            {celda.piezas.map((pieza, j) => (
              <Image
                key={pieza.src}
                src={pieza.src}
                alt={pieza.alt}
                fill
                // Seis columnas en un contenedor de 1600 dan unos 250px; en
                // móvil, tres dan unos 110.
                sizes="(min-width: 1024px) 16vw, 33vw"
                // La segunda pieza no compite por ancho de banda con lo que
                // está en pantalla: entra cuando el navegador tiene aire.
                loading={j === 0 ? undefined : "lazy"}
                className={`object-cover object-center transition-opacity duration-1000 ease-out ${
                  j === activa ? "opacity-100" : "opacity-0"
                }`}
                // La que no se ve sale del árbol de accesibilidad: si no, el
                // lector de pantalla anuncia dos descripciones para lo que
                // visualmente es una sola imagen.
                aria-hidden={j === activa ? undefined : true}
              />
            ))}
          </li>
        );
      })}
    </ul>
  );
}
