<script setup lang="ts">
import { computed } from 'vue'
import { callSignature } from '@/lib/call'
import type { Action } from '@/types/conversation'

const props = defineProps<{ action: Action }>()

const signature = computed(() => callSignature(props.action.consequence))
</script>

<template>
  <!-- Reversible work is done first and reported after — a record, not a
       decision. Undo lives on the send panel with the other choices, so this
       line never looks like a prompt waiting for an answer. -->
  <div class="animate-rise flex items-baseline gap-2.5 text-sm text-muted">
    <span class="text-xs text-positive" aria-hidden="true">✓</span>
    <span>
      {{ action.summary }}
      <template v-if="action.result">— {{ action.result }}</template>
    </span>
    <code class="ml-auto shrink-0 text-2xs">{{ signature }}</code>
  </div>
</template>
