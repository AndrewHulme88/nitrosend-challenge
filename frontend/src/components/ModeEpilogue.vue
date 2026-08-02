<script setup lang="ts">
import { nextTick, onMounted, useTemplateRef } from 'vue'
import type { ConsentMode } from '@/types/consent'

defineProps<{
  mode: ConsentMode
  previewLinkOpened: boolean
}>()

defineEmits<{
  'switch-mode': [mode: ConsentMode]
}>()

const root = useTemplateRef<HTMLElement>('root')

onMounted(async () => {
  await nextTick()
  // Snap, don't glide — the takeaway should be on screen the moment the
  // decision lands, not after the operator has already looked away.
  root.value?.scrollIntoView({ behavior: 'auto', block: 'start' })
})
</script>

<template>
  <!-- Same dashed framing as the opener, outside the transcript. -->
  <aside
    ref="root"
    :key="mode"
    class="animate-rise scroll-mt-20 rounded-lg border border-dashed border-line-strong bg-sunken/70 px-4 py-3.5"
    aria-label="About this demo"
  >
    <p class="text-2xs font-medium uppercase tracking-wider text-muted">
      About this demo
    </p>
    <p class="mt-1.5 text-base font-medium tracking-tight">What you just saw</p>

    <template v-if="mode === 'current'">
      <p class="mt-1.5 text-sm text-muted">
        Failures named the tool and stopped. Approvals asked Allow or Deny
        with no in-thread preview of the audience or the blast
        <template v-if="previewLinkOpened">
          — and the Preview link would have taken you out of the chat to
          another window, which is what you just simulated
        </template>
        <template v-else>
          — seeing the campaign means leaving the chat for another window
        </template>.
        The Proposed version keeps the cause, the stakes, and the preview in
        the same thread — and makes it obvious when something is still only a
        draft versus actually sent.
      </p>
      <button
        type="button"
        class="mt-3.5 text-sm font-medium text-accent transition-colors duration-150 hover:text-accent-hover"
        @click="$emit('switch-mode', 'proposed')"
      >
        Compare with Proposed
      </button>
    </template>

    <template v-else>
      <p class="mt-1.5 text-sm text-muted">
        Failures explain themselves and offer a next step. Drafts say they are
        saved and that nothing has been sent, so composing never looks like a
        live blast, and when something does go out, that is stated plainly.
        The preview, audience, and blockers stay in the chat beside the
        decision, instead of a second window and a bare Allow/Deny. Same tools
        as Current version, but clearer stakes, and language a user can actually 
        understand.
      </p>
      <button
        type="button"
        class="mt-3.5 text-sm font-medium text-accent transition-colors duration-150 hover:text-accent-hover"
        @click="$emit('switch-mode', 'current')"
      >
        Compare with Current
      </button>
    </template>
  </aside>
</template>
