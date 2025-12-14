import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Inter, Outfit } from "next/font/google"
import { ThemeProvider } from "next-themes"

import "./globals.css"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
})

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Urban Gallery Template",
  description: "A premium reusable web app template",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
