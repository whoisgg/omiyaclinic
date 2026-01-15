"use client"

import { forwardRef } from "react"

export const MissionDock = forwardRef<HTMLDivElement>(function MissionDock(_, ref) {
  return (
    <div ref={ref} className="relative w-full flex justify-center">
      <div className="h-[320px] w-full" />
    </div>
  )
})
