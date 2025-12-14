"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

type TimelineCardProps = {
  id: string
  image: string
  title: string
  subtitle?: string
  description?: string
  onClick?: () => void
}

export function TimelineCard({
  id,
  image,
  title,
  subtitle,
  description,
  onClick,
}: TimelineCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["center end", "center start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.9])
  const grayscale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0, 0.8])

  return (
    <motion.div
      ref={ref}
      layoutId={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ scale }}
      className="relative w-full cursor-pointer overflow-hidden rounded-2xl shadow-lg aspect-video lg:aspect-[2/1] group"
      onClick={onClick}
    >
      <motion.div className="relative h-full w-full" style={{ opacity }}>
        <motion.img
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            filter: useTransform(grayscale, (v) => `grayscale(${v * 100}%)`),
          }}
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8">
          {subtitle ? (
            <motion.span className="mb-2 block text-sm font-medium tracking-wider text-white/90 uppercase md:text-base">
              {subtitle}
            </motion.span>
          ) : null}
          <motion.h3 className="mb-3 font-heading text-2xl font-bold text-white md:text-4xl">
            {title}
          </motion.h3>
          {description ? (
            <p className="line-clamp-2 max-w-2xl text-sm text-white/80 md:text-base">
              {description}
            </p>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  )
}


