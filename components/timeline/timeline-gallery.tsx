"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

import type { TimePeriod } from "./types"
import { TimelineBubble } from "./timeline-bubble"
import { TimelineCard } from "./timeline-card"

type TimelineGalleryProps = {
  data: TimePeriod[]
  className?: string
}

export function TimelineGallery({ data, className }: TimelineGalleryProps) {
  const [activeLabel, setActiveLabel] = useState<string>(data[0]?.label ?? "")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const headers = document.querySelectorAll(".timeline-period-header")
      let current = ""

      headers.forEach((header) => {
        const rect = header.getBoundingClientRect()
        if (rect.top <= 140) {
          current = header.getAttribute("data-label") ?? ""
        }
      })

      if (current) setActiveLabel(current)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (selectedId) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
  }, [selectedId])

  return (
    <div ref={galleryRef} className={cn("w-full py-10", className)}>
      <div className="relative container mx-auto px-4 md:px-6">
        <div className="pointer-events-none absolute left-[20px] top-0 bottom-0 flex -translate-x-1/2 flex-col items-center lg:left-1/2">
          <div className="h-3 w-3 shrink-0 rounded-full bg-border" />
          <div className="w-1 grow bg-border" />
          <div className="h-3 w-3 shrink-0 rounded-full bg-border" />
        </div>

        <div className="flex flex-col">
          {data.map((period) => {
            const isActive = activeLabel === period.label
            return (
              <div key={period.label} className="relative timeline-group">
                <div
                  className="timeline-period-header pointer-events-none sticky top-20 z-40 mb-24 flex pl-12 transition-all duration-300 lg:justify-center lg:pl-0"
                  data-label={period.label}
                >
                  <span
                    className={cn(
                      "rounded-full border px-6 py-2 text-xl font-bold shadow-xl backdrop-blur-md transition-all duration-500",
                      isActive
                        ? "scale-110 border-primary bg-primary text-primary-foreground"
                        : "scale-100 border-border/50 bg-muted/90 text-muted-foreground opacity-80"
                    )}
                  >
                    {period.label}
                  </span>
                </div>

                <div className="flex flex-col gap-16 pb-24">
                  {period.elements.map((element, index) => (
                    <div
                      key={element.id}
                      className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-16"
                    >
                      <div className="absolute left-1 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 md:left-[-4px] lg:static lg:col-start-2 lg:row-start-1 lg:flex lg:translate-x-0 lg:translate-y-0 lg:flex-col lg:items-center lg:justify-center">
                        <TimelineBubble />
                      </div>

                      <div
                        className={cn(
                          "w-full pl-12 lg:pl-0",
                          index % 2 === 0
                            ? "lg:col-start-1 lg:row-start-1"
                            : "lg:col-start-3 lg:row-start-1"
                        )}
                      >
                        <TimelineCard {...element} onClick={() => setSelectedId(element.id)} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedId ? (
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="pointer-events-auto absolute inset-0 cursor-pointer bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              layoutId={selectedId}
              className="pointer-events-auto relative z-10 flex h-full w-full flex-col overflow-hidden bg-background shadow-2xl md:h-auto md:max-h-[90vh] md:max-w-5xl md:rounded-3xl"
            >
              {(() => {
                const selectedElement = data
                  .flatMap((p) => p.elements)
                  .find((e) => e.id === selectedId)

                if (!selectedElement) return null

                return (
                  <div className="relative flex h-full flex-col overflow-y-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedId(null)
                      }}
                      className="group absolute right-4 top-4 z-20 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                      type="button"
                    >
                      <X className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90" />
                    </button>

                    <div className="relative h-64 w-full shrink-0 md:h-96">
                      <motion.img
                        src={selectedElement.image}
                        className="h-full w-full object-cover"
                        alt={selectedElement.title}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-8">
                        <motion.h2 className="mb-2 text-3xl font-bold text-white md:text-5xl">
                          {selectedElement.title}
                        </motion.h2>
                        <motion.p className="text-xl text-white/80">
                          {selectedElement.subtitle}
                        </motion.p>
                      </div>
                    </div>

                    <div className="space-y-6 p-8 md:p-12">
                      <p className="border-l-4 border-primary pl-6 text-xl font-light leading-relaxed text-foreground/90 md:text-2xl">
                        {selectedElement.description}
                      </p>

                      <div className="border-t pt-8">{selectedElement.expandedContent}</div>
                    </div>
                  </div>
                )
              })()}
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}


