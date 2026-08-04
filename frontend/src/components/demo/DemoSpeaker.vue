<script setup lang="ts">
defineProps<{
  role: 'user' | 'assistant'
}>()
</script>

<template>
  <p
    v-if="role === 'user'"
    class="text-[11px] font-semibold tracking-[0.12em] text-stone-400 uppercase"
  >
    You
  </p>
  <p
    v-else
    class="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.12em] text-[#e85d2c] uppercase"
  >
    <span
      class="flex size-4 items-center justify-center rounded-[4px] bg-[#e85d2c] text-[8px] font-bold text-white"
      aria-hidden="true"
      >N</span
    >
    Nitrosend
  </p>
</template>
