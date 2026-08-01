// Mirrors ConsentPolicy in the Rails app. Consequence is resolved there, from
// the arguments of a tool call, and the interface only renders the result —
// so a grading decision cannot be made in two places and disagree.
//
// Keys stay snake_case to match the API envelope rather than transforming on
// the way in, which would put a second name for every field into the codebase.

export type Reversibility = 'read' | 'reversible' | 'irreversible'

export type Reach = 'internal' | 'nominated' | 'audience' | 'unknown'

export type ConsentLevel = 'none' | 'notice' | 'confirm' | 'verify'

export interface Consequence {
  tool: string
  operation: string | null
  reversibility: Reversibility
  reach: Reach
  consent_level: ConsentLevel
  preview_with: string | null
  rehearse_with: string | null
  declared: boolean
}

export interface ReadinessCheck {
  label: string
  ok: boolean
  detail?: string
}
