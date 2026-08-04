<script setup lang="ts">
defineProps<{
  tone: 'draft' | 'ok' | 'warn' | 'fail' | 'idle'
}>()
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium"
    :class="{
      'border-stone-300 bg-stone-100 text-stone-600': tone === 'idle' || tone === 'draft',
      'border-emerald-700/40 bg-emerald-50 text-emerald-800': tone === 'ok',
      'border-amber-700/40 bg-amber-50 text-amber-900': tone === 'warn',
      'border-red-700/45 bg-red-50 text-red-800': tone === 'fail',
    }"
  >
    <span
      class="size-1.5 rounded-full"
      :class="{
        'bg-stone-400': tone === 'idle' || tone === 'draft',
        'bg-emerald-600': tone === 'ok',
        'bg-amber-600': tone === 'warn',
        'bg-red-600': tone === 'fail',
      }"
      aria-hidden="true"
    />
    <slot />
  </span>
</template>
