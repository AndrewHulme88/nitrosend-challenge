<script setup lang="ts">
import { onMounted } from 'vue'
import { useConversationStore } from '@/stores/conversation'
import ChatMessage from '@/components/ChatMessage.vue'
import AgentAction from '@/components/AgentAction.vue'

const conversation = useConversationStore()

onMounted(() => conversation.load())
</script>

<template>
  <div class="min-h-dvh bg-surface">
    <header class="border-b border-line bg-paper/80 backdrop-blur">
      <div class="mx-auto flex max-w-xl items-baseline justify-between px-5 py-3.5">
        <p class="text-sm font-medium tracking-tight">Nitrosend</p>
        <p class="text-2xs uppercase text-muted">Consent prototype</p>
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
            <!-- The send resolves into an outcome rather than vanishing, so the
                 transcript still says what was decided and by whom. -->
            <p
              v-if="step.send && conversation.sent"
              class="animate-rise text-sm text-muted"
            >
              <span class="text-xs text-positive" aria-hidden="true">✓</span>
              Sent to
              {{ new Intl.NumberFormat().format(step.send.recipients) }} people in
              {{ step.send.audience }}.
            </p>

            <p
              v-else-if="step.send && conversation.dismissed"
              class="animate-rise text-sm text-muted"
            >
              Not sent. The draft is still there when you want it.
            </p>

            <AgentAction
              v-else
              :action="step"
              :test-sent-to="conversation.testSentTo"
              @test="conversation.sendTest()"
              @send="conversation.send()"
              @dismiss="conversation.dismiss()"
            />
          </template>
        </div>
      </div>
    </main>
  </div>
</template>
