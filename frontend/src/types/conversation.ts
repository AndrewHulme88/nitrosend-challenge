import type { ConsentMode, Consequence, CurrentAnnotation, ReadinessCheck } from '@/types/consent'

export interface Message {
  type: 'message'
  role: 'user' | 'assistant'
  text: string
  // When set, the message is only rendered in that consent mode. Used for the
  // confused follow-up that current terse failure forces on the operator.
  only_in?: ConsentMode
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
  failure?: {
    code: string
    message: string
    retriable: boolean
  }
  send?: SendDetails
  consequence: Consequence
  current: CurrentAnnotation
}

export type Step = Message | Action
