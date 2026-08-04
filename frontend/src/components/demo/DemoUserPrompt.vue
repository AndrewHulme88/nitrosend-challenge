<script setup lang="ts">
defineProps<{
  pending?: boolean
}>()

defineEmits<{
  send: []
}>()
</script>

<template>
  <div class="space-y-2">
    <slot name="label" />
    <div class="flex flex-col items-start gap-2.5">
      <div
        class="inline-block max-w-[95%] rounded-[1.35rem] px-4 py-3 text-[15px] leading-relaxed text-stone-800"
        :class="
          pending
            ? 'border border-stone-300/80 bg-white'
            : 'bg-white/85 ring-1 ring-black/5'
        "
      >
        <slot />
      </div>
      <button
        v-if="pending"
        type="button"
        class="rounded-full bg-[#e85d2c] px-4 py-2 text-sm font-semibold text-white"
        @click="$emit('send')"
      >
        Send
      </button>
    </div>
  </div>
</template>
