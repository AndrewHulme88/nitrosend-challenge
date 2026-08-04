<script setup lang="ts">
import StatusChip from '@/components/demo/StatusChip.vue'

defineEmits<{
  allow: []
  deny: []
}>()
</script>

<template>
  <div>
    <StatusChip tone="idle">Waiting for your decision</StatusChip>

    <h3 class="mt-3 text-lg font-semibold tracking-tight text-balance">
      Create and prepare
      <span class="text-[#e85d2c]">Welcome to MoonFall Software</span>
    </h3>
    <p class="mt-1.5 text-sm leading-relaxed text-stone-500">
      Drafts a campaign for
      <span class="rounded bg-stone-100 px-1.5 py-0.5 font-medium text-stone-800">Andrew</span>
      · nothing is sent until you allow a later live send
    </p>

      <div class="mt-4 rounded-xl bg-[#fdfaf7] p-3.5">
      <p class="text-[11px] font-semibold tracking-[0.12em] text-stone-400 uppercase">
        What you are allowing
      </p>
      <ul class="mt-2 space-y-1.5 text-sm text-stone-600">
        <li>Compose the welcome email draft</li>
        <li>Look up Andrew in contacts</li>
        <li>Queue a test copy to your inbox when ready</li>
      </ul>
      <div class="mt-2.5 flex items-center gap-2 text-xs text-stone-400">
        <span class="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
        Nothing has been sent yet
      </div>
    </div>

    <div class="mt-4 flex flex-wrap gap-2">
      <button
        type="button"
        class="rounded-full bg-[#e85d2c] px-5 py-2.5 text-sm font-semibold text-white"
        @click="$emit('allow')"
      >
        Allow
      </button>
      <button
        type="button"
        class="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-stone-600"
        @click="$emit('deny')"
      >
        Deny
      </button>
    </div>
  </div>
</template>
