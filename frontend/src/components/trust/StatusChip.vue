<script setup lang="ts">
defineProps<{
  tone: 'draft' | 'ok' | 'warn' | 'fail' | 'idle'
}>()
</script>

<template>
  <span
    class="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium"
    :class="{
      'bg-stone-100 text-stone-600': tone === 'idle' || tone === 'draft',
      'bg-emerald-50 text-emerald-800': tone === 'ok',
      'bg-amber-50 text-amber-900': tone === 'warn',
      'bg-red-50 text-red-800': tone === 'fail',
    }"
  >
    <span
      class="size-1.5 rounded-full"
      :class="{
        'bg-stone-400': tone === 'idle' || tone === 'draft',
        'bg-emerald-500': tone === 'ok',
        'bg-amber-500': tone === 'warn',
        'bg-red-500': tone === 'fail',
      }"
      aria-hidden="true"
    />
    <slot />
  </span>
</template>
