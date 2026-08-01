<script setup lang="ts">
import { computed } from 'vue'
import { callSignature } from '@/lib/call'
import type { Action } from '@/types/conversation'

const props = defineProps<{ action: Action }>()

const signature = computed(() => callSignature(props.action.consequence))
</script>

<template>
  <!-- Reversible work is done first and reported after. Asking permission to
       write a draft would spend the operator's attention on something they can
       undo, and leave them with less of it for the send that they cannot. -->
  <section class="animate-rise rounded-xl border border-line bg-paper px-4 py-3.5">
    <header class="flex items-baseline justify-between gap-4">
      <h3 class="text-sm font-medium">{{ action.summary }}</h3>
      <code class="shrink-0 text-2xs text-muted">{{ signature }}</code>
    </header>

    <p v-if="action.result" class="mt-1 text-sm text-muted">{{ action.result }}</p>

    <button
      v-if="action.undo"
      type="button"
      class="mt-2.5 text-sm font-medium text-accent transition-colors duration-150 hover:text-accent-hover"
    >
      {{ action.undo }}
    </button>
  </section>
</template>
