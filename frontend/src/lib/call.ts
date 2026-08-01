import type { Consequence } from '@/types/consent'

// The exact call, shown wherever an action appears. Legibility of what the
// agent is doing is the point of the prototype, so this is never hidden behind
// friendlier phrasing.
export function callSignature(consequence: Consequence): string {
  return consequence.operation
    ? `${consequence.tool}(${consequence.operation})`
    : consequence.tool
}
