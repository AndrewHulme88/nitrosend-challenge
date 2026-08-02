<script setup lang="ts">
import type { Message } from '@/types/conversation'

defineProps<{
  message: Message
  pending?: boolean
}>()

defineEmits<{
  send: []
}>()
</script>

<template>
  <p
    v-if="message.role === 'assistant'"
    class="animate-rise text-pretty text-base"
  >
    {{ message.text }}
  </p>

  <div v-else class="animate-rise flex flex-col items-end gap-2">
    <p
      class="max-w-[85%] rounded-2xl px-4 py-2.5 text-base"
      :class="pending ? 'border border-line-strong bg-paper' : 'bg-sunken'"
    >
      {{ message.text }}
    </p>

    <button
      v-if="pending"
      type="button"
      class="rounded-lg bg-accent px-3.5 py-1.5 text-sm font-medium text-paper transition-colors duration-150 hover:bg-accent-hover"
      @click="$emit('send')"
    >
      Send
    </button>
  </div>
</template>
