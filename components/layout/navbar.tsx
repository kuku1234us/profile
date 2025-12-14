"use client"

import type { MouseEvent } from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useLenis } from "lenis/react"

import { MenuToggle } from "@/components/ui/menu-toggle"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Gallery", href: "#gallery" },
  { name: "Reviews", href: "#reviews" },
  { name: "Timeline", href: "#timeline" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleScrollTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsOpen(false)
    lenis?.scrollTo(href, {
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
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
          href="/"
          onClick={(e) => {
            e.preventDefault()
            lenis?.scrollTo(0, {
              duration: 1.5,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            })
          }}
          className="font-heading text-2xl font-bold tracking-tight"
        >
          URBAN<span className="text-primary">.</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {link.name}
            </a>
          ))}
          <ThemeToggle />
          <button
            className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
            type="button"
          >
            Get Template
          </button>
        </div>

        <MenuToggle
          isOpen={isOpen}
          toggle={() => setIsOpen(!isOpen)}
          className="text-foreground md:hidden"
        />
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 top-16 flex flex-col gap-6 border-b bg-background p-6 shadow-2xl animate-in slide-in-from-top-2 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-lg font-medium"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Theme</span>
            <ThemeToggle />
          </div>
          <button
            className="w-full rounded-xl bg-foreground px-5 py-3 text-lg font-medium text-background"
            type="button"
          >
            Get Template
          </button>
        </div>
      )}
    </nav>
  )
}


