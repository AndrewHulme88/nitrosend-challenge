<script setup lang="ts">
import { computed } from 'vue'
import type { Consequence, ReadinessCheck } from '@/types/consent'

const props = defineProps<{
  consequence: Consequence
  subject: string
  audience: string
  recipients: number
  checks: ReadinessCheck[]
  testSentTo: string | null
}>()

defineEmits<{
  send: []
  test: []
  dismiss: []
}>()

const formattedRecipients = computed(() =>
  new Intl.NumberFormat(undefined).format(props.recipients),
)

const call = computed(() =>
  props.consequence.operation
    ? `${props.consequence.tool}(${props.consequence.operation})`
    : props.consequence.tool,
)

const blocking = computed(() => props.checks.filter((check) => !check.ok))
</script>

<template>
  <section
    class="animate-settle overflow-hidden rounded-xl border border-line-strong bg-paper shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.12)]"
    aria-labelledby="send-panel-heading"
  >
    <!-- The exact call is always visible. The argument of this prototype is
         that people should be able to see what the agent is about to do, so
         hiding it behind friendly phrasing would undercut the point. -->
    <header class="flex items-baseline justify-between gap-4 border-b border-line px-5 py-3">
      <h2 id="send-panel-heading" class="text-2xs font-medium uppercase text-muted">
        Waiting for you
      </h2>
      <code class="text-2xs text-muted">{{ call }}</code>
    </header>

    <!-- Preview first. The thing being sent is the subject of the decision, so
         it comes before the controls rather than behind a "preview" link. -->
    <div class="border-b border-line bg-sunken px-5 py-5">
      <p class="text-2xs font-medium uppercase text-muted">Subject</p>
      <p class="mt-1.5 text-lg font-medium tracking-tight">{{ subject }}</p>
      <div class="mt-4 rounded-lg border border-line bg-paper p-4">
        <slot name="preview">
          <p class="text-sm text-muted">No preview available.</p>
        </slot>
      </div>
    </div>

    <div v-if="checks.length" class="border-b border-line px-5 py-4">
      <ul class="space-y-2">
        <li
          v-for="check in checks"
          :key="check.label"
          class="flex items-baseline gap-2.5 text-sm"
        >
          <span
            class="translate-y-px text-xs"
            :class="check.ok ? 'text-positive' : 'text-danger'"
            aria-hidden="true"
          >{{ check.ok ? '✓' : '✕' }}</span>
          <span :class="check.ok ? 'text-muted' : 'text-ink'">
            {{ check.label }}
            <span v-if="check.detail" class="text-muted">— {{ check.detail }}</span>
          </span>
        </li>
      </ul>
    </div>

    <!-- The fail-closed case, surfaced rather than swallowed. If the manifest
         does not say what an operation does, saying so is more honest than
         quietly treating it as routine. -->
    <p
      v-if="!consequence.declared"
      class="border-b border-line bg-caution-soft px-5 py-3 text-sm text-ink"
    >
      This action has not declared what it does, so it is being treated as
      irreversible.
    </p>

    <footer class="px-5 py-5">
      <p class="text-base">
        This sends to
        <strong class="font-semibold">{{ formattedRecipients }} people</strong>
        in {{ audience }}, and cannot be recalled.
      </p>

      <div class="mt-4 flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          class="rounded-lg border border-line-strong bg-paper px-3.5 py-2 text-sm font-medium transition-colors duration-150 hover:bg-surface"
          @click="$emit('test')"
        >
          Send a test first
        </button>
        <button
          type="button"
          class="rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-paper transition-colors duration-150 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
          :disabled="blocking.length > 0"
          @click="$emit('send')"
        >
          Send to {{ formattedRecipients }} people
        </button>
        <button
          type="button"
          class="ml-auto text-sm text-muted transition-colors duration-150 hover:text-ink"
          @click="$emit('dismiss')"
        >
          Not now
        </button>
      </div>

      <!-- Naming the omission is more useful than blocking on it. The operator
           keeps the decision; they just cannot make it unknowingly. -->
      <p class="mt-3 text-sm text-muted">
        <template v-if="blocking.length">
          {{ blocking[0].label }} before this can be sent.
        </template>
        <template v-else-if="testSentTo">
          You sent a test of this to {{ testSentTo }}.
        </template>
        <template v-else>
          You have not sent a test of this yet.
        </template>
      </p>
    </footer>
  </section>
</template>
