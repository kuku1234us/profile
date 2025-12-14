"use client"

import * as React from "react"

import { AppSidebar } from "@/components/admin/app-sidebar"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { SidebarInset, SidebarProvider, SidebarRail, SidebarTrigger } from "@/components/ui/sidebar"

export function AdminShell({
  userName,
  children,
}: {
  userName: string
  children: React.ReactNode
}) {
  return (
    <SidebarProvider defaultOpen>
      <AppSidebar userName={userName} />
      <SidebarRail />
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <div className="font-medium">Admin</div>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}


