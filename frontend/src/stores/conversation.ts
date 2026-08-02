import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { ConsentMode } from '@/types/consent'
import type { Step } from '@/types/conversation'

type Status = 'loading' | 'ready' | 'error'

export const useConversationStore = defineStore('conversation', () => {
  const steps = ref<Step[]>([])
  const status = ref<Status>('loading')
  const mode = ref<ConsentMode>('current')

  // How many user prompts have been sent. The next one is shown with a Send
  // button; everything after it stays hidden until that Send is pressed.
  const promptsSent = ref(0)

  // Outcomes of the pending send, kept here rather than in the panel so the
  // conversation can respond to them.
  const testSentTo = ref<string | null>(null)
  const sent = ref(false)
  const dismissed = ref(false)
  const dismissReason = ref<string | null>(null)
  const draftDiscarded = ref(false)
  const previewLinkOpened = ref(false)

  // Current-mode approvals for non-send destructive tools. Indexed by step so
  // switching modes can clear them without caring which tool was involved.
  const approved = ref<number[]>([])
  const denied = ref<number[]>([])

  // Proposed mode gates the rest of the conversation until the operator
  // retries. Current mode does not: it shows a terse failure, then a confused
  // follow-up from the operator, then continues so the rest of the comparison
  // is still visible.
  const recovered = ref(false)

  const failureIndex = computed(() =>
    steps.value.findIndex((step) => step.type === 'action' && step.failure),
  )

  // User prompts visible in the active mode, in script order.
  const promptIndices = computed(() =>
    steps.value.flatMap((step, index) => {
      if (step.type !== 'message' || step.role !== 'user') return []
      if (step.only_in && step.only_in !== mode.value) return []
      return [index]
    }),
  )

  // Show through the next unsent prompt, or through the end once all are sent.
  const revealCeiling = computed(() => {
    const prompts = promptIndices.value
    if (promptsSent.value < prompts.length) return prompts[promptsSent.value]
    return Math.max(steps.value.length - 1, 0)
  })

  // The framing epilogue waits until the consequential send has been decided
  // (or the draft undone), so it summarises an experience rather than a half
  // transcript.
  const isComplete = computed(
    () => sent.value || dismissed.value || draftDiscarded.value,
  )

  const completionOutcome = computed<'sent' | 'dismissed' | 'discarded' | null>(() => {
    if (draftDiscarded.value) return 'discarded'
    if (dismissed.value) return 'dismissed'
    if (sent.value) return 'sent'
    return null
  })

  async function load() {
    status.value = 'loading'

    try {
      const response = await fetch('/api/conversation')
      const body = await response.json()

      if (!response.ok || !body.ok) throw new Error('request failed')

      steps.value = body.data.steps
      status.value = 'ready'
    } catch {
      status.value = 'error'
    }
  }

  function resetOutcomes() {
    promptsSent.value = 0
    testSentTo.value = null
    sent.value = false
    dismissed.value = false
    dismissReason.value = null
    draftDiscarded.value = false
    previewLinkOpened.value = false
    approved.value = []
    denied.value = []
    recovered.value = false
  }

  // Switching modes resets decisions so the same call can be compared cleanly.
  function setMode(next: ConsentMode) {
    if (next === mode.value) return
    mode.value = next
    resetOutcomes()
  }

  function isPendingPrompt(index: number) {
    const prompts = promptIndices.value
    return promptsSent.value < prompts.length && index === prompts[promptsSent.value]
  }

  function sendPrompt() {
    if (promptsSent.value < promptIndices.value.length) {
      promptsSent.value += 1
    }
  }

  function isVisible(index: number) {
    const step = steps.value[index]

    if (step?.type === 'message' && step.only_in && step.only_in !== mode.value) {
      return false
    }

    if (index > revealCeiling.value) return false

    // Before the first Send, only the opening prompt is on screen.
    if (promptsSent.value === 0) {
      return index === promptIndices.value[0]
    }

    // Discard ends the thread at the draft — no "ready to send" and no panel.
    if (draftDiscarded.value) {
      const draftIndex = steps.value.findIndex(
        (s) => s.type === 'action' && s.consequence.consent_level === 'notice',
      )
      if (draftIndex !== -1 && index > draftIndex) return false
    }

    if (failureIndex.value === -1) return true

    if (mode.value === 'proposed') {
      if (!recovered.value) return index <= failureIndex.value
      // After retry, drop the failed attempt — the successful call follows.
      if (index === failureIndex.value) return false
      return true
    }

    return true
  }

  function isPendingFailure(index: number) {
    if (index !== failureIndex.value) return false
    return mode.value === 'current' || !recovered.value
  }

  function retry() {
    recovered.value = true
  }

  function sendTest() {
    testSentTo.value = 'andrew@lumenkit.com'
  }

  function send() {
    sent.value = true
  }

  // The refusal stays in the transcript with its reason, so "Not now" is a
  // decision rather than a silent close.
  function dismiss(reason: string) {
    dismissReason.value = reason
    dismissed.value = true
  }

  function discardDraft() {
    draftDiscarded.value = true
  }

  function openPreviewLink() {
    previewLinkOpened.value = true
  }

  function allow(index: number) {
    const step = steps.value[index]
    if (step?.type === 'action' && step.send) {
      sent.value = true
      return
    }

    if (!approved.value.includes(index)) {
      approved.value = [...approved.value, index]
    }
  }

  function deny(index: number) {
    const step = steps.value[index]
    if (step?.type === 'action' && step.send) {
      dismissReason.value = null
      dismissed.value = true
      return
    }

    if (!denied.value.includes(index)) {
      denied.value = [...denied.value, index]
    }
  }

  // Clears the deliberate spam-score failure so the happy path is still
  // reachable after the blocked state has been shown.
  function revise() {
    for (const step of steps.value) {
      if (step.type !== 'action' || !step.send) continue

      step.send.checks = step.send.checks.map((check) =>
        check.ok
          ? check
          : { label: 'Spam score 1.2', detail: 'below the 5.0 threshold', ok: true },
      )
      step.send.subject = 'Winter kit — three days left'
      step.send.preview.heading = 'Three days left on the winter kit'
      step.send.preview.body =
        'The merino base layers and the insulated flask are 30% off until Sunday. After that they go back to full price.'
    }
  }

  return {
    steps,
    status,
    mode,
    promptsSent,
    testSentTo,
    sent,
    dismissed,
    dismissReason,
    draftDiscarded,
    previewLinkOpened,
    approved,
    denied,
    recovered,
    failureIndex,
    promptIndices,
    isComplete,
    completionOutcome,
    load,
    setMode,
    isVisible,
    isPendingPrompt,
    isPendingFailure,
    sendPrompt,
    retry,
    sendTest,
    send,
    dismiss,
    discardDraft,
    openPreviewLink,
    allow,
    deny,
    revise,
  }
})
