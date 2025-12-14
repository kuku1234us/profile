"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { Section } from "@/components/ui/section"

export function Hero() {
  return (
    <Section id="about" className="flex min-h-screen items-center justify-center pt-32">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <span className="mb-6 inline-block rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
            New Collection 2025
          </span>
          <h1 className="mb-8 font-heading text-5xl font-bold leading-tight tracking-tight md:text-7xl lg:text-8xl">
            Redefining <br className="hidden md:block" />
            <span className="text-muted-foreground">Urban Living</span> Space
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Experience the perfect blend of modern design and comfort. Our curated
            spaces are designed to inspire and elevate your lifestyle.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <button
              className="group flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-lg font-medium text-background transition-opacity hover:opacity-90"
              type="button"
            >
              Explore Properties
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              className="rounded-full border border-border px-8 py-4 text-lg font-medium transition-colors hover:bg-secondary/50"
              type="button"
            >
              View Gallery
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="relative mt-20 h-[400px] w-full overflow-hidden rounded-2xl bg-muted md:h-[600px]"
        >
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent z-10" />
          <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        </motion.div>
      </div>
    </Section>
  )
}


