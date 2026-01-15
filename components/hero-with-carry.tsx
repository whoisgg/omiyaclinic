"use client"

import type React from "react"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion"
import InteractivePortrait from "./interactive-portrait"
import SignatureMarqueeSection from "./signature-marquee-section"

export default function HeroWithCarry({ dockRef }: { dockRef: React.RefObject<HTMLDivElement> }) {
  const heroRef = useRef<HTMLElement>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 2600)
    return () => clearTimeout(t)
  }, [])

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  })

  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  const boxW = 520
  const boxH = 520

  const textOpacity = useTransform(p, [0.1, 0.3], [0, 1])
  const portraitOpacity = useTransform(p, [0.48, 0.62], [1, 0])
  const logoOpacity = useTransform(p, [0.55, 0.72], [0, 1])
  const boxScale = useTransform(p, [0, 0.45, 1], [1, 0.55, 0.42])

  const dockY = useMotionValue(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (!dockRef.current) return
      const r = dockRef.current.getBoundingClientRect()
      const dockCenterY = r.top + r.height / 2
      const viewportCenterY = window.innerHeight / 2
      dockY.set(dockCenterY - viewportCenterY)
    }

    measure()

    const ro = new ResizeObserver(measure)
    if (dockRef.current) ro.observe(dockRef.current)

    window.addEventListener("resize", measure)
    window.addEventListener("scroll", measure, { passive: true })

    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
      window.removeEventListener("scroll", measure)
    }
  }, [dockRef, dockY])

  const boxY = useTransform(p, (v) => {
    if (v < 0.78) return 0
    const t = Math.min((v - 0.78) / (1 - 0.78), 1)
    const ease = t * t * (3 - 2 * t)
    return dockY.get() * ease
  })

  const scrollHintOpacity = useTransform(p, [0, 0.1], [1, 0])

  return (
    <>
      <section ref={heroRef} className="relative h-[300vh] bg-background z-0">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-background">
          <motion.div
            className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: textOpacity }}
          >
            <SignatureMarqueeSection />
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            style={{ opacity: scrollHintOpacity }}
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-pure-white/40">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-pure-white/20 to-transparent" />
          </motion.div>
        </div>
      </section>

      <motion.div
        className="fixed left-1/2 top-1/2 z-[999] pointer-events-none"
        style={{
          x: "-50%",
          y: "-50%",
        }}
      >
        <motion.div
          className="relative overflow-hidden bg-background"
          style={{
            width: boxW,
            height: boxH,
            scale: boxScale,
            translateY: boxY,
            borderRadius: 24,
          }}
        >
          <motion.div className="absolute inset-0" style={{ opacity: portraitOpacity }}>
            <div className="w-full h-full flex items-center justify-center">{isReady && <InteractivePortrait />}</div>
          </motion.div>

          <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: logoOpacity }}>
            <img src="/images/small-logo.png" alt="OMIYA Logo" className="w-[70%] h-[70%] object-contain" />
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  )
}
