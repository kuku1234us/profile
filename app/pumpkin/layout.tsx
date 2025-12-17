import type { ReactNode } from "react"

import { PumpkinNavbar } from "@/components/pumpkin/pumpkin-navbar"
import { SmoothScroll } from "@/components/ui/smooth-scroll"

export default function PumpkinLayout({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      {/* Give Pumpkin pages a consistent light base so the fixed navbar never sits on a dark body */}
      <div className="min-h-svh bg-[#fdcb5b]">
        <PumpkinNavbar />
        {children}
      </div>
    </SmoothScroll>
  )
}


