<script setup lang="ts">
import type { ConsentMode } from '@/types/consent'

defineProps<{ mode: ConsentMode }>()
</script>

<template>
  <!-- Framed as a note about the demo, not a turn in the conversation. -->
  <aside
    :key="mode"
    class="animate-rise rounded-lg border border-dashed border-line-strong bg-sunken/70 px-4 py-3.5"
    aria-label="About this demo"
  >
    <p class="text-2xs font-medium uppercase tracking-wider text-muted">
      About this demo
    </p>

    <template v-if="mode === 'current'">
      <h1 class="mt-1.5 text-base font-medium tracking-tight">Current Version</h1>
      <p class="mt-1.5 text-sm text-pretty text-muted">
        Currently every tool with
        <code class="text-2xs text-ink">destructiveHint</code>
        gets the same Allow/Deny bar, and when something breaks, you get a
        tool name and the word “failed.” No cause, no next step, no explanation, 
        and to see the preview you need to follow a preview link out of the chat. Walk
        through the conversation below, then flip to the Proposed version.
      </p>
    </template>
    <template v-else>
      <h1 class="mt-1.5 text-base font-medium tracking-tight">Proposed Version</h1>
      <p class="mt-1.5 text-sm text-pretty text-muted">
        Consent is graded by consequence, and each step explains itself: why
        a call failed, what a draft did, who a send would reach, and what is
        blocking it. The campaign preview stays in the chat, no second window
        so the decision and the thing being decided share one place. This is the same
        conversation and tools as the Current version conversation, but different weight, and plain
        language where a boolean used to stand in. Walk through the conversation below.
      </p>
    </template>
  </aside>
</template>
