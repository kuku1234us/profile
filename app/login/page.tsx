import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"

import { LoginForm } from "./login-form"

export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect("/admin")
  }

  return (
    <div className="flex min-h-svh items-center justify-center px-4">
      <LoginForm />
    </div>
  )
}


