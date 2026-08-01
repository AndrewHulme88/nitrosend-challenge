<script setup lang="ts">
import { computed } from 'vue'
import ReadAction from '@/components/ReadAction.vue'
import NoticeAction from '@/components/NoticeAction.vue'
import SendPanel from '@/components/SendPanel.vue'
import type { Action, SendDetails } from '@/types/conversation'

const props = defineProps<{
  action: Action
  testSentTo: string | null
}>()

defineEmits<{
  send: []
  test: []
  dismiss: []
}>()

// One dispatch point, so how much an action asks of the operator is decided by
// its resolved consequence and nowhere else.
const level = computed(() => props.action.consequence.consent_level)

const sending = computed(() =>
  props.action.send ? (props.action as Action & { send: SendDetails }) : null,
)
</script>

<template>
  <ReadAction v-if="level === 'none'" :action="action" />
  <NoticeAction v-else-if="level === 'notice'" :action="action" />
  <SendPanel
    v-else-if="sending"
    :action="sending"
    :test-sent-to="testSentTo"
    @send="$emit('send')"
    @test="$emit('test')"
    @dismiss="$emit('dismiss')"
  />
</template>
