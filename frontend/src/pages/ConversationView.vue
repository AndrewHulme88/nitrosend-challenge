<script setup lang="ts">
import { ref } from 'vue'
import SendPanel from '@/components/SendPanel.vue'
import type { Consequence, ReadinessCheck } from '@/types/consent'

// Staging for the panel while the conversation around it is built. These
// values match what ConsentPolicy resolves for nitro_control_delivery(live).
const consequence: Consequence = {
  tool: 'nitro_control_delivery',
  operation: 'live',
  reversibility: 'irreversible',
  reach: 'audience',
  consentLevel: 'verify',
  previewWith: 'nitro_review_delivery',
  rehearseWith: 'nitro_send_test_message',
  declared: true,
}

const checks: ReadinessCheck[] = [
  { label: 'Sender verified', detail: 'hello@lumenkit.com', ok: true },
  { label: 'Unsubscribe link present', ok: true },
  { label: 'Spam score 1.2', detail: 'below the 5.0 threshold', ok: true },
]

const testSentTo = ref<string | null>(null)
</script>

<template>
  <main class="min-h-dvh bg-surface px-5 py-12 sm:py-20">
    <div class="mx-auto max-w-xl">
      <SendPanel
        :consequence="consequence"
        subject="Last call — winter kit, 30% off"
        audience="Newsletter subscribers"
        :recipients="12431"
        :checks="checks"
        :test-sent-to="testSentTo"
        @test="testSentTo = 'andrew@lumenkit.com'"
      >
        <template #preview>
          <p class="text-lg font-semibold tracking-tight">Winter kit, 30% off</p>
          <p class="mt-2 text-sm text-muted">
            Three days left on the merino base layers and the insulated flask.
            After Sunday they go back to full price.
          </p>
          <p
            class="mt-4 inline-block rounded-md bg-ink px-3 py-1.5 text-xs font-medium text-paper"
          >
            Shop the sale
          </p>
        </template>
      </SendPanel>
    </div>
  </main>
</template>
