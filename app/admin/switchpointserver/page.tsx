import { getSwitchpointStatus } from "@/lib/switchpoint-server"

import { SwitchPointServerPanel } from "./switchpointserver-panel"

export const runtime = "nodejs"

export default async function SwitchPointServerPage() {
  const status = await getSwitchpointStatus()
  return <SwitchPointServerPanel initialStatus={status} />
}


