"use client"

import type { HTMLAttributes, ReactNode } from "react"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"

import { cn } from "@/lib/utils"

type SectionProps = HTMLAttributes<HTMLElement> & {
  id?: string
  children: ReactNode
  className?: string
  noPadding?: boolean
  clipOverflow?: boolean
}

export function Section({
  id,
  children,
  className,
  noPadding = false,
  clipOverflow = true,
  ...props
}: SectionProps) {
  const ref = useRef<HTMLElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "relative w-full",
        clipOverflow && "overflow-hidden",
        !noPadding && "py-20 md:py-32",
        className
      )}
      {...props}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  )
}


