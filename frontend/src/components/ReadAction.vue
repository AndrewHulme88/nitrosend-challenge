<script setup lang="ts">
import { computed } from 'vue'
import { callSignature } from '@/lib/call'
import type { Action } from '@/types/conversation'

const props = defineProps<{ action: Action }>()

const signature = computed(() => callSignature(props.action.consequence))
</script>

<template>
  <!-- A read changes nothing, so it asks for nothing. It stays on the page as
       a record rather than disappearing, because "what did it look at" is a
       fair question to ask afterwards. -->
  <div class="animate-rise flex items-baseline gap-2.5 text-sm text-muted">
    <span class="text-xs text-positive" aria-hidden="true">✓</span>
    <span>
      {{ action.summary }}
      <template v-if="action.result">— {{ action.result }}</template>
    </span>
    <code class="ml-auto shrink-0 text-2xs">{{ signature }}</code>
  </div>
</template>
