<script setup lang="ts">
import { computed } from 'vue'
import { callSignature } from '@/lib/call'
import type { Action } from '@/types/conversation'

const props = defineProps<{ action: Action }>()

defineEmits<{
  allow: []
  deny: []
}>()

const signature = computed(() => callSignature(props.action.consequence))
</script>

<template>
  <!-- What destructiveHint can produce: the same dialog for a draft and for a
       send to 12,000 people. No preview, no reach, no rehearsal — only the
       flag the metadata actually carries. -->
  <section
    class="animate-settle rounded-xl border border-line-strong bg-paper px-5 py-4"
    aria-labelledby="confirm-heading"
  >
    <header class="flex items-baseline justify-between gap-4">
      <h3 id="confirm-heading" class="text-2xs font-medium uppercase text-muted">
        Allow this tool?
      </h3>
      <code class="shrink-0 text-2xs text-muted">{{ signature }}</code>
    </header>

    <p class="mt-3 text-sm">
      <code class="text-sm">{{ action.tool }}</code>
      is marked <span class="font-medium">destructive</span>. Allow it to run?
    </p>

    <div class="mt-4 flex items-center gap-2.5">
      <button
        type="button"
        class="rounded-lg border border-line-strong bg-paper px-3.5 py-2 text-sm font-medium transition-colors duration-150 hover:bg-surface"
        @click="$emit('deny')"
      >
        Deny
      </button>
      <button
        type="button"
        class="rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-paper transition-colors duration-150 hover:bg-accent-hover"
        @click="$emit('allow')"
      >
        Allow
      </button>
    </div>
  </section>
</template>
