import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Step } from '@/types/conversation'

type Status = 'loading' | 'ready' | 'error'

export const useConversationStore = defineStore('conversation', () => {
  const steps = ref<Step[]>([])
  const status = ref<Status>('loading')

  // Outcomes of the pending send, kept here rather than in the panel so the
  // conversation can respond to them.
  const testSentTo = ref<string | null>(null)
  const sent = ref(false)
  const dismissed = ref(false)
  const dismissReason = ref<string | null>(null)

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

  // Clears the deliberate spam score failure so the happy path is still
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
    testSentTo,
    sent,
    dismissed,
    dismissReason,
    load,
    sendTest,
    send,
    dismiss,
    revise,
  }
})
