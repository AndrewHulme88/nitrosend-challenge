<script setup lang="ts">
import { computed } from 'vue'
import type { ConsentMode } from '@/types/consent'
import type { Action } from '@/types/conversation'

const props = defineProps<{
  action: Action & { failure: NonNullable<Action['failure']> }
  mode: ConsentMode
}>()

defineEmits<{
  retry: []
}>()

const toolLabel = computed(() =>
  props.action.tool.replace(/^nitro_/, '').replaceAll('_', ' '),
)
</script>

<template>
  <!-- Current: the tool name and the word failed. No cause, no next step.
       Proposed: the cause, and a retry when the failure is retriable. -->
  <div
    v-if="mode === 'current'"
    class="animate-rise rounded-lg border border-caution/35 bg-caution-soft px-3.5 py-2.5"
    :aria-label="`${action.tool} failed`"
  >
    <span class="text-xs text-danger" aria-hidden="true">✕</span>
    <span>{{ action.tool }} failed</span>
  </div>

  <section
    v-else
    class="animate-rise rounded-xl border border-danger/25 bg-danger-soft px-4 py-3.5"
  >
    <header class="flex items-baseline justify-between gap-4">
      <h3 class="text-sm font-medium">Could not {{ toolLabel }}</h3>
      <code class="shrink-0 text-2xs text-muted">{{ action.tool }}</code>
    </header>

    <p class="mt-1.5 text-sm text-ink">{{ action.failure.message }}</p>

    <button
      v-if="action.failure.retriable"
      type="button"
      class="mt-3 text-sm font-medium text-accent transition-colors duration-150 hover:text-accent-hover"
      @click="$emit('retry')"
    >
      Try again
    </button>
    <p v-else class="mt-3 text-sm text-muted">
      This is not something retrying will fix.
    </p>
  </section>
</template>
