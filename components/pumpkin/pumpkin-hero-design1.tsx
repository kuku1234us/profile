"use client"

import Image from "next/image"
import { PlusIcon, PlayIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function PumpkinHeroDesign1() {
  return (
    <section id="hero" className="relative overflow-hidden pt-28 md:pt-32">
      <div className="relative">
        {/* Background (Design 1): light base + a left blob that stays off the headline */}
        <div className="absolute inset-0 bg-[#fdcb5b]" />

        {/* Big left blob:
            Make it LARGE and anchored far-left so the edge lands to the RIGHT of the text column,
            avoiding the "blob edge cutting through letters" effect. */}
        <div
          className="pointer-events-none absolute -left-[40rem] -top-[22rem] h-[78rem] w-[78rem] rotate-[-6deg] bg-[#f5a400] opacity-95"
          style={{
            borderRadius: "42% 58% 50% 50% / 55% 45% 55% 45%",
          }}
        />

        {/* Subtle right wash behind the image */}
        <div
          className="pointer-events-none absolute -right-[20rem] top-[8rem] h-[34rem] w-[34rem] rotate-[10deg] bg-[#f5a400] opacity-25 blur-[3px]"
          style={{
            borderRadius: "55% 45% 60% 40% / 45% 55% 45% 55%",
          }}
        />

        <div className="relative">
          <div className="container mx-auto px-6">
            <div className="grid min-h-[calc(100svh-7rem)] items-center gap-10 py-10 md:py-14 lg:grid-cols-2 lg:gap-14">
              <div className="max-w-xl lg:pr-8">
                <div className="mb-6 text-xs font-semibold tracking-[0.22em] text-white/80">
                  TRUSTED BY MODERN OPS TEAMS
                </div>

                <h1 className="font-heading text-5xl font-black leading-[1.02] tracking-tight text-white md:text-6xl lg:text-7xl">
                  Turn messy chat into{" "}
                  <span className="font-black text-[#fff0b5]">perfect execution.</span>
                </h1>

                <p className="mt-5 text-base leading-relaxed text-white/85 md:text-lg">
                  Pumpkin is the{" "}
                  <strong className="font-semibold text-white">AI Chief of Staff</strong>{" "}
                  for Logistics. We intercept vague instructions in Microsoft Teams,{" "}
                  <strong className="font-semibold text-white">force clarity</strong>{" "}
                  <em className="italic">before</em> they reach your staff, and stop
                  the guesswork cycle forever.
                </p>

                <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                  <Button
                    // Darker pumpkin accent so it doesn't blend into the yellow background.
                    className="h-11 rounded-full bg-[#a84f00] px-6 text-white shadow-sm hover:bg-[#8f4300]"
                    type="button"
                  >
                    <PlusIcon className="size-4" />
                    Add to Teams
                  </Button>
                  <Button
                    variant="outline"
                    // Visible on yellow: light border + subtle translucent hover.
                    className="h-11 rounded-full border-white/70 bg-transparent px-6 text-white hover:bg-white/10"
                    type="button"
                  >
                    <PlayIcon className="size-4" />
                    See how it works
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/40 shadow-2xl backdrop-blur-sm">
                  <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent" />
                  <Image
                    src="/TeamsScreen.jpg"
                    alt="Microsoft Teams screenshot"
                    width={1400}
                    height={875}
                    priority
                    className="h-auto w-full object-contain"
                  />
                </div>
                <div className="mt-3 text-center text-xs text-black/50">
                  Mock UI preview — replace with a real product shot later.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


