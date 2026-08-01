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

  function dismiss() {
    dismissed.value = true
  }

  return { steps, status, testSentTo, sent, dismissed, load, sendTest, send, dismiss }
})
