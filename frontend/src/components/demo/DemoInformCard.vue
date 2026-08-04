<script setup lang="ts">
import StatusChip from '@/components/trust/StatusChip.vue'

defineProps<{
  /** prepared = draft + test only; sent = live delivery succeeded */
  outcome: 'prepared' | 'sent'
  showView?: boolean
}>()

defineEmits<{
  view: []
}>()
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-wrap gap-2">
      <StatusChip tone="draft">Draft saved</StatusChip>
      <StatusChip tone="ok">Test delivered</StatusChip>
      <StatusChip v-if="outcome === 'sent'" tone="ok">Live send delivered</StatusChip>
      <StatusChip v-else tone="warn">Live send not sent</StatusChip>
    </div>

    <p
      v-if="outcome === 'prepared'"
      class="text-[15px] leading-relaxed text-pretty text-stone-800"
    >
      I prepared
      <strong class="font-semibold">Welcome to MoonFall Software</strong>
      for Andrew. A test copy went to your inbox. The live send has
      <strong class="font-semibold">not</strong>
      gone out yet — review the campaign, then allow send when you are ready.
    </p>
    <p v-else class="text-[15px] leading-relaxed text-pretty text-stone-800">
      You allowed the live send.
      <strong class="font-semibold">Welcome to MoonFall Software</strong>
      was delivered to Andrew.
    </p>

    <ol class="space-y-2.5">
      <li
        class="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-3.5 py-3"
      >
        <span
          class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white"
          aria-hidden="true"
          >✓</span
        >
        <div class="min-w-0">
          <p class="text-sm font-semibold text-emerald-950">Test delivered</p>
          <p class="mt-0.5 text-sm text-emerald-900/75">andrew_hulme04@hotmail.com</p>
        </div>
      </li>
      <li
        v-if="outcome === 'sent'"
        class="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-3.5 py-3"
      >
        <span
          class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white"
          aria-hidden="true"
          >✓</span
        >
        <div class="min-w-0">
          <p class="text-sm font-semibold text-emerald-950">Live send delivered</p>
          <p class="mt-0.5 text-sm text-emerald-900/75">Delivered to Andrew</p>
        </div>
      </li>
      <li
        v-else
        class="flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50 px-3.5 py-3"
      >
        <span
          class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white"
          aria-hidden="true"
          >!</span
        >
        <div class="min-w-0">
          <p class="text-sm font-semibold text-amber-950">Live send waiting</p>
          <p class="mt-0.5 text-sm text-amber-900/75">
            Audience has not been contacted. View the campaign, then allow send.
          </p>
        </div>
      </li>
    </ol>

    <div v-if="showView" class="flex flex-wrap gap-2">
      <button
        type="button"
        class="rounded-full bg-[#e85d2c] px-5 py-2.5 text-sm font-semibold text-white"
        @click="$emit('view')"
      >
        View campaign
      </button>
    </div>
    <div v-else-if="outcome === 'sent'" class="flex flex-wrap gap-2">
      <button
        type="button"
        class="rounded-full bg-[#e85d2c] px-5 py-2.5 text-sm font-semibold text-white"
      >
        Open campaign
      </button>
    </div>
  </div>
</template>
