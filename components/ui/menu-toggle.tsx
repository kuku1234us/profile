"use client"

import type { ButtonHTMLAttributes } from "react"

import { motion, type SVGMotionProps } from "framer-motion"

import { cn } from "@/lib/utils"

type MenuToggleProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOpen: boolean
  toggle: () => void
  className?: string
  lineColor?: string
}

const Path = (props: SVGMotionProps<SVGPathElement>) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    strokeLinecap="round"
    {...props}
  />
)

export function MenuToggle({
  isOpen,
  toggle,
  className,
  lineColor = "currentColor",
  ...props
}: MenuToggleProps) {
  return (
    <button
      onClick={toggle}
      className={cn("relative z-50 p-2 focus:outline-none", className)}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      type="button"
      {...props}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" className="overflow-visible">
        <Path
          variants={{
            closed: { d: "M 4 6 L 20 6" },
            open: { d: "M 4 18 L 20 6" },
          }}
          stroke={lineColor}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        <Path
          d="M 4 12 L 20 12"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          stroke={lineColor}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.2 }}
        />
        <Path
          variants={{
            closed: { d: "M 4 18 L 20 18" },
            open: { d: "M 4 6 L 20 18" },
          }}
          stroke={lineColor}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </svg>
    </button>
  )
}


