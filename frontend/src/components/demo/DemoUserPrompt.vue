<script setup lang="ts">
defineProps<{
  pending?: boolean
}>()

defineEmits<{
  send: []
}>()
</script>

<template>
  <div class="space-y-1.5">
    <slot name="label" />
    <div class="flex flex-col items-start gap-2">
      <div
        class="inline-block max-w-[95%] rounded-2xl px-3 py-2 text-[15px] leading-relaxed text-stone-800"
        :class="
          pending
            ? 'bg-white'
            : 'bg-white/85'
        "
      >
        <slot />
      </div>
      <button
        v-if="pending"
        type="button"
        class="rounded-full bg-[#e85d2c] px-3.5 py-1.5 text-sm font-semibold text-white"
        @click="$emit('send')"
      >
        Send
      </button>
    </div>
  </div>
</template>
