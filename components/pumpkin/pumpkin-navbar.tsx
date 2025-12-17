"use client"

import type { MouseEvent } from "react"
import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useLenis } from "lenis/react"
import { ChevronDownIcon } from "lucide-react"

import { PumpkinLogo } from "@/components/pumpkin/pumpkin-logo"
import { MenuToggle } from "@/components/ui/menu-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { cn } from "@/lib/utils"

const designs = [
  { id: "1", name: "Design 1" },
  { id: "2", name: "Design 2" },
  { id: "3", name: "Design 3" },
] as const

type DesignId = (typeof designs)[number]["id"]

function getDesignFromPathname(pathname: string): DesignId {
  const match = pathname.match(/\/design\/(1|2|3)(?:\/|$)/)
  const value = match?.[1]
  if (value === "2" || value === "3") return value
  return "1"
}

export function PumpkinNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const lenis = useLenis()
  const router = useRouter()
  const pathname = usePathname()

  const design = getDesignFromPathname(pathname)
  const homeHref = pathname.startsWith("/pumpkin") ? "/pumpkin" : "/"

  const currentDesignName = useMemo(() => {
    return designs.find((d) => d.id === design)?.name ?? "Design 1"
  }, [design])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleScrollTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsOpen(false)
    lenis?.scrollTo(href, {
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
  }

  const setDesign = (value: string) => {
    const nextDesign: DesignId =
      value === "2" || value === "3" || value === "1" ? value : "1"
    if (nextDesign === "1") {
      router.push(homeHref)
      setIsOpen(false)
      return
    }

    // Support both URL shapes:
    // - profile host: /pumpkin/design/2
    // - pumpkin host (middleware rewrite): /design/2  -> rewritten to /pumpkin/design/2
    const nextPath = pathname.startsWith("/pumpkin")
      ? `/pumpkin/design/${nextDesign}`
      : `/design/${nextDesign}`

    router.push(nextPath)
    setIsOpen(false)
  }

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "border-b bg-background/80 backdrop-blur-md" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link
          href={homeHref}
          onClick={(e) => {
            e.preventDefault()
            lenis?.scrollTo(0, {
              duration: 1.2,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            })
          }}
          className="flex items-center"
        >
          <PumpkinLogo
            className={cn(
              "h-7 w-[160px] md:h-8 md:w-[180px]",
              // White looks best on the hero background; switch to foreground when navbar
              // becomes light/blurred after scroll.
              isScrolled
                ? "text-foreground"
                : "text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]"
            )}
          />
        </Link>

        <div
          className={cn(
            "hidden items-center gap-6 md:flex",
            // On hero: white controls read better; after scroll we switch back to normal foreground.
            isScrolled
              ? "text-foreground"
              : "text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]"
          )}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors",
                  // Theme-aware so dark mode doesn't end up with hard-to-see greys.
                  isScrolled
                    ? "border-border bg-background/60 text-foreground hover:bg-muted"
                    : "border-white/25 bg-white/15 text-white hover:bg-white/25"
                )}
              >
                {currentDesignName}
                <ChevronDownIcon className="size-4 opacity-70" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[10rem]">
              <DropdownMenuRadioGroup value={design} onValueChange={setDesign}>
                {designs.map((d) => (
                  <DropdownMenuRadioItem key={d.id} value={d.id}>
                    {d.name}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <a
            href="#gallery"
            onClick={(e) => handleScrollTo(e, "#gallery")}
            className={cn(
              "text-sm font-medium transition-colors",
              // Match the main site's navbar behavior: primary hover works in both themes.
              isScrolled ? "hover:text-primary" : "hover:text-[#fff0b5]"
            )}
          >
            Gallery
          </a>

          <ThemeToggle
            className={cn(
              isScrolled
                ? "text-foreground"
                : "text-white hover:bg-white/10"
            )}
          />
        </div>

        <MenuToggle
          isOpen={isOpen}
          toggle={() => setIsOpen(!isOpen)}
          className={cn(
            "md:hidden",
            isScrolled
              ? "text-foreground"
              : "text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]"
          )}
        />
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 top-16 flex flex-col gap-5 border-b bg-background p-6 shadow-2xl animate-in slide-in-from-top-2 md:hidden">
          <div className="space-y-2">
            <div className="text-xs font-medium tracking-widest text-muted-foreground">
              DESIGN
            </div>
            <div className="grid gap-2">
              {designs.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDesign(d.id)}
                  className={cn(
                    "w-full rounded-lg border px-4 py-3 text-left text-sm font-medium",
                    d.id === design ? "bg-muted" : "bg-background"
                  )}
                >
                  {d.name}
                </button>
              ))}
            </div>
          </div>

          <a
            href="#gallery"
            onClick={(e) => handleScrollTo(e, "#gallery")}
            className="text-base font-medium"
          >
            Gallery
          </a>

          <div className="flex items-center justify-between">
            <span className="text-base font-medium">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  )
}


