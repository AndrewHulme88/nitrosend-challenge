<script setup lang="ts">
import { computed, ref } from 'vue'
import { callSignature } from '@/lib/call'
import type { Action, SendDetails } from '@/types/conversation'

const props = defineProps<{
  action: Action & { send: SendDetails }
  testSentTo: string | null
}>()

const emit = defineEmits<{
  send: []
  test: []
  dismiss: [reason: string]
  revise: []
  discard: []
}>()

const details = computed(() => props.action.send)

const signature = computed(() => callSignature(props.action.consequence))

const recipients = computed(() =>
  new Intl.NumberFormat(undefined).format(details.value.recipients),
)

const blocking = computed(() => details.value.checks.filter((check) => !check.ok))

// Choosing a reason is the difference between closing a dialog and leaving a
// decision in the transcript. Preset options keep it one click, not a form.
const choosingReason = ref(false)

const reasons = [
  'Subject needs another pass',
  'Wrong audience for this',
  'Just reviewing for now',
] as const
</script>

<template>
  <section
    class="animate-settle overflow-hidden rounded-xl border border-line-strong bg-paper shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.12)]"
    aria-labelledby="send-panel-heading"
  >
    <header class="flex items-baseline justify-between gap-4 border-b border-line px-5 py-3">
      <h3 id="send-panel-heading" class="text-2xs font-medium uppercase text-muted">
        Waiting for you
      </h3>
      <code class="shrink-0 text-2xs text-muted">{{ signature }}</code>
    </header>

    <!-- One email frame: headers first, then the message. No second title
         competing with the subject outside the card. -->
    <div class="border-b border-line bg-sunken px-5 py-5">
      <p class="text-2xs font-medium uppercase tracking-wider text-muted">
        Email preview
      </p>

      <article
        class="mt-3 overflow-hidden rounded-lg border border-line bg-paper"
        aria-label="Campaign email preview"
      >
        <dl class="space-y-2 border-b border-line px-4 py-3 text-sm">
          <div class="flex gap-3">
            <dt class="w-14 shrink-0 text-muted">To</dt>
            <dd class="min-w-0 text-ink">
              {{ details.audience }}
              <span class="text-muted">· {{ recipients }} people</span>
            </dd>
          </div>
          <div class="flex gap-3">
            <dt class="w-14 shrink-0 text-muted">Subject</dt>
            <dd class="min-w-0 font-medium text-ink">{{ details.subject }}</dd>
          </div>
        </dl>

        <div class="px-4 py-4">
          <p class="text-base font-semibold tracking-tight">
            {{ details.preview.heading }}
          </p>
          <p class="mt-2 text-sm leading-relaxed text-muted">
            {{ details.preview.body }}
          </p>
          <p
            class="mt-4 inline-block rounded-md bg-ink px-3 py-1.5 text-xs font-medium text-paper"
          >
            {{ details.preview.cta }}
          </p>
        </div>
      </article>
    </div>

    <div v-if="details.checks.length" class="border-b border-line px-5 py-4">
      <p class="text-2xs font-medium uppercase tracking-wider text-muted">
        Before sending
      </p>
      <ul class="mt-2.5 space-y-2">
        <li
          v-for="check in details.checks"
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

    <!-- A failed check is an explanation, not a greyed-out button. Colour is
         spent here because something is actually wrong. -->
    <div
      v-if="blocking.length"
      class="border-b border-line bg-danger-soft px-5 py-3.5"
    >
      <p class="text-sm">
        <template v-if="blocking[0].detail">
          {{ blocking[0].label }} — {{ blocking[0].detail }}.
        </template>
        <template v-else>{{ blocking[0].label }}.</template>
        This cannot be sent as it stands.
      </p>
      <button
        type="button"
        class="mt-2 text-sm font-medium text-accent transition-colors duration-150 hover:text-accent-hover"
        @click="emit('revise')"
      >
        Ask to revise the draft
      </button>
    </div>

    <!-- The fail-closed case, surfaced rather than swallowed. If the manifest
         does not say what an operation does, saying so is more honest than
         quietly treating it as routine. -->
    <p
      v-if="!action.consequence.declared"
      class="border-b border-line bg-caution-soft px-5 py-3 text-sm"
    >
      This action has not declared what it does, so it is being treated as
      irreversible.
    </p>

    <footer class="px-5 py-5">
      <p class="text-base">
        This sends to <strong class="font-semibold">{{ recipients }} people</strong>
        in {{ details.audience }}, and cannot be recalled.
      </p>

      <!-- Send controls wait until checks are clear. A disabled Send beside
           "revise first" undercuts the block; the decision comes after. -->
      <template v-if="!blocking.length">
        <div v-if="choosingReason" class="mt-4">
          <p class="text-sm text-muted">Why hold this back?</p>
          <div class="mt-2.5 flex flex-wrap gap-2">
            <button
              v-for="reason in reasons"
              :key="reason"
              type="button"
              class="rounded-lg border border-line-strong bg-paper px-3 py-1.5 text-sm transition-colors duration-150 hover:bg-surface"
              @click="emit('dismiss', reason)"
            >
              {{ reason }}
            </button>
          </div>
          <button
            type="button"
            class="mt-3 text-sm text-muted transition-colors duration-150 hover:text-ink"
            @click="choosingReason = false"
          >
            Keep reviewing
          </button>
        </div>

        <div v-else class="mt-4 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            class="rounded-lg border border-line-strong bg-paper px-3.5 py-2 text-sm font-medium transition-colors duration-150 hover:bg-surface"
            @click="emit('test')"
          >
            Send a test first
          </button>
          <button
            type="button"
            class="rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-paper transition-colors duration-150 hover:bg-accent-hover"
            @click="emit('send')"
          >
            Send to {{ recipients }} people
          </button>
          <button
            type="button"
            class="ml-auto text-sm text-muted transition-colors duration-150 hover:text-ink"
            @click="choosingReason = true"
          >
            Not now
          </button>
          <button
            type="button"
            class="text-sm text-muted transition-colors duration-150 hover:text-ink"
            @click="emit('discard')"
          >
            Discard the draft
          </button>
        </div>

        <p v-if="!choosingReason" class="mt-3 text-sm text-muted">
          <template v-if="testSentTo">
            You sent a test of this to {{ testSentTo }}.
          </template>
          <template v-else>
            You have not sent a test of this yet.
          </template>
        </p>
      </template>
    </footer>
  </section>
</template>
