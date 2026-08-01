<script setup lang="ts">
import type { Message } from '@/types/conversation'

defineProps<{ message: Message }>()
</script>

<template>
  <p
    v-if="message.role === 'assistant'"
    class="animate-rise text-pretty text-base"
  >
    {{ message.text }}
  </p>

  <div v-else class="animate-rise flex justify-end">
    <p class="max-w-[85%] rounded-2xl bg-sunken px-4 py-2.5 text-base">
      {{ message.text }}
    </p>
  </div>
</template>
