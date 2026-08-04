<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  label: string
  explanation: string
  tone?: 'idle' | 'ok' | 'warn' | 'fail' | 'waiting'
}>()

const open = ref(false)

function toggle() {
  open.value = !open.value
}
</script>

<template>
  <div class="max-w-full">
    <button
      type="button"
      class="inline-flex max-w-full items-center gap-1.5 rounded-full border px-2 py-0.5 text-left text-[10px] font-medium transition-colors"
      :class="{
        'border-stone-300 bg-stone-100 text-stone-600 hover:bg-stone-200/80':
          (tone ?? 'idle') === 'idle',
        'border-[#e85d2c]/50 bg-stone-100 text-stone-600 hover:bg-stone-200/80':
          tone === 'waiting',
        'border-emerald-700/40 bg-emerald-50 text-emerald-800 hover:bg-emerald-100':
          tone === 'ok',
        'border-amber-700/40 bg-amber-50 text-amber-900 hover:bg-amber-100':
          tone === 'warn',
        'border-red-700/45 bg-red-50 text-red-800 hover:bg-red-100': tone === 'fail',
        'ring-2 ring-[#e85d2c]/20': open,
      }"
      :aria-expanded="open"
      @click="toggle"
    >
      <span
        class="size-1.5 shrink-0 rounded-full"
        :class="{
          'bg-stone-400': (tone ?? 'idle') === 'idle',
          'bg-[#e85d2c]': tone === 'waiting',
          'bg-emerald-600': tone === 'ok',
          'bg-amber-600': tone === 'warn',
          'bg-red-600': tone === 'fail',
        }"
        aria-hidden="true"
      />
      <span class="truncate">{{ label }}</span>
      <span class="text-[9px] opacity-50" aria-hidden="true">{{ open ? '▴' : '▾' }}</span>
    </button>

    <div
      v-if="open"
      class="animate-rise mt-1.5 max-w-sm rounded-xl bg-stone-50/70 px-3 py-2 text-sm leading-relaxed text-stone-600"
    >
      <p class="text-[11px] font-semibold tracking-[0.1em] text-stone-400 uppercase">
        {{ props.label.replace(/ failed$/, '') }}
      </p>
      <p class="mt-1">{{ explanation }}</p>
    </div>
  </div>
</template>
