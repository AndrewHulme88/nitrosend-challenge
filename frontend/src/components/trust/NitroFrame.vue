<script setup lang="ts">
/**
 * Soft pastel shell that echoes Nitrosend's conversation UI,
 * so proposed states read as product UI rather than generic cards.
 */
</script>

<template>
  <div
    class="trust-settle flex h-full min-h-0 flex-col overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-[#fff4ec] via-[#f7f3ff] to-[#eef6ff] p-3 sm:p-4"
  >
    <div
      class="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.1rem] bg-white/95 shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur"
    >
      <div class="flex shrink-0 items-center gap-2 border-b border-black/4 px-5 py-3.5">
        <span
          class="flex size-6 items-center justify-center rounded-md bg-[#c45c26] text-[11px] font-bold text-white"
          aria-hidden="true"
        >
          N
        </span>
        <span class="text-[11px] font-semibold tracking-[0.14em] text-stone-500 uppercase">
          Nitrosend
        </span>
      </div>
      <div class="flex flex-1 flex-col px-5 py-5">
        <slot />
      </div>
    </div>
  </div>
</template>
