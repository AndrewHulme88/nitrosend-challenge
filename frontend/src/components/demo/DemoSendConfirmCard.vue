<script setup lang="ts">
import StatusChip from '@/components/trust/StatusChip.vue'

defineProps<{
  pending?: boolean
}>()

defineEmits<{
  allow: []
  deny: []
}>()
</script>

<template>
  <div class="space-y-4">
    <div>
      <p class="text-[11px] font-semibold tracking-[0.12em] text-stone-400 uppercase">
        Campaign preview
      </p>
      <p class="mt-2 text-base font-semibold tracking-tight">Welcome to MoonFall Software</p>
      <p class="mt-1 text-sm text-stone-500">
        To
        <span class="rounded bg-stone-100 px-1.5 py-0.5 font-medium text-stone-800">Andrew</span>
        · 1 recipient
      </p>
      <div class="mt-4 rounded-xl bg-[#fdfaf7] p-3.5">
        <p class="text-sm leading-relaxed text-stone-600">
          Thanks for signing up. Here’s what to expect next, and how to get started
          with your account. If you have any questions, just reply to this email.
        </p>
      </div>
    </div>

    <div v-if="pending">
      <StatusChip tone="idle">Waiting for your decision</StatusChip>

      <h3 class="mt-3 text-lg font-semibold tracking-tight text-balance">
        Send
        <span class="text-[#e85d2c]">Welcome to MoonFall Software</span>
        live
      </h3>
      <p class="mt-1.5 text-sm leading-relaxed text-stone-500">
        To
        <span class="rounded bg-stone-100 px-1.5 py-0.5 font-medium text-stone-800">Andrew</span>
        · 1 recipient · cannot be recalled once delivered
      </p>

      <div class="mt-4 flex items-center gap-2 text-xs text-stone-400">
        <span class="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
        Nothing has been sent to the audience yet
      </div>

      <div class="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          class="rounded-full bg-[#e85d2c] px-5 py-2.5 text-sm font-semibold text-white"
          @click="$emit('allow')"
        >
          Allow send
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
  </div>
</template>
