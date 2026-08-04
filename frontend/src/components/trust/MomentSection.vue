<script setup lang="ts">
defineProps<{
  number: string
  title: string
  question: string
  problem: string
}>()
</script>

<template>
  <section class="border-t border-black/8">
    <div class="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <div class="max-w-2xl">
        <p class="text-[11px] font-semibold tracking-[0.14em] text-stone-400 uppercase">
          Moment {{ number }}
        </p>
        <h2 class="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {{ title }}
        </h2>
        <p class="mt-2 text-base font-medium text-[#c45c26]">{{ question }}</p>
        <p class="mt-3 text-sm leading-relaxed text-pretty text-stone-600 sm:text-base">
          {{ problem }}
        </p>
      </div>

      <div class="mt-8 grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
        <div class="flex min-h-0 min-w-0 flex-col [&_.trust-media]:min-h-0 [&_.trust-media]:min-w-0 [&_.trust-media]:flex-1 [&_.trust-media]:w-full">
          <slot name="current" />
        </div>
        <div class="flex min-h-0 min-w-0 flex-col [&_.trust-media]:min-h-0 [&_.trust-media]:min-w-0 [&_.trust-media]:flex-1 [&_.trust-media]:w-full">
          <slot name="proposed" />
        </div>
      </div>
    </div>
  </section>
</template>
