import "server-only"

import { access } from "node:fs/promises"
import { constants as fsConstants } from "node:fs"
import { execFile } from "node:child_process"
import { promisify } from "node:util"

const execFileAsync = promisify(execFile)

export type SwitchpointMode = "aws" | "verizon"
export type SwitchpointModeOrUnknown = SwitchpointMode | "unknown"

export type SwitchpointStatus = {
  supported: boolean
  mode: SwitchpointModeOrUnknown
  message?: string
}

const CHECK_MODE_PATH =
  process.env.SWITCHPOINT_CHECK_MODE_PATH ?? "/usr/local/bin/check_mode"
const USE_AWS_PATH =
  process.env.SWITCHPOINT_USE_AWS_PATH ?? "/usr/local/bin/use_aws"
const USE_VERIZON_PATH =
  process.env.SWITCHPOINT_USE_VERIZON_PATH ?? "/usr/local/bin/use_verizon"

async function ensureExecutable(path: string) {
  await access(path, fsConstants.X_OK)
}

async function runSudoScript(path: string) {
  // -n: non-interactive (fail instead of prompting for a password)
  return execFileAsync("sudo", ["-n", path], {
    timeout: 20_000,
  })
}

function parseMode(output: string): SwitchpointModeOrUnknown {
  const value = output.trim().toLowerCase()
  if (value === "aws" || value === "verizon") return value
  return "unknown"
}

export async function getSwitchpointStatus(): Promise<SwitchpointStatus> {
  if (process.platform !== "linux") {
    return {
      supported: false,
      mode: "unknown",
      message: `SwitchPointServer scripts can only run on Linux. Current platform: ${process.platform}.`,
    }
  }

  try {
    await ensureExecutable(CHECK_MODE_PATH)
  } catch {
    return {
      supported: false,
      mode: "unknown",
      message: `Missing or non-executable script: ${CHECK_MODE_PATH}`,
    }
  }

  try {
    const { stdout } = await runSudoScript(CHECK_MODE_PATH)
    return {
      supported: true,
      mode: parseMode(stdout),
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error"
    return {
      supported: false,
      mode: "unknown",
      message: `Failed to run check_mode: ${msg}`,
    }
  }
}

export async function setSwitchpointMode(
  mode: SwitchpointMode
): Promise<SwitchpointStatus> {
  if (process.platform !== "linux") {
    return {
      supported: false,
      mode: "unknown",
      message: `SwitchPointServer scripts can only run on Linux. Current platform: ${process.platform}.`,
    }
  }

  const scriptPath = mode === "aws" ? USE_AWS_PATH : USE_VERIZON_PATH

  try {
    await ensureExecutable(scriptPath)
  } catch {
    return {
      supported: false,
      mode: "unknown",
      message: `Missing or non-executable script: ${scriptPath}`,
    }
  }

  try {
    await runSudoScript(scriptPath)
    // Verify by checking the current mode after switching.
    return await getSwitchpointStatus()
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error"
    return {
      supported: false,
      mode: "unknown",
      message: `Failed to switch mode via ${scriptPath}: ${msg}`,
    }
  }
}


