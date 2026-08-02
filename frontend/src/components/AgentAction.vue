<script setup lang="ts">
import { computed } from 'vue'
import ReadAction from '@/components/ReadAction.vue'
import NoticeAction from '@/components/NoticeAction.vue'
import SendPanel from '@/components/SendPanel.vue'
import GenericConfirm from '@/components/GenericConfirm.vue'
import type { ConsentMode } from '@/types/consent'
import type { Action, SendDetails } from '@/types/conversation'

const props = defineProps<{
  action: Action
  mode: ConsentMode
  testSentTo: string | null
}>()

defineEmits<{
  send: []
  test: []
  dismiss: [reason: string]
  revise: []
  allow: []
  deny: []
}>()

// Proposed mode is graded by ConsentPolicy. Current mode is graded by the
// destructiveHint boolean alone — so a draft and a live send look identical.
const level = computed(() =>
  props.mode === 'proposed'
    ? props.action.consequence.consent_level
    : props.action.current.consent_level,
)

const sending = computed(() =>
  props.action.send ? (props.action as Action & { send: SendDetails }) : null,
)
</script>

<template>
  <ReadAction v-if="level === 'none'" :action="action" />
  <NoticeAction v-else-if="level === 'notice'" :action="action" />
  <SendPanel
    v-else-if="mode === 'proposed' && (level === 'verify' || level === 'confirm') && sending"
    :action="sending"
    :test-sent-to="testSentTo"
    @send="$emit('send')"
    @test="$emit('test')"
    @dismiss="(reason) => $emit('dismiss', reason)"
    @revise="$emit('revise')"
  />
  <GenericConfirm
    v-else-if="mode === 'current' && level === 'confirm'"
    :action="action"
    @allow="$emit('allow')"
    @deny="$emit('deny')"
  />
</template>
