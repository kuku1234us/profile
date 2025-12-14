"use server"

import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import type { SwitchpointMode } from "@/lib/switchpoint-server"
import { getSwitchpointStatus, setSwitchpointMode } from "@/lib/switchpoint-server"

async function requireSession() {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error("Unauthorized")
  }
}

export async function checkModeAction() {
  await requireSession()
  return getSwitchpointStatus()
}

export async function saveModeAction(mode: SwitchpointMode) {
  await requireSession()
  if (mode !== "aws" && mode !== "verizon") {
    throw new Error("Invalid mode")
  }
  return setSwitchpointMode(mode)
}


