<script setup lang="ts">
import type { ConsentMode } from '@/types/consent'

defineProps<{ mode: ConsentMode }>()

defineEmits<{
  'update:mode': [mode: ConsentMode]
}>()
</script>

<template>
  <div
    class="inline-flex rounded-lg border border-line bg-sunken p-0.5 text-2xs font-medium"
    role="group"
    aria-label="Consent model"
  >
    <button
      type="button"
      class="rounded-md px-2.5 py-1 transition-colors duration-150"
      :class="mode === 'current' ? 'bg-paper text-ink shadow-sm' : 'text-muted hover:text-ink'"
      :aria-pressed="mode === 'current'"
      @click="$emit('update:mode', 'current')"
    >
      Current
    </button>
    <button
      type="button"
      class="rounded-md px-2.5 py-1 transition-colors duration-150"
      :class="mode === 'proposed' ? 'bg-paper text-ink shadow-sm' : 'text-muted hover:text-ink'"
      :aria-pressed="mode === 'proposed'"
      @click="$emit('update:mode', 'proposed')"
    >
      Proposed
    </button>
  </div>
</template>
