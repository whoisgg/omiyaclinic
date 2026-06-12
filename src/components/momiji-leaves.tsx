"use client";

/**
 * Hojas de momiji (acuarela) que se desprenden de la rama superior-izquierda y
 * derivan en diagonal con un leve vaivén, sutiles y escalonadas. Usa los PNG
 * recortados en /public/momiji/leaves. Config determinista (sin random) para no
 * romper la hidratación. Respeta prefers-reduced-motion.
 */

type LeafCfg = {
  n: number;
  left: number; // % desde la izquierda (zona de la rama)
  top: number; // % desde arriba
  w: number; // ancho en px
  dur: number; // duración de la caída (s)
  delay: number; // desfase (s)
  dx: string; // deriva horizontal
  dy: string; // deriva vertical
  rot: string; // rotación total durante la caída
  op: number; // opacidad máxima
  sway: number; // periodo del aleteo (s)
};

const LEAVES: LeafCfg[] = [
  { n: 1, left: 7, top: 3, w: 48, dur: 17, delay: 0, dx: "42vw", dy: "78vh", rot: "150deg", op: 0.9, sway: 4.5 },
  { n: 3, left: 15, top: -3, w: 36, dur: 22, delay: 4, dx: "56vw", dy: "85vh", rot: "-130deg", op: 0.82, sway: 5.5 },
  { n: 5, left: 3, top: 11, w: 42, dur: 19, delay: 8, dx: "50vw", dy: "70vh", rot: "210deg", op: 0.88, sway: 5 },
  { n: 2, left: 23, top: 5, w: 30, dur: 25, delay: 11, dx: "62vw", dy: "82vh", rot: "-170deg", op: 0.75, sway: 6 },
  { n: 4, left: 11, top: 9, w: 54, dur: 18, delay: 14, dx: "46vw", dy: "76vh", rot: "130deg", op: 0.8, sway: 4.8 },
  { n: 6, left: 19, top: 1, w: 26, dur: 23, delay: 6, dx: "54vw", dy: "68vh", rot: "-210deg", op: 0.72, sway: 5.8 },
];

export function MomijiLeaves() {
  return (
    <div
      data-hero-leaves
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
    >
      <style>{`
        @keyframes momijiFall {
          0% { transform: translate3d(0,0,0) rotate(0deg); opacity: 0; }
          8% { opacity: var(--op); }
          88% { opacity: var(--op); }
          100% { transform: translate3d(var(--dx), var(--dy), 0) rotate(var(--rot)); opacity: 0; }
        }
        @keyframes momijiSway {
          from { transform: rotate(-8deg); }
          to { transform: rotate(8deg); }
        }
        .momiji-leaf {
          position: absolute;
          will-change: transform, opacity;
          animation: momijiFall var(--dur) linear var(--delay) infinite;
        }
        .momiji-leaf img {
          display: block;
          width: 100%;
          height: auto;
          transform-origin: center;
          animation: momijiSway var(--sway) ease-in-out infinite alternate;
        }
        @media (prefers-reduced-motion: reduce) {
          .momiji-leaf, .momiji-leaf img { animation: none; opacity: 0; }
        }
      `}</style>

      {LEAVES.map((l) => (
        <div
          key={l.n}
          className="momiji-leaf"
          style={
            {
              left: `${l.left}%`,
              top: `${l.top}%`,
              width: `${l.w}px`,
              "--dur": `${l.dur}s`,
              "--delay": `${l.delay}s`,
              "--dx": l.dx,
              "--dy": l.dy,
              "--rot": l.rot,
              "--op": l.op,
              "--sway": `${l.sway}s`,
            } as React.CSSProperties
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/momiji/leaves/leaf-${l.n}.webp`} alt="" />
        </div>
      ))}
    </div>
  );
}
