"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function TimelineBubble() {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["center end", "center start"],
  })

  const fillOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0, 0, 1, 0, 0]
  )

  return (
    <div
      ref={ref}
      className="relative h-6 w-6 overflow-hidden rounded-full border-[3px] border-primary bg-background shadow-md lg:h-8 lg:w-8 lg:border-4"
    >
      <motion.div className="absolute inset-0 bg-primary" style={{ opacity: fillOpacity }} />
    </div>
  )
}


