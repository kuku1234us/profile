"use client"

import * as React from "react"

import { AwsIcon, VerizonIcon } from "@/components/admin/icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { SwitchpointModeOrUnknown, SwitchpointStatus } from "@/lib/switchpoint-server"

import { checkModeAction, saveModeAction } from "./actions"

function modeLabel(mode: SwitchpointModeOrUnknown) {
  if (mode === "aws") return "AWS"
  if (mode === "verizon") return "Verizon"
  return "Unknown"
}

export function SwitchPointServerPanel({
  initialStatus,
}: {
  initialStatus: SwitchpointStatus
}) {
  const [status, setStatus] = React.useState<SwitchpointStatus>(initialStatus)
  const [selected, setSelected] = React.useState<SwitchpointModeOrUnknown>(
    initialStatus.mode
  )
  const [isSaving, setIsSaving] = React.useState(false)
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  const isSupported = status.supported
  const canSave = isSupported && (selected === "aws" || selected === "verizon")
  const isDirty = selected !== status.mode

  async function refresh() {
    setIsRefreshing(true)
    try {
      const next = await checkModeAction()
      setStatus(next)
      setSelected(next.mode)
    } finally {
      setIsRefreshing(false)
    }
  }

  async function save() {
    if (selected !== "aws" && selected !== "verizon") return
    setIsSaving(true)
    try {
      const next = await saveModeAction(selected)
      setStatus(next)
      setSelected(next.mode)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle>SwitchPointServer</CardTitle>
          <CardDescription>
            Current mode: <span className="font-medium">{modeLabel(status.mode)}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!status.supported && status.message ? (
            <p className="text-sm text-muted-foreground">{status.message}</p>
          ) : null}

          <div className="space-y-2">
            <Label>Mode</Label>
            <RadioGroup
              value={selected === "unknown" ? "" : selected}
              onValueChange={(value) => setSelected(value as SwitchpointModeOrUnknown)}
              className="grid gap-2"
            >
              <label className="flex items-center gap-3 rounded-md border p-3 hover:bg-muted/50">
                <RadioGroupItem value="aws" disabled={!isSupported} />
                <AwsIcon className="size-5" />
                <span className="font-medium">AWS</span>
              </label>

              <label className="flex items-center gap-3 rounded-md border p-3 hover:bg-muted/50">
                <RadioGroupItem value="verizon" disabled={!isSupported} />
                <VerizonIcon className="size-5" />
                <span className="font-medium">Verizon</span>
              </label>
            </RadioGroup>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              onClick={save}
              disabled={!canSave || !isDirty || isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={refresh}
              disabled={isRefreshing}
            >
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


