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
    class="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.12em] text-stone-400 uppercase"
  >
    <span
      class="text-[#e85d2c] font-bold"
      aria-hidden="true"
      >N</span
    >
    Nitrosend
  </p>
</template>
