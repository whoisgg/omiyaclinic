"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

interface SceneContent {
  id: number
  centerImage: { src: string; title: string }
  corners: [
    { src: string; title: string }, // Top-Left
    { src: string; title: string }, // Top-Right
    { src: string; title: string }, // Bottom-Left
    { src: string; title: string }, // Bottom-Right
  ]
  quote: string
}

const scenes: SceneContent[] = [
  {
    id: 1,
    centerImage: {
      src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80",
      title: "The Vision",
    },
    corners: [
      { src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80", title: "Inception" },
      { src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80", title: "Paris" },
      { src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80", title: "Research" },
      { src: "https://images.unsplash.com/photo-1512484776495-a09d92e87c3b?w=800&q=80", title: "Training" },
    ],
    quote: "Beauty is not about youth. It's about health and harmony.",
  },
  {
    id: 2,
    centerImage: {
      src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200&q=80",
      title: "Sanctuary",
    },
    corners: [
      { src: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=800&q=80", title: "Precision" },
      { src: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&q=80", title: "Tech" },
      { src: "https://images.unsplash.com/photo-1490682143684-14369e18dce8?w=800&q=80", title: "Nature" },
      { src: "https://images.unsplash.com/photo-1666214280391-8ff89aa6534c?w=800&q=80", title: "Care" },
    ],
    quote: "We don't define you. We reveal you.",
  },
]

export default function DoctorsJourney() {
  const sectionRef = useRef(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const container = containerRef.current
      if (!container) return

      gsap.to(container, {
        x: () => -(container.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + (container.scrollWidth - window.innerWidth), // Natural 1:1 scroll speed, or multiply for slower feel
          invalidateOnRefresh: true,
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="relative h-screen bg-cream text-obsidian overflow-hidden">
      {/* Fixed Title overlapping everything */}
      <div className="absolute top-8 left-8 z-30">
        <h2 className="text-sm font-bold uppercase tracking-widest text-soft-gold">The Doctor&apos;s Journey</h2>
      </div>

      {/* Background Contours */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,40 Q50,20 100,40" stroke="currentColor" strokeWidth="0.1" fill="none" />
          <path d="M0,60 Q50,80 100,60" stroke="currentColor" strokeWidth="0.1" fill="none" />
        </svg>
      </div>

      {/* Horizontal Flex Container */}
      <div ref={containerRef} className="flex h-full w-[200vw] will-change-transform">
        {scenes.map((scene) => (
          <div
            key={scene.id}
            className="journey-scene w-screen h-screen relative flex-shrink-0 flex items-center justify-center"
          >
            {/* Central Image (50-60% height, centered but slightly scattered) */}
            {/* Moved slightly right to match 'big near center of other 4' idea better */}
            <div className="relative z-10 w-[30vh] h-[50vh] md:w-[40vh] md:h-[60vh] shadow-2xl translate-x-[5vw]">
              <img
                src={scene.centerImage.src}
                alt={scene.centerImage.title}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-obsidian/50 whitespace-nowrap">
                {scene.centerImage.title}
              </span>
            </div>

            {/* Corners Group - Scattered around center */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              {/* Top-Left: High Performance Gala position */}
              <div className="absolute top-[15%] left-[10%] w-[12vw] md:w-[10vw] aspect-[4/5]">
                <img src={scene.corners[0].src} className="w-full h-full object-cover grayscale opacity-80" alt="" />
              </div>
              {/* Mid-Left/Bottom-Left: Battersea position */}
              <div className="absolute bottom-[20%] left-[15%] w-[15vw] md:w-[12vw] aspect-square">
                <img src={scene.corners[2].src} className="w-full h-full object-cover grayscale opacity-80" alt="" />
              </div>

              {/* Far Right Top: Austria Position */}
              <div className="absolute top-[20%] right-[5%] w-[15vw] md:w-[12vw] aspect-[4/5]">
                <img src={scene.corners[1].src} className="w-full h-full object-cover grayscale opacity-80" alt="" />
              </div>

              {/* Bottom Right: US 2024 Position */}
              <div className="absolute bottom-[10%] right-[15%] w-[12vw] md:w-[10vw] aspect-square">
                <img src={scene.corners[3].src} className="w-full h-full object-cover grayscale opacity-80" alt="" />
              </div>
            </div>

            {/* Quote (Lower Right/Center) */}
            <div className="absolute bottom-[15%] left-1/2 translate-x-10 text-left z-20 w-fit max-w-sm px-4">
              <p className="text-xl md:text-2xl font-serif italic text-obsidian px-4 py-2 leading-tight">
                &quot;{scene.quote}&quot;
              </p>
              <img src="/signature.svg" alt="Signature" className="h-8 mt-4 opacity-60 ml-4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
