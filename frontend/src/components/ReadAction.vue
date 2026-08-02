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
  <div class="animate-rise flex flex-col gap-1 text-sm text-muted sm:flex-row sm:items-baseline sm:gap-2.5">
    <span class="min-w-0">
      <span class="me-2 text-xs text-positive" aria-hidden="true">✓</span>
      {{ action.summary }}
      <template v-if="action.result">— {{ action.result }}</template>
    </span>
    <code class="shrink-0 text-2xs sm:ms-auto">{{ signature }}</code>
  </div>
</template>
