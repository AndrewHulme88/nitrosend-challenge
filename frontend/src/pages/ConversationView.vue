<script setup lang="ts">
import { onMounted } from 'vue'
import { useConversationStore } from '@/stores/conversation'
import ChatMessage from '@/components/ChatMessage.vue'
import AgentAction from '@/components/AgentAction.vue'
import ModeToggle from '@/components/ModeToggle.vue'
import { callSignature } from '@/lib/call'
import type { Action } from '@/types/conversation'

const conversation = useConversationStore()

onMounted(() => conversation.load())

function isApproved(index: number) {
  return conversation.approved.includes(index)
}

function isDenied(index: number) {
  return conversation.denied.includes(index)
}
</script>

<template>
  <div class="min-h-dvh bg-surface">
    <header class="border-b border-line bg-paper/80 backdrop-blur">
      <div class="mx-auto flex max-w-xl items-center justify-between gap-4 px-5 py-3.5">
        <div class="min-w-0">
          <p class="text-sm font-medium tracking-tight">Nitrosend</p>
          <p class="text-2xs text-muted">
            <template v-if="conversation.mode === 'proposed'">
              Graded by consequence
            </template>
            <template v-else>
              Graded by destructiveHint
            </template>
          </p>
        </div>
        <ModeToggle
          :mode="conversation.mode"
          @update:mode="conversation.setMode($event)"
        />
      </div>
    </header>

    <main class="mx-auto max-w-xl px-5 py-10 sm:py-14">
      <p v-if="conversation.status === 'loading'" class="text-sm text-muted">
        Loading the conversation.
      </p>

      <div v-else-if="conversation.status === 'error'" class="text-sm">
        <p>The conversation could not be loaded.</p>
        <button
          type="button"
          class="mt-2 font-medium text-accent transition-colors duration-150 hover:text-accent-hover"
          @click="conversation.load()"
        >
          Try again
        </button>
      </div>

      <div v-else class="space-y-6">
        <div v-for="(step, index) in conversation.steps" :key="index">
          <ChatMessage v-if="step.type === 'message'" :message="step" />

          <template v-else>
            <p
              v-if="step.send && conversation.sent"
              class="animate-rise text-sm text-muted"
            >
              <span class="text-xs text-positive" aria-hidden="true">✓</span>
              <template v-if="conversation.mode === 'proposed'">
                Sent to
                {{ new Intl.NumberFormat().format(step.send.recipients) }} people in
                {{ step.send.audience }}.
              </template>
              <template v-else>
                Allowed {{ callSignature(step.consequence) }}.
              </template>
            </p>

            <p
              v-else-if="step.send && conversation.dismissed"
              class="animate-rise text-sm text-muted"
            >
              <template v-if="conversation.dismissReason">
                Not sent — {{ conversation.dismissReason.toLowerCase() }}.
                Nothing left the building; the draft is still there.
              </template>
              <template v-else>
                Denied {{ callSignature(step.consequence) }}.
              </template>
            </p>

            <p
              v-else-if="isApproved(index)"
              class="animate-rise text-sm text-muted"
            >
              <span class="text-xs text-positive" aria-hidden="true">✓</span>
              Allowed {{ callSignature((step as Action).consequence) }}.
            </p>

            <p
              v-else-if="isDenied(index)"
              class="animate-rise text-sm text-muted"
            >
              Denied {{ callSignature((step as Action).consequence) }}.
            </p>

            <AgentAction
              v-else
              :action="step"
              :mode="conversation.mode"
              :test-sent-to="conversation.testSentTo"
              @test="conversation.sendTest()"
              @send="conversation.send()"
              @dismiss="conversation.dismiss($event)"
              @revise="conversation.revise()"
              @allow="conversation.allow(index)"
              @deny="conversation.deny(index)"
            />
          </template>
        </div>
      </div>
    </main>
  </div>
</template>
