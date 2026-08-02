import type { Consequence, CurrentAnnotation, ReadinessCheck } from '@/types/consent'

export interface Message {
  type: 'message'
  role: 'user' | 'assistant'
  text: string
}

export interface SendDetails {
  subject: string
  audience: string
  recipients: number
  preview: {
    heading: string
    body: string
    cta: string
  }
  checks: ReadinessCheck[]
}

export interface Action {
  type: 'action'
  tool: string
  arguments?: Record<string, string>
  summary: string
  result?: string
  undo?: string
  send?: SendDetails
  consequence: Consequence
  current: CurrentAnnotation
}

export type Step = Message | Action
