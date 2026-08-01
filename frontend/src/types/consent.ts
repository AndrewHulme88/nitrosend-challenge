// Mirrors ConsentPolicy in the Rails app. Consequence is resolved there, from
// the arguments of a tool call, and the interface only renders the result
// so a grading decision cannot be made in two places and disagree.

export type Reversibility = 'read' | 'reversible' | 'irreversible'

export type Reach = 'internal' | 'nominated' | 'audience' | 'unknown'

export type ConsentLevel = 'none' | 'notice' | 'confirm' | 'verify'

export interface Consequence {
  tool: string
  operation: string | null
  reversibility: Reversibility
  reach: Reach
  consentLevel: ConsentLevel
  previewWith: string | null
  rehearseWith: string | null
  declared: boolean
}

export interface ReadinessCheck {
  label: string
  ok: boolean
  detail?: string
}
