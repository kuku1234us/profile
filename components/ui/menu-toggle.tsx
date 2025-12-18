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
  const topClosed = "M 4 6 L 20 6"
  const topOpen = "M 4 18 L 20 6"
  const midLine = "M 4 12 L 20 12"
  const botClosed = "M 4 18 L 20 18"
  const botOpen = "M 4 6 L 20 18"

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
          // Ensure the path is always valid on first paint (avoids framer-motion
          // trying to animate from `undefined`).
          initial={false}
          d={isOpen ? topOpen : topClosed}
          variants={{
            closed: { d: topClosed },
            open: { d: topOpen },
          }}
          stroke={lineColor}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        <Path
          initial={false}
          d={midLine}
          // Same idea: define a concrete initial opacity so we don't animate from `undefined`.
          style={{ opacity: isOpen ? 0 : 1 }}
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          stroke={lineColor}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.2 }}
        />
        <Path
          initial={false}
          d={isOpen ? botOpen : botClosed}
          variants={{
            closed: { d: botClosed },
            open: { d: botOpen },
          }}
          stroke={lineColor}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </svg>
    </button>
  )
}


