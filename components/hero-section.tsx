"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import InteractivePortrait from "./interactive-portrait"
import SignatureMarqueeSection from "./signature-marquee-section"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 2600)
    return () => clearTimeout(timer)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const p = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const textOpacity = useTransform(p, [0.1, 0.3], [0, 1])

  const portraitOpacity = useTransform(p, [0.48, 0.62], [1, 0])
  const logoOpacity = useTransform(p, [0.55, 0.7], [0, 1])

  const boxScale = useTransform(p, (v) => {
    if (v < 0.7) {
      const t = Math.min(v / 0.45, 1)
      return 1 + (0.45 - 1) * t
    }
    const t = Math.min((v - 0.7) / 0.3, 1)
    return 0.45 + (0.34 - 0.45) * t
  })

  const boxY = useTransform(p, [0.75, 1.0], ["0vh", "45vh"])

  const boxOpacity = useTransform(p, [0.0, 0.95], [1, 1])

  const scrollHintOpacity = useTransform(p, [0, 0.1], [1, 0])

  const leftTextOpacity = useTransform(p, [0, 0.45, 0.6], [1, 1, 0])
  const leftTextX = useTransform(p, [0, 0.45, 0.6], [0, 0, -30])

  return (
    <section ref={containerRef} className="relative h-[150vh] bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-background">
        {/* Background text */}
        <motion.div
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: textOpacity }}
        >
          <SignatureMarqueeSection />
        </motion.div>

        <motion.div
          className="relative z-50 w-full h-full flex items-center justify-center overflow-hidden"
          style={{
            y: boxY,
            scale: boxScale,
            opacity: boxOpacity,
          }}
        >
          {/* Portrait */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: portraitOpacity }}
          >
            <div className="w-full h-full flex items-center justify-center">
              {isReady && (
                <InteractivePortrait>
                  {/* Left side text integrated into portrait */}
                  <motion.div
                    style={{
                      opacity: leftTextOpacity,
                      x: leftTextX,
                    }}
                  >
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-mona font-light text-black leading-[1.0] tracking-tighter">
                      TRATAMIENTOS <br />
                      QUE <br />
                      <span className="text-lorenzo-accent font-brier italic">REALZAN</span> <br />
                      TU BELLEZA <br />
                      AUTÉNTICA
                    </h2>
                  </motion.div>
                </InteractivePortrait>
              )}
            </div>
          </motion.div>

          {/* Logo */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none bg-background"
            style={{ opacity: logoOpacity }}
          >
            <div className="w-full h-full flex items-center justify-center p-12 md:p-24 lg:p-32">
              <img src="/images/small-logo.png" alt="OMIYA Logo" className="w-full h-full object-contain" />
            </div>
          </motion.div>
        </motion.div>


        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          style={{ opacity: scrollHintOpacity }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-pure-white/40">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-pure-white/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
