<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDemoStore } from '@/stores/demo'
import DemoSidebar from '@/components/demo/DemoSidebar.vue'
import DemoSpeaker from '@/components/demo/DemoSpeaker.vue'
import DemoUserPrompt from '@/components/demo/DemoUserPrompt.vue'
import DemoToolPill from '@/components/demo/DemoToolPill.vue'
import DemoConfirmCard from '@/components/demo/DemoConfirmCard.vue'
import DemoInformCard from '@/components/demo/DemoInformCard.vue'
import DemoFailureCard from '@/components/demo/DemoFailureCard.vue'

const demo = useDemoStore()
const {
  denied,
  showComposeFail,
  composeFailPending,
  showConfirm,
  showInform,
  showPrompt2,
  showDnsFail,
  prompt1Pending,
  prompt2Pending,
  confirmPending,
  phase,
} = storeToRefs(demo)
</script>

<template>
  <div class="flex h-dvh overflow-hidden bg-white text-stone-900">
    <DemoSidebar class="hidden md:flex" />

    <section
      class="relative flex min-w-0 flex-1 flex-col"
      style="
        background:
          radial-gradient(ellipse 80% 60% at 15% 10%, #ffe8d6 0%, transparent 55%),
          radial-gradient(ellipse 70% 55% at 85% 25%, #dcecff 0%, transparent 50%),
          radial-gradient(ellipse 75% 60% at 30% 90%, #ebe4ff 0%, transparent 55%),
          radial-gradient(ellipse 60% 50% at 90% 85%, #e8f7f2 0%, transparent 50%),
          #f7f4f8;
      "
    >
      <header class="flex shrink-0 items-start justify-between gap-4 px-6 pt-6 pb-4 sm:px-10">
        <div class="flex min-w-0 items-start gap-3">
          <div
            class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#5b4db8] text-sm font-bold text-white"
            aria-hidden="true"
          >
            MF
          </div>
          <div class="min-w-0">
            <h1 class="text-lg font-semibold tracking-tight">MoonFall Software</h1>
            <p class="mt-0.5 text-sm text-stone-500">
              MoonFall Software specializes in creating...
              <button type="button" class="ms-1 font-medium text-[#e85d2c]">
                Edit brand
              </button>
            </p>
          </div>
        </div>
        <RouterLink
          to="/"
          class="shrink-0 text-[18px] text-[#c45c26] underline-offset-2 hover:underline"
        >
          Back to Trust proposal
        </RouterLink>
      </header>

      <div class="min-h-0 flex-1 overflow-y-auto px-6 sm:px-10">
        <div class="mx-auto max-w-2xl space-y-8 py-4 pb-10" aria-label="Proposed trust walkthrough">
          <div class="flex items-center justify-between gap-3">
            <p class="text-[11px] font-semibold tracking-[0.14em] text-stone-400 uppercase">
              Conversation
            </p>
            <button
              type="button"
              class="text-sm text-stone-400 underline-offset-2 hover:text-stone-600 hover:underline"
              @click="demo.reset()"
            >
              Start over
            </button>
          </div>

          <!-- Prompt 1 -->
          <DemoUserPrompt :pending="prompt1Pending" @send="demo.sendPrompt1()">
            <template #label>
              <DemoSpeaker role="user" />
            </template>
            Draft a welcome email for Andrew, send me a test, then send it live when it
            looks right.
          </DemoUserPrompt>

          <!-- First failure: Compose Campaign (mirrors the real product moment) -->
          <div v-if="showComposeFail" class="animate-rise space-y-3">
            <DemoSpeaker role="assistant" />
            <div class="flex flex-wrap gap-2">
              <DemoToolPill label="Search Contacts" tone="ok" />
              <DemoToolPill
                :label="composeFailPending ? 'Compose Campaign failed' : 'Compose Campaign'"
                :tone="composeFailPending ? 'fail' : 'ok'"
              />
            </div>

            <DemoFailureCard
              v-if="composeFailPending"
              chip="Compose Campaign failed"
              title="Could not create the campaign draft"
              body="The compose request failed before a draft was saved. Nothing was written to Campaigns, and nothing was sent."
              :points="[
                'No campaign draft was created',
                'Andrew was found in contacts, but the email was not composed',
                'You can retry compose, or stop here with nothing changed',
              ]"
              primary-label="Try again"
              @primary="demo.retryCompose()"
            />

            <p v-else class="text-sm text-stone-500">
              Compose succeeded on retry. Ready for your decision on what happens next.
            </p>
          </div>

          <!-- Confirm -->
          <div v-if="showConfirm" class="animate-rise space-y-3">
            <DemoSpeaker role="assistant" />
            <div class="flex flex-wrap gap-2">
              <DemoToolPill label="Search Contacts" tone="ok" />
              <DemoToolPill
                label="Compose Campaign"
                :tone="confirmPending ? 'waiting' : denied ? 'idle' : 'ok'"
              />
            </div>

            <DemoConfirmCard
              v-if="confirmPending"
              @allow="demo.allow()"
              @deny="demo.deny()"
            />

            <p v-else-if="denied" class="text-sm text-stone-500">
              Denied. Nothing was drafted or sent.
              <button
                type="button"
                class="ms-1 font-medium text-[#e85d2c] underline-offset-2 hover:underline"
                @click="demo.reset()"
              >
                Start over
              </button>
            </p>

            <p v-else class="text-sm text-stone-500">
              Allowed. Draft prepared — still nothing sent to the list.
            </p>
          </div>

          <!-- Inform -->
          <div v-if="showInform" class="animate-rise space-y-3">
            <DemoSpeaker role="assistant" />
            <DemoInformCard />
          </div>

          <!-- Prompt 2: DNS -->
          <DemoUserPrompt
            v-if="showPrompt2"
            :pending="prompt2Pending"
            @send="demo.sendPrompt2()"
          >
            <template #label>
              <DemoSpeaker role="user" />
            </template>
            Can you set up DNS for
            <span
              class="mx-0.5 rounded-full border border-[#e85d2c]/30 bg-white px-2 py-0.5 text-[#e85d2c]"
              >send.moonfallsoftware.com</span
            >
            so the live send isn’t held?
          </DemoUserPrompt>

          <!-- DNS failure -->
          <div v-if="showDnsFail" class="animate-rise space-y-3">
            <DemoSpeaker role="assistant" />
            <div class="flex flex-wrap gap-2">
              <DemoToolPill label="Manage Domains failed" tone="fail" />
            </div>
            <DemoFailureCard
              v-if="phase === 'dnsFail'"
              chip="Manage Domains failed"
              title="Could not refresh the DNS setup link"
              body="The automatic setup request failed before a new link was created. Nothing in your DNS was changed. Your domain is still waiting to be activated."
              :points="[
                'No DNS records were written or overwritten',
                'send.moonfallsoftware.com is still registered and waiting',
                'You can retry automatic setup, or finish with manual records',
              ]"
              primary-label="Try again"
              secondary-label="Set up DNS manually"
              @primary="demo.finish()"
              @secondary="demo.finish()"
            />
            <p v-else class="text-sm text-stone-500">
              Got it — you can finish DNS from here whenever you are ready.
            </p>
          </div>
        </div>
      </div>

      <div class="shrink-0 px-6 pt-2 pb-5 sm:px-10 sm:pb-6">
        <div class="mx-auto max-w-2xl">
          <div
            class="relative rounded-[1.35rem] bg-white px-4 pt-3.5 pb-3 shadow-[0_1px_0_rgba(0,0,0,0.04)] ring-1 ring-black/6"
          >
            <p class="min-h-12 pr-14 text-[15px] leading-relaxed text-stone-300">
              Try: “Create a welcome email series for new subscribers”
            </p>
            <button
              type="button"
              class="absolute end-3 bottom-3 flex size-9 items-center justify-center rounded-full bg-[#cc3d00] text-white"
              aria-label="Send"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" class="size-4" aria-hidden="true">
                <path
                  fill-rule="evenodd"
                  d="M10 17a.75.75 0 0 1-.75-.75V5.56L6.03 8.78a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 1 1-1.06 1.06L10.75 5.56v10.69A.75.75 0 0 1 10 17Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
