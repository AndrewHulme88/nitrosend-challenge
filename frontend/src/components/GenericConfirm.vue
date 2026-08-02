<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Action } from '@/types/conversation'

const props = defineProps<{ action: Action }>()

const emit = defineEmits<{
  allow: []
  deny: []
  preview: []
}>()

// Mirrors the live product: "Allow manage audience" from nitro_manage_audience.
// No preview, no reach, no operation — the tool name is the entire prompt.
const prompt = computed(() =>
  props.action.tool.replace(/^nitro_/, '').replaceAll('_', ' '),
)

const hasPreviewLink = computed(() => Boolean(props.action.send))

// The live product sends operators out of the chat for a preview. This demo
// stays put and names that departure, so the proposed in-thread preview has
// something concrete to improve on.
const previewOpened = ref(false)

function openPreview() {
  if (previewOpened.value) return
  previewOpened.value = true
  emit('preview')
}
</script>

<template>
  <div class="space-y-2">
    <!-- Faithful to what Nitrosend shows currently: a single cream bar, the tool
         name, and Allow / Deny. Drafting a campaign and sending it to 12,000
         people produce the same chrome. -->
    <section
      class="animate-settle flex items-center gap-3 rounded-lg border border-caution/35 bg-caution-soft px-3.5 py-2.5"
      :aria-label="`Allow ${prompt}`"
    >
      <p class="min-w-0 flex-1 font-mono text-sm text-ink">
        Allow {{ prompt }}
      </p>

      <div class="flex shrink-0 items-center gap-3">
        <button
          type="button"
          class="text-sm font-medium text-[oklch(55%_0.16_45)] transition-opacity duration-150 hover:opacity-80"
          @click="emit('allow')"
        >
          Allow
        </button>
        <button
          type="button"
          class="text-sm font-medium text-danger transition-opacity duration-150 hover:opacity-80"
          @click="emit('deny')"
        >
          Deny
        </button>
      </div>
    </section>

    <p v-if="hasPreviewLink" class="animate-rise pl-0.5 text-sm">
      <button
        type="button"
        class="font-medium text-accent underline-offset-2 transition-colors duration-150 hover:text-accent-hover hover:underline"
        @click="openPreview"
      >
        Preview campaign
      </button>
    </p>

    <p
      v-if="previewOpened"
      class="animate-rise rounded-lg border border-dashed border-line-strong bg-sunken/70 px-3.5 py-2.5 text-sm text-muted"
    >
      <span class="text-2xs font-medium uppercase tracking-wider text-muted">
        About this demo
      </span>
      <span class="mt-1 block">
        In the current product this link would take you out of the chat. Another
        window, another context to see what is about to send. The proposed
        version keeps that preview in the thread instead.
      </span>
    </p>
  </div>
</template>
