import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

import { AdminShell } from "@/components/admin/admin-shell"
import { authOptions } from "@/lib/auth"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect(`/login?callbackUrl=${encodeURIComponent("/admin")}`)
  }

  return (
    <AdminShell userName={session.user?.name ?? "Admin"}>{children}</AdminShell>
  )
}


