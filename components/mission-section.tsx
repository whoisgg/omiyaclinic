"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [signatureDrawn, setSignatureDrawn] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setSignatureDrawn(true), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative min-h-screen bg-lorenzo-dark text-lorenzo-text-light pb-24 pt-24"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-balance leading-[1.1] xl:text-8xl">
            <span className="text-lorenzo-accent font-brier leading-[1.1] text-8xl">REDEFINING</span> LIMITS,
            <br />
            FIGHTING FOR <span className="text-lorenzo-accent font-brier leading-[1.1]">VICTORIES</span>,
            <br />
            BRINGING EVERYTHING IN
            <br />
            EVERY SENSE.
            <br />
            DEFINING A <span className="text-lorenzo-accent font-brier leading-[1.1]">LEGACY</span>
            <br />
            IN MOTOCROSS
            <br />
            ON AND OFF THE TRACK.
          </h2>
        </div>

        <div className="relative h-32 flex items-center justify-center mt-16">
          <svg width="400" height="150" viewBox="0 0 400 150" className="w-full max-w-md">
            <motion.path
              d="M30,75 Q60,40 110,75 T220,75 Q250,95 310,65 Q340,45 370,75 M200,90 Q220,110 250,90"
              fill="none"
              stroke="#c8f550"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={signatureDrawn ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
