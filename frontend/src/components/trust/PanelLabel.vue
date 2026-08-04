<script setup lang="ts">
defineProps<{
  tone?: 'current' | 'proposed'
}>()
</script>

<template>
  <p
    class="mb-3 text-[11px] font-semibold tracking-[0.14em] uppercase"
    :class="(tone ?? 'current') === 'proposed' ? 'text-[#c45c26]' : 'text-stone-400'"
  >
    {{ (tone ?? 'current') === 'proposed' ? 'Proposed' : 'Current' }}
  </p>
</template>
