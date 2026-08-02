<script setup lang="ts">
defineProps<{
  role: 'user' | 'assistant'
}>()
</script>

<template>
  <!-- Matches the live product: "You" for the operator, an orange N beside
       Nitrosend for the agent. Both labels sit on the left. -->
  <p
    v-if="role === 'user'"
    class="text-2xs font-medium uppercase tracking-wide text-muted"
  >
    You
  </p>

  <p
    v-else
    class="flex items-center gap-1 text-2xs font-medium uppercase tracking-wide text-muted"
  >
    <span class="font-bold text-[oklch(55%_0.16_45)]" aria-hidden="true">N</span>
    Nitrosend
  </p>
</template>
