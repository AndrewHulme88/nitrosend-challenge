import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type DemoPhase =
  | 'prompt1'
  | 'composeFail'
  | 'confirm'
  | 'prompt2'
  | 'dnsFail'
  | 'done'

export const useDemoStore = defineStore('demo', () => {
  const phase = ref<DemoPhase>('prompt1')
  const denied = ref(false)

  const showComposeFail = computed(() => phase.value !== 'prompt1')
  const composeFailPending = computed(() => phase.value === 'composeFail')

  const showConfirm = computed(
    () =>
      phase.value === 'confirm' ||
      phase.value === 'prompt2' ||
      phase.value === 'dnsFail' ||
      phase.value === 'done',
  )
  const showInform = computed(
    () =>
      phase.value === 'prompt2' ||
      phase.value === 'dnsFail' ||
      phase.value === 'done',
  )
  const showPrompt2 = computed(
    () =>
      phase.value === 'prompt2' ||
      phase.value === 'dnsFail' ||
      phase.value === 'done',
  )
  const showDnsFail = computed(
    () => phase.value === 'dnsFail' || phase.value === 'done',
  )

  const prompt1Pending = computed(() => phase.value === 'prompt1')
  const prompt2Pending = computed(() => phase.value === 'prompt2')
  const confirmPending = computed(() => phase.value === 'confirm' && !denied.value)

  function sendPrompt1() {
    if (phase.value !== 'prompt1') return
    denied.value = false
    phase.value = 'composeFail'
  }

  function retryCompose() {
    if (phase.value !== 'composeFail') return
    phase.value = 'confirm'
  }

  function allow() {
    if (phase.value !== 'confirm') return
    denied.value = false
    phase.value = 'prompt2'
  }

  function deny() {
    if (phase.value !== 'confirm') return
    denied.value = true
  }

  function sendPrompt2() {
    if (phase.value !== 'prompt2') return
    phase.value = 'dnsFail'
  }

  function finish() {
    if (phase.value !== 'dnsFail') return
    phase.value = 'done'
  }

  function reset() {
    phase.value = 'prompt1'
    denied.value = false
  }

  return {
    phase,
    denied,
    showComposeFail,
    composeFailPending,
    showConfirm,
    showInform,
    showPrompt2,
    showDnsFail,
    prompt1Pending,
    prompt2Pending,
    confirmPending,
    sendPrompt1,
    retryCompose,
    allow,
    deny,
    sendPrompt2,
    finish,
    reset,
  }
})
