<script setup lang="ts">
defineProps<{
  chip: string
  title: string
  body: string
  points: string[]
  primaryLabel?: string
  secondaryLabel?: string
}>()

defineEmits<{
  primary: []
  secondary: []
}>()
</script>

<template>
  <div class="space-y-4">
    <span
      class="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-medium text-red-800"
    >
      <span class="size-1.5 rounded-full bg-red-500" aria-hidden="true" />
      {{ chip }}
    </span>

    <div>
      <h3 class="text-lg font-semibold tracking-tight text-balance">{{ title }}</h3>
      <p class="mt-2 text-[15px] leading-relaxed text-pretty text-stone-700">
        <slot name="body">{{ body }}</slot>
      </p>
    </div>

    <div class="rounded-2xl border border-red-100 bg-red-50 p-4">
      <p class="text-[11px] font-semibold tracking-[0.12em] text-red-700/70 uppercase">
        What this means
      </p>
      <ul class="mt-2.5 space-y-2 text-sm text-red-950/85">
        <li v-for="point in points" :key="point" class="flex gap-2">
          <span class="mt-1.5 size-1.5 shrink-0 rounded-full bg-red-400" aria-hidden="true" />
          <span>{{ point }}</span>
        </li>
      </ul>
    </div>

    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        class="rounded-full bg-[#e85d2c] px-5 py-2.5 text-sm font-semibold text-white"
        @click="$emit('primary')"
      >
        {{ primaryLabel ?? 'Try again' }}
      </button>
      <button
        v-if="secondaryLabel"
        type="button"
        class="rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-stone-600"
        @click="$emit('secondary')"
      >
        {{ secondaryLabel }}
      </button>
    </div>
  </div>
</template>
