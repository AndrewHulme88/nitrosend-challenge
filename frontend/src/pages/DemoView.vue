<script setup lang="ts">
import DemoSidebar from '@/components/demo/DemoSidebar.vue'
</script>

<template>
  <div class="flex h-dvh overflow-hidden bg-white text-stone-900">
    <DemoSidebar class="hidden md:flex" />

    <section
      class="relative flex min-w-0 flex-1 flex-col"
      style="
        background:
          radial-gradient(ellipse 80% 60% at 15% 10%, #ffe8d6 0%, transparent 55%),
          radial-gradient(ellipse 70% 55% at 85% 25%, #dcecff 0%, transparent 50%),
          radial-gradient(ellipse 75% 60% at 30% 90%, #ebe4ff 0%, transparent 55%),
          radial-gradient(ellipse 60% 50% at 90% 85%, #e8f7f2 0%, transparent 50%),
          #f7f4f8;
      "
    >
      <header class="flex shrink-0 items-start justify-between gap-4 px-6 pt-6 pb-4 sm:px-10">
        <div class="flex min-w-0 items-start gap-3">
          <div
            class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#5b4db8] text-sm font-bold text-white"
            aria-hidden="true"
          >
            MF
          </div>
          <div class="min-w-0">
            <h1 class="text-lg font-semibold tracking-tight">MoonFall Software</h1>
            <p class="mt-0.5 text-sm text-stone-500">
              MoonFall Software specializes in creating...
              <button type="button" class="ms-1 font-medium text-[#e85d2c]">
                Edit brand
              </button>
            </p>
          </div>
        </div>
        <RouterLink
          to="/"
          class="shrink-0 text-[18px] text-[#c45c26] underline-offset-2 hover:underline"
        >
          Back to Trust proposal
        </RouterLink>
      </header>

      <div class="min-h-0 flex-1 overflow-y-auto px-6 sm:px-10">
        <div class="mx-auto flex h-full max-w-2xl flex-col justify-center py-10">
          <p class="text-center text-sm text-stone-400">
            Simulated chat will play out here.
          </p>
        </div>
      </div>

      <div class="shrink-0 px-6 pt-2 pb-5 sm:px-10 sm:pb-6">
        <div class="mx-auto max-w-2xl">
          <div
            class="relative rounded-[1.35rem] bg-white px-4 pt-3.5 pb-3 shadow-[0_1px_0_rgba(0,0,0,0.04)] ring-1 ring-black/6"
          >
            <p class="min-h-12 pr-14 text-[15px] leading-relaxed text-stone-300">
              Try: “Create a welcome email series for new subscribers”
            </p>
            <button
              type="button"
              class="absolute end-3 bottom-3 flex size-9 items-center justify-center rounded-full bg-[#cc3d00] text-white"
              aria-label="Send"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" class="size-4" aria-hidden="true">
                <path
                  fill-rule="evenodd"
                  d="M10 17a.75.75 0 0 1-.75-.75V5.56L6.03 8.78a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 1 1-1.06 1.06L10.75 5.56v10.69A.75.75 0 0 1 10 17Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
