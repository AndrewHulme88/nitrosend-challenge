<script setup lang="ts">
import { computed } from 'vue'
import type { Action } from '@/types/conversation'

const props = defineProps<{ action: Action }>()

defineEmits<{
  allow: []
  deny: []
}>()

// Mirrors the live product: "Allow manage audience" from nitro_manage_audience.
// No preview, no reach, no operation — the tool name is the entire prompt.
const prompt = computed(() =>
  props.action.tool.replace(/^nitro_/, '').replaceAll('_', ' '),
)
</script>

<template>
  <!-- Faithful to what Nitrosend shows currently: a single cream bar, the tool 
       name, and Allow / Deny. Drafting a campaign and sending it to 12,000 
       people produce the same chrome. -->
  <section
    class="animate-settle flex items-center gap-3 rounded-lg border border-caution/35 bg-caution-soft px-3.5 py-2.5"
    :aria-label="`Allow ${prompt}`"
  >
    <p class="min-w-0 flex-1 font-mono text-sm text-ink">
      Allow {{ prompt }}
    </p>

    <div class="flex shrink-0 items-center gap-3">
      <button
        type="button"
        class="text-sm font-medium text-[oklch(55%_0.16_45)] transition-opacity duration-150 hover:opacity-80"
        @click="$emit('allow')"
      >
        Allow
      </button>
      <button
        type="button"
        class="text-sm font-medium text-danger transition-opacity duration-150 hover:opacity-80"
        @click="$emit('deny')"
      >
        Deny
      </button>
    </div>
  </section>
</template>
