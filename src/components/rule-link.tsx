import Link from "next/link";

/**
 * Enlace terciario con la regla en línea: "Ver más ————".
 *
 * Es el tercer botón del sitio, después de `.btn-luxe` (outline que se rellena)
 * y `.btn-underline` (subrayado que se expande desde la izquierda). Acá la raya
 * nace visible al costado del texto y se estira al hover, así que lee como una
 * flecha sin serlo. Las clases y el movimiento viven en globals.css.
 *
 * `external` cambia el `Link` de Next por un `<a>` con target: los enlaces de
 * reserva salen a la plataforma de agendamiento, no a una ruta del sitio.
 */
export function RuleLink({
  href,
  children,
  external = false,
  wide = false,
  ruleClass = "w-12",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  /** Clase de ancho de la raya cuando no es `wide`. */
  ruleClass?: string;
  /**
   * La raya ocupa todo el ancho que queda a la derecha del texto, en vez de
   * los 48px fijos. Es la variante de los bloques de una sola columna, donde
   * el enlace cierra la sección y la raya la barre entera.
   */
  wide?: boolean;
  className?: string;
}) {
  const clases = `btn-rule items-center gap-4 text-[11px] ${
    wide ? "btn-rule-fill flex w-full" : "inline-flex"
  } ${className}`;

  const contenido = (
    <>
      {children}
      <span
        aria-hidden="true"
        className={`hairline-h block ${
          wide ? "flex-1" : `btn-rule-line ${ruleClass}`
        }`}
        style={{ backgroundColor: "currentColor" }}
      />
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={clases}
      >
        {contenido}
      </a>
    );
  }

  return (
    <Link href={href} className={clases}>
      {contenido}
    </Link>
  );
}
