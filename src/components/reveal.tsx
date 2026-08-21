"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/**
 * Fade-in sutil al entrar en viewport. Se dispara una sola vez.
 * El movimiento (opacity + translateY) usa el mismo easing expo-out de los
 * botones para mantener el lenguaje del sitio. Respeta prefers-reduced-motion
 * vía la regla en globals.css.
 */
/** Fracción del elemento que tiene que estar en pantalla para disparar la
 *  entrada. Compartido con DisplayHeading. */
export const UMBRAL = 0.2;

export function Reveal({
  children,
  className = "",
  delay = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Estilos del contenedor, para lo que no se puede expresar con una clase
   *  —una medida calculada, por ejemplo—. Se mezcla con el `transitionDelay`,
   *  que lo pone el propio componente. */
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      // Mismo umbral que DisplayHeading. Iban a 0.25 y 0.2 respectivamente,
      // así que dentro de una misma sección el titular arrancaba antes que su
      // eyebrow y la cascada se descosía según a qué velocidad bajara cada
      // lector. Un solo valor para todo lo que entra.
      { threshold: UMBRAL }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal${visible ? " is-visible" : ""} ${className}`}
      style={
        delay || style
          ? { ...style, ...(delay ? { transitionDelay: `${delay}ms` } : null) }
          : undefined
      }
    >
      {children}
    </div>
  );
}
