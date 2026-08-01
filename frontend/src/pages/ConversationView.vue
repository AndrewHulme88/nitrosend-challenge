<script setup lang="ts">
import { onMounted, ref } from 'vue'

const status = ref('checking')

onMounted(async () => {
  try {
    const response = await fetch('/api/health')
    const body = await response.json()
    status.value = body.ok ? `connected · ${body.data.environment}` : 'error'
  } catch {
    status.value = 'unreachable'
  }
})
</script>

<template>
  <main class="min-h-dvh px-6 py-16">
    <p class="text-sm text-neutral-500">Conversation</p>
    <p class="mt-2 text-sm text-neutral-400">API {{ status }}</p>
  </main>
</template>
