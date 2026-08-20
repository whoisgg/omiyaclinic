"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Banda de fotos que se releva sola cada pocos segundos.
 *
 * Se probó antes moviéndola con el scroll —el mismo mecanismo del parallax de
 * tratamientos— y no funcionaba: el cambio quedaba atado a la velocidad con
 * que cada lector baja, así que a veces pasaba de golpe y a veces se quedaba
 * a medio fundido, con las dos fotos superpuestas mientras se leía el texto de
 * al lado. Por tiempo el relevo siempre se ve completo y siempre igual.
 *
 * Dos cuidados que el temporizador necesita y el scroll no:
 *
 *   El reloj solo corre con la banda en pantalla. Un `IntersectionObserver` lo
 *   arranca y lo para, así que no se gastan ciclos ni se saltan fotos mientras
 *   la sección está fuera de vista — si no, el lector llegaría a una banda
 *   parada en una foto cualquiera en vez de en la primera.
 *
 *   Con `prefers-reduced-motion` no avanza. Es contenido que se actualiza
 *   solo, y ahí la pauta es no imponerlo; las barras siguen sirviendo para
 *   cambiar a mano.
 *
 * Las barras del pie no son un adorno informativo: son botones. Además de
 * decir en cuál foto va, dejan saltar a otra, que es el control que cualquier
 * cosa que se mueve sola tiene que ofrecer.
 *
 * El encuadre es común a todas salvo que una traiga el suyo: la banda es
 * mucho más ancha que alta y `cover` recorta fuerte, así que dónde quede la
 * ventana depende de qué tiene cada foto y no del formato.
 *
 * El cruce: la entrante sube de 0 a 1 por encima de todas, y la saliente se
 * queda opaca debajo hasta que la de arriba terminó — recién ahí se apaga, ya
 * tapada, así que el corte no se ve. Es lo que hace que en cada instante la
 * pantalla sea la mezcla de exactamente dos fotos.
 *
 * Desvanecer la saliente a la vez que entra la nueva parece lo mismo y no lo
 * es: con dos capas traslúcidas encima de una tercera opaca, a mitad de camino
 * se ven las tres a la vez, como una doble exposición.
 */

const GOLD = "#b08a4f";

/** Milisegundos que se queda cada foto. */
const INTERVALO = 5000;

/** Duración del fundido, en milisegundos. Va igual en el CSS de la capa. */
const FUNDIDO = 1200;

export function PhotoBand({
  images,
  imageClassName = "object-cover",
  sizes = "100vw",
  className = "",
}: {
  /** `className` propio pisa el encuadre común para esa foto. */
  images: { src: string; alt: string; className?: string }[];
  imageClassName?: string;
  sizes?: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [activa, setActiva] = useState(0);
  const [saliente, setSaliente] = useState(0);
  const anterior = useRef(0);
  const [corriendo, setCorriendo] = useState(false);

  // Arranca y para el reloj según la banda entre o salga de pantalla.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const io = new IntersectionObserver(
      ([entry]) => setCorriendo(entry.isIntersecting),
      { threshold: 0.2 }
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  // `activa` va en las dependencias a propósito: cada cambio reinicia el
  // intervalo, así que al saltar con una barra la foto elegida se queda los
  // segundos completos y no el resto del turno anterior.
  useEffect(() => {
    if (!corriendo || images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setActiva((i) => (i + 1) % images.length),
      INTERVALO
    );
    return () => window.clearInterval(id);
  }, [corriendo, activa, images.length]);

  // Mantiene opaca la foto que se va mientras la nueva se funde encima, y la
  // apaga cuando ya está tapada.
  useEffect(() => {
    if (anterior.current === activa) return;
    setSaliente(anterior.current);
    anterior.current = activa;
    const t = window.setTimeout(() => setSaliente(activa), FUNDIDO + 100);
    return () => window.clearTimeout(t);
  }, [activa]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      {images.map((img, i) => (
        <div
          key={img.src}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{
            opacity: i === activa || i === saliente ? 1 : 0,
            // La entrante siempre arriba: así se funde sobre lo que hubiera,
            // sin importar el orden en que estén las capas en el DOM.
            zIndex: i === activa ? 2 : i === saliente ? 1 : 0,
          }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes={sizes}
            className={img.className ?? imageClassName}
          />
        </div>
      ))}

      {/* El z-10 es necesario, no decorativo: las capas de foto llevan
          z-index propio para resolver el cruce, y un elemento posicionado con
          z positivo pinta por encima de todos los `auto` aunque estén después
          en el DOM. Sin esto las barras quedan debajo de la foto activa. */}
      <div className="absolute bottom-4 right-4 z-10 flex gap-2 lg:bottom-6 lg:right-6">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActiva(i)}
            aria-label={`Ver imagen ${i + 1} de ${images.length}`}
            aria-current={i === activa}
            // El área táctil son 44px de alto aunque la raya mida 3: en el pie
            // de una foto, un blanco de 3px no se puede tocar.
            className="group flex h-11 w-10 items-end justify-center pb-0 lg:w-12"
          >
            <span
              aria-hidden="true"
              className="block h-[3px] w-8 rounded-full transition-opacity duration-300 lg:w-10"
              style={{
                backgroundColor: GOLD,
                opacity: i === activa ? 1 : 0.35,
                boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
