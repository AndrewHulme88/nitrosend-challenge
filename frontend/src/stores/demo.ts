import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type DemoPhase =
  | 'prompt1'
  | 'composeFail'
  | 'confirmCompose'
  | 'prepared'
  | 'sendConfirm'
  | 'done'

export const useDemoStore = defineStore('demo', () => {
  const phase = ref<DemoPhase>('prompt1')
  const composeDenied = ref(false)
  const sendDenied = ref(false)

  const showComposeFail = computed(() => phase.value !== 'prompt1')
  const composeFailPending = computed(() => phase.value === 'composeFail')

  const showComposeConfirm = computed(
    () =>
      phase.value === 'confirmCompose' ||
      phase.value === 'prepared' ||
      phase.value === 'sendConfirm' ||
      phase.value === 'done',
  )
  const composeConfirmPending = computed(
    () => phase.value === 'confirmCompose' && !composeDenied.value,
  )

  const showPrepared = computed(
    () =>
      phase.value === 'prepared' ||
      phase.value === 'sendConfirm' ||
      phase.value === 'done',
  )
  const preparedPending = computed(() => phase.value === 'prepared')

  const showSendConfirm = computed(
    () => phase.value === 'sendConfirm' || phase.value === 'done',
  )
  const sendConfirmPending = computed(
    () => phase.value === 'sendConfirm' && !sendDenied.value,
  )

  const showSuccess = computed(() => phase.value === 'done')

  const prompt1Pending = computed(() => phase.value === 'prompt1')

  function sendPrompt1() {
    if (phase.value !== 'prompt1') return
    composeDenied.value = false
    sendDenied.value = false
    phase.value = 'composeFail'
  }

  function retryCompose() {
    if (phase.value !== 'composeFail') return
    phase.value = 'confirmCompose'
  }

  function allowCompose() {
    if (phase.value !== 'confirmCompose') return
    composeDenied.value = false
    phase.value = 'prepared'
  }

  function denyCompose() {
    if (phase.value !== 'confirmCompose') return
    composeDenied.value = true
  }

  function viewCampaign() {
    if (phase.value !== 'prepared') return
    sendDenied.value = false
    phase.value = 'sendConfirm'
  }

  function allowSend() {
    if (phase.value !== 'sendConfirm') return
    sendDenied.value = false
    phase.value = 'done'
  }

  function denySend() {
    if (phase.value !== 'sendConfirm') return
    sendDenied.value = true
  }

  /** From a denied live send, reopen the campaign preview and confirm. */
  function reviewAgain() {
    if (phase.value !== 'sendConfirm' || !sendDenied.value) return
    sendDenied.value = false
  }

  function reset() {
    phase.value = 'prompt1'
    composeDenied.value = false
    sendDenied.value = false
  }

  return {
    phase,
    composeDenied,
    sendDenied,
    showComposeFail,
    composeFailPending,
    showComposeConfirm,
    composeConfirmPending,
    showPrepared,
    preparedPending,
    showSendConfirm,
    sendConfirmPending,
    showSuccess,
    prompt1Pending,
    sendPrompt1,
    retryCompose,
    allowCompose,
    denyCompose,
    viewCampaign,
    allowSend,
    denySend,
    reviewAgain,
    reset,
  }
})
