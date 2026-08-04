<script setup lang="ts">
defineProps<{
  tone?: 'note' | 'problem'
}>()
</script>

<template>
  <p
    class="mt-3 min-h-[4.75rem] text-sm leading-relaxed text-pretty"
    :class="tone === 'problem' ? 'text-[#a13d2a]' : 'text-stone-500'"
  >
    <slot />
  </p>
</template>
