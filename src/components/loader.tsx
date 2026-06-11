"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/**
 * Pantalla de carga inicial (replicada del sitio anterior, v0-website-replication):
 * overlay negro, logo blanco que se "llena" de abajo hacia arriba según el
 * progreso, textos con reveal vertical, y salida deslizando hacia abajo.
 */
export function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [showText1, setShowText1] = useState(false);
  const [showText2, setShowText2] = useState(false);

  useEffect(() => {
    // Show only once per browser session. A new tab/visit shows it again.
    // The inline script in layout.tsx hides the overlay via CSS before
    // first paint on repeat loads; this just unmounts it.
    if (sessionStorage.getItem("omiya-loader-shown")) {
      setIsLoading(false);
      return;
    }
    sessionStorage.setItem("omiya-loader-shown", "1");

    // The fill always animates over ~2.8s minimum (the site is static and
    // loads instantly, so jumping straight to 100% felt like a flash).
    // While the document isn't loaded yet it stalls at 70%.
    let docLoaded = document.readyState === "complete";
    const onLoad = () => {
      docLoaded = true;
    };
    window.addEventListener("load", onLoad);

    const progressInterval = setInterval(() => {
      setLoadProgress((prev) => {
        const cap = docLoaded ? 100 : 70;
        return Math.min(prev + 1.8, cap);
      });
    }, 50);

    return () => {
      clearInterval(progressInterval);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  // Once the fill reaches 100%, hold briefly and start the exit
  useEffect(() => {
    if (loadProgress >= 100 && !isReady) {
      const t = setTimeout(() => setIsReady(true), 300);
      return () => clearTimeout(t);
    }
  }, [loadProgress, isReady]);

  // Trigger text reveals based on load progress
  useEffect(() => {
    if (loadProgress >= 30 && !showText1) setShowText1(true);
    if (loadProgress >= 60 && !showText2) setShowText2(true);
  }, [loadProgress, showText1, showText2]);

  useEffect(() => {
    if (!isReady) return;

    // Small delay after load complete, then start slide animation
    const timer = setTimeout(() => setIsAnimating(true), 800);
    const removeTimer = setTimeout(() => setIsLoading(false), 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [isReady]);

  if (!isLoading) return null;

  return (
    <div id="site-loader" className="pointer-events-none fixed inset-0 z-[100]" aria-hidden="true">
      {/* Black overlay that slides down */}
      <div
        className="absolute inset-0 origin-top bg-black transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          transform: isAnimating ? "translateY(100%)" : "translateY(0)",
        }}
      >
        {/* Centered logo with fill effect and text */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300"
          style={{ opacity: isAnimating ? 0 : 1 }}
        >
          <div className="relative h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96">
            {/* Background logo (dim) */}
            <Image
              src="/logo-white.png"
              alt=""
              fill
              className="object-contain opacity-20"
              priority
            />

            {/* Foreground logo (fills based on progress) */}
            <div
              className="absolute inset-0 overflow-hidden transition-all duration-150 ease-out"
              style={{ clipPath: `inset(${100 - loadProgress}% 0 0 0)` }}
            >
              <Image
                src="/logo-white.png"
                alt="Omiya Clinic"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Text reveals below logo */}
          <div className="mt-4 flex flex-col items-center gap-2 md:mt-6">
            <div className="overflow-hidden">
              <span
                className="block py-1 font-serif text-2xl font-light uppercase tracking-[0.18em] text-white transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:text-3xl"
                style={{
                  transform: showText1 ? "translateY(0)" : "translateY(110%)",
                }}
              >
                Omiya Clinic
              </span>
            </div>
            <div className="overflow-hidden">
              <span
                className="block py-1 text-[10px] uppercase tracking-[0.3em] text-white/60 transition-transform delay-100 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:text-xs"
                style={{
                  transform: showText2 ? "translateY(0)" : "translateY(110%)",
                }}
              >
                By Dra. Antonieta Ortega
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
