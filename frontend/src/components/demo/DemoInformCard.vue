<script setup lang="ts">
import StatusChip from '@/components/trust/StatusChip.vue'
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-wrap gap-2">
      <StatusChip tone="draft">Draft saved</StatusChip>
      <StatusChip tone="ok">Test delivered</StatusChip>
      <StatusChip tone="warn">Live send held</StatusChip>
    </div>

    <p class="text-[15px] leading-relaxed text-pretty text-stone-800">
      I prepared
      <strong class="font-semibold">Welcome to MoonFall Software</strong>
      for Andrew. A test copy went to your inbox. The live campaign is still in the
      sandbox review queue. It has
      <strong class="font-semibold">not</strong>
      gone to your audience yet.
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
        class="flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50 px-3.5 py-3"
      >
        <span
          class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white"
          aria-hidden="true"
          >!</span
        >
        <div class="min-w-0">
          <p class="text-sm font-semibold text-amber-950">Live send held in sandbox</p>
          <p class="mt-0.5 text-sm text-amber-900/75">
            Audience has not been contacted. Verify
            <span class="rounded bg-white px-1 font-mono text-[12px]"
              >send.moonfallsoftware.com</span
            >
            to unlock immediate delivery.
          </p>
        </div>
      </li>
    </ol>

    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        class="rounded-full bg-[#e85d2c] px-5 py-2.5 text-sm font-semibold text-white"
      >
        Open campaign
      </button>
      <button
        type="button"
        class="rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-stone-600"
      >
        Preview email
      </button>
    </div>
  </div>
</template>
