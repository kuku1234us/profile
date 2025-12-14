import type { ReactNode } from "react"

export type TimePeriodElement = {
  id: string
  title: string
  subtitle?: string
  description?: string
  image: string
  expandedContent?: ReactNode
}

export type TimePeriod = {
  label: string
  elements: TimePeriodElement[]
}


