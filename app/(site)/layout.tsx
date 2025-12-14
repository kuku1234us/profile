import type { ReactNode } from "react"

import { Navbar } from "@/components/layout/navbar"
import { SmoothScroll } from "@/components/ui/smooth-scroll"

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <Navbar />
      {children}
    </SmoothScroll>
  )
}


