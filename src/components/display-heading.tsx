"use client";

import { useEffect, useRef, useState, type ElementType } from "react";

import { UMBRAL } from "@/components/reveal";

/**
 * Titular de escala editorial con entrada escalonada (blur + lift).
 *
 * El titular se escribe como líneas cortas (2–3 palabras) y las líneas desde
 * `dimFrom` en adelante se atenúan: la jerarquía vive dentro de la frase.
 *
 *   <DisplayHeading lines={["Cada piel", "es distinta."]} />
 *
 * `split="letter"` reparte la cascada letra por letra — reservado para el
 * momento principal de una página, no para cada sección.
 * Las clases visuales viven en globals.css (`.display`, `.display-part`);
 * el respeto a prefers-reduced-motion también.
 */
export function DisplayHeading({
  lines,
  dimFrom = 1,
  as: Tag = "h2" as ElementType,
  tone = "light",
  size = "lg",
  split = "line",
  delay = 0,
  immediate = false,
  className = "",
}: {
  lines: string[];
  /** Índice de la primera línea atenuada. `lines.length` = ninguna. */
  dimFrom?: number;
  as?: ElementType;
  tone?: "light" | "dark";
  size?: "lg" | "sm";
  split?: "line" | "letter";
  /** Retardo base de la cascada, en ms. */
  delay?: number;
  /** Revela al montar en vez de esperar a entrar en pantalla. Necesario
   *  above the fold: ahí el observador no aporta nada y encima falla si un
   *  ancestro está recortado con clip-path, como pasa en el hero. */
  immediate?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (immediate) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: UMBRAL },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  // Contador global de partes: la cascada es continua entre líneas.
  let part = 0;
  const step = split === "letter" ? 24 : 110;

  return (
    <Tag
      ref={ref}
      aria-label={lines.join(" ")}
      className={[
        "font-serif display",
        size === "sm" && "display-sm",
        tone === "dark" && "display-dark",
        split === "letter" && "display-letters",
        visible && "is-visible",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {lines.map((line, i) => (
        <span
          key={line + i}
          aria-hidden="true"
          className={`line${i >= dimFrom ? " dim" : ""}`}
        >
          {split === "line" ? (
            <span
              className="display-part"
              style={{ transitionDelay: `${delay + part++ * step}ms` }}
            >
              {line}
            </span>
          ) : (
            // Cada palabra es inline-block para que el salto de línea nunca
            // parta una palabra por la mitad; las letras se animan dentro.
            line.split(" ").map((word, w) => (
              <span key={word + w} className="inline-block whitespace-nowrap">
                {[...word].map((char, c) => (
                  <span
                    key={char + c}
                    className="display-part"
                    style={{ transitionDelay: `${delay + part++ * step}ms` }}
                  >
                    {char}
                  </span>
                ))}
                {w < line.split(" ").length - 1 ? " " : null}
              </span>
            ))
          )}
        </span>
      ))}
    </Tag>
  );
}
