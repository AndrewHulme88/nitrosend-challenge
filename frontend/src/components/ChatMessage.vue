<script setup lang="ts">
import SpeakerLabel from '@/components/SpeakerLabel.vue'
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
  <div v-if="message.role === 'assistant'" class="animate-rise space-y-1.5">
    <SpeakerLabel role="assistant" />
    <p class="text-pretty text-base">{{ message.text }}</p>
  </div>

  <div v-else class="animate-rise space-y-1.5">
    <SpeakerLabel role="user" />
    <div class="flex flex-col items-start gap-2">
      <p
        class="max-w-[min(85%,24rem)] rounded-2xl px-4 py-2.5 text-pretty text-base"
        :class="pending ? 'border border-line-strong bg-paper' : 'bg-sunken'"
      >
        {{ message.text }}
      </p>

      <button
        v-if="pending"
        type="button"
        class="min-h-10 rounded-lg bg-accent px-3.5 py-1.5 text-sm font-medium text-paper transition-colors duration-150 hover:bg-accent-hover"
        @click="$emit('send')"
      >
        Send
      </button>
    </div>
  </div>
</template>
