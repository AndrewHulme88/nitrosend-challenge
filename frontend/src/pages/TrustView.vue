<script setup lang="ts">
import MomentSection from '@/components/trust/MomentSection.vue'
import PanelLabel from '@/components/trust/PanelLabel.vue'
import Annotation from '@/components/trust/Annotation.vue'
import StatusChip from '@/components/trust/StatusChip.vue'
import NitroFrame from '@/components/trust/NitroFrame.vue'

const questions = [
  {
    question: 'What am I agreeing to?',
    detail: 'Plain outcome, reach, and whether it can be undone, not a raw tool name with no description.',
  },
  {
    question: 'Has anything been sent yet?',
    detail: 'Draft, test, and live must be unmistakable before and after the action. A user should clearly know whether something has been sent or not at all times.',
  },
  {
    question: 'If it failed, what happened?',
    detail: 'Whether anything was written or sent, if it is retryable, and what to do next.',
  },
]
</script>

<template>
  <div class="min-h-dvh overflow-x-clip bg-[#f6f4f1] text-[#1c1917]">
    <header class="border-b border-black/8 bg-[#faf8f5]">
      <div class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <div class="min-w-0">
          <p class="text-[14px] font-semibold tracking-[0.14em] text-[#c45c26] uppercase">
            Nitrosend
          </p>
          <p class="mt-0.5 text-sm text-stone-500">Andrew Hulme - Product Engineer Challenge</p>
        </div>
        <RouterLink
          to="/demo"
          class="text-[20px] font-medium text-[#c45c26] underline-offset-2 hover:underline"
        >
          See the proposed walkthrough →
        </RouterLink>
      </div>
    </header>

    <main>
      <section class="mx-auto max-w-5xl px-5 pt-12 pb-10 sm:px-8 sm:pt-16 sm:pb-14">
        <p class="trust-rise text-[25px] font-semibold tracking-[0.16em] text-[#c45c26] uppercase">
          Trust in Nitrosend
        </p>
        <h1
          class="trust-rise mt-3 max-w-3xl text-[2rem] leading-[1.15] font-semibold tracking-tight text-balance sm:text-[2.75rem]"
          style="animation-delay: 40ms"
        >
          Every tool interaction should answer three questions.
        </h1>
        <p
          class="trust-rise mt-5 max-w-2xl text-base leading-relaxed text-pretty text-stone-600 sm:text-lg"
          style="animation-delay: 80ms"
        >
          Nitrosend’s biggest challenge is earning and maintaining people's trust. The promise is that a human
          stays in control, but that promise is only as strong as the UI at the moment of consequence, when
          the agent asks for permission, reports a result, or fails. If a user can clearly see what the agent is
          doing at all times, they will naturally trust the product. I redesigned three common moments in the user
          journey to show how that clarity improves the experience, and in turn earns trust.
        </p>

        <ol
          class="trust-rise mt-10 grid gap-3 sm:grid-cols-3"
          style="animation-delay: 120ms"
        >
          <li
            v-for="(q, i) in questions"
            :key="q.question"
            class="rounded-2xl border border-black/8 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.03)]"
          >
            <p class="text-[11px] font-semibold tracking-[0.12em] text-stone-400 uppercase">
              {{ String(i + 1).padStart(2, '0') }}
            </p>
            <p class="mt-2 text-base font-medium tracking-tight">{{ q.question }}</p>
            <p class="mt-2 text-sm leading-relaxed text-stone-500">{{ q.detail }}</p>
          </li>
        </ol>
      </section>

      <MomentSection
        number="01"
        title="Confirm"
        question="What am I agreeing to?"
        problem="The current Allow/Deny bar names the tool, but gives no real explanation of what the
        user is agreeing to, or what the outcome will be. Drafting a campaign and sending it live can look identical.
        It is hard for a user to trust the agent if they do not know what they are agreeing to."
      >
        <template #current>
          <PanelLabel />
          <div class="rounded-xl border border-black/10 bg-[#faf6ee] p-4">
            <div
              class="flex flex-col gap-3 rounded-lg border border-[#e8c99a] bg-[#fbf3e4] px-3.5 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <p class="font-mono text-sm text-stone-800">Allow control delivery</p>
              <div class="flex gap-4 self-end sm:self-auto">
                <span class="text-sm font-medium text-[#c45c26]">Allow</span>
                <span class="text-sm font-medium text-[#c43c2b]">Deny</span>
              </div>
            </div>
            <p class="mt-4 text-sm leading-relaxed text-stone-500">
              No description, no audience, no sense of whether anything has been sent, and no
              reversibility. The operator has to reconstruct the stakes from earlier chat, or guess
              what they are agreeing to.
            </p>
          </div>
        </template>
        <template #proposed>
          <PanelLabel tone="proposed" />
          <NitroFrame>
            <StatusChip tone="idle">Waiting for your decision</StatusChip>

            <h3 class="mt-4 text-xl font-semibold tracking-tight text-balance">
              Send
              <span class="text-[#c45c26]">Welcome to MoonFall Software</span>
              live
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-stone-500">
              To
              <span class="rounded bg-stone-100 px-1.5 py-0.5 font-medium text-stone-800"
                >Andrew</span
              >
              · 1 recipient · cannot be recalled once delivered
            </p>

            <div
              class="mt-5 rounded-2xl border border-black/6 bg-stone-50 p-4"
            >
              <p class="text-[11px] font-semibold tracking-[0.12em] text-stone-400 uppercase">
                Email preview
              </p>
              <p class="mt-2 text-sm font-semibold">Welcome to MoonFall Software</p>
              <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-stone-500">
                Thanks for signing up. Here’s what to expect next, and how to get
                started with your account.
              </p>
              <div class="mt-3 flex items-center gap-2 text-xs text-stone-400">
                <span class="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                Nothing has been sent yet
              </div>
            </div>

            <div class="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
              <button
                type="button"
                class="rounded-full bg-[#c45c26] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Allow send
              </button>
              <button
                type="button"
                class="rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-stone-600"
              >
                Deny
              </button>
            </div>
          </NitroFrame>
          <Annotation>
            A clear description of what is happening and what the user is agreeing to, not just a tool name.
            Outcome in the title. Reach in the subtitle. Explicit “nothing sent yet”. It is clear exactly what
            the user is allowing or denying, with no guesswork.
          </Annotation>
        </template>
      </MomentSection>

      <MomentSection
        number="02"
        title="Inform"
        question="Has anything been sent yet?"
        problem="Some details are currently obscured from the user, such as whether something was successfully
        sent or only drafted, sandbox caveats, and vague tool pills. In my test the assistant said
        the email was created, approved, and sent, while a Control Delivery pill still read failed. I had no
        idea if anything had actually sent or not. I was also never made aware I was in a sandbox environment
        or that there were limits on AI actions until well into the process, when I had already used multiple
        actions. Removing that ambiguity will build further trust in the product and make users less likely
        to bounce off it."
      >
        <template #current>
          <PanelLabel />
          <figure
            class="trust-media relative min-h-80 overflow-hidden rounded-xl border border-black/10 bg-white lg:min-h-0"
          >
            <img
              src="/trust/record-current.png"
              alt="Current Nitrosend response claiming success beside a failed Control Delivery tool pill"
              class="absolute inset-0 h-full w-full object-contain object-top"
            />
          </figure>
          <Annotation tone="problem">
            The narrative says “successfully… sent.” The tool strip includes a failed Control Delivery, and a
            heap of tools with no description. The human has to reconcile two truths, and try to guess
            what is going on.
          </Annotation>
        </template>
        <template #proposed>
          <PanelLabel tone="proposed" />
          <div class="trust-media flex min-h-80 flex-col lg:min-h-0">
            <NitroFrame>
            <div class="flex flex-wrap gap-2">
              <StatusChip tone="draft">Draft saved</StatusChip>
              <StatusChip tone="ok">Test delivered</StatusChip>
              <StatusChip tone="warn">Live send held</StatusChip>
            </div>

            <p class="mt-5 text-[15px] leading-relaxed text-pretty text-stone-700">
              I prepared
              <strong class="font-semibold text-stone-900">Welcome to MoonFall Software</strong>
              for Andrew. A test copy went to your inbox. The live campaign is still in the
              sandbox review queue. It has
              <strong class="font-semibold text-stone-900">not</strong>
              gone to your audience yet.
            </p>

            <ol class="mt-5 space-y-2.5">
              <li
                class="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-3.5 py-3"
              >
                <span
                  class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white"
                  aria-hidden="true"
                  >✓</span
                >
                <div class="min-w-0">
                  <p class="text-sm font-semibold text-emerald-950">Test delivered</p>
                  <p class="mt-0.5 text-sm text-emerald-900/75">
                    andrew_hulme04@hotmail.com
                  </p>
                </div>
              </li>
              <li
                class="flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50/80 px-3.5 py-3"
              >
                <span
                  class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white"
                  aria-hidden="true"
                  >!</span
                >
                <div class="min-w-0">
                  <p class="text-sm font-semibold text-amber-950">Live send held in sandbox</p>
                  <p class="mt-0.5 text-sm text-amber-900/75">
                    Audience has not been contacted. Verify
                    <span class="rounded bg-white/80 px-1 font-mono text-[12px]"
                      >send.moonfallsoftware.com</span
                    >
                    to unlock immediate delivery.
                  </p>
                </div>
              </li>
            </ol>

            <div class="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                class="rounded-full bg-[#c45c26] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Open campaign
              </button>
              <button
                type="button"
                class="rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-stone-600"
              >
                Preview email
              </button>
            </div>
          </NitroFrame>
          </div>
          <Annotation>
            Here the outcomes are shown first, as clear steps the eye can scan and understand. The user can
            clearly see the status of what they are drafting or sending. The sandbox is a constraint callout
            that surfaces the limit as it happens, instead of hiding it from the user.
          </Annotation>
        </template>
      </MomentSection>

      <MomentSection
        number="03"
        title="Failure"
        question="If it failed, what happened?"
        problem="A failed tool appears as a small red pill while the message still opens with “Great news!”
        The operator cannot tell whether anything was written, whether to retry, or whether to fall back to
        manual setup. The same issue occurs with all tool failures. All the user sees is the name of the tool
        and the word “failed”. By adding a clear explanation to failed tool calls, we can remove confusion
        or panic the user may feel. Again, this comes back to trust in the product."
      >
        <template #current>
          <PanelLabel />
          <figure
            class="trust-media relative flex min-h-80 items-start justify-center overflow-hidden rounded-xl border border-black/10 bg-white lg:min-h-0"
          >
            <img
              src="/trust/failure-current.png"
              alt="Current Nitrosend: Manage Domains failed pill above Great news copy"
              class="w-full max-w-full object-contain object-top"
            />
          </figure>
          <Annotation tone="problem">
            Failure gives no explanation and the agent ignores it completely, so it is unclear what happened.
            Trust breaks if the user is receiving conflicting messaging, or no detail at all.
          </Annotation>
        </template>
        <template #proposed>
          <PanelLabel tone="proposed" />
          <div class="trust-media flex min-h-80 flex-col lg:min-h-0">
            <NitroFrame>
              <StatusChip tone="fail">Manage Domains failed</StatusChip>

              <h3 class="mt-4 text-xl font-semibold tracking-tight text-balance">
                Could not refresh the DNS setup link
              </h3>
              <p class="mt-2 text-[15px] leading-relaxed text-pretty text-stone-600">
                The automatic setup request failed before a new link was created.
                <strong class="font-semibold text-stone-900">Nothing in your DNS was changed.</strong>
                Your domain is still waiting to be activated.
              </p>

              <div
                class="mt-5 rounded-2xl border border-red-100 bg-red-50 p-4"
              >
                <p class="text-[11px] font-semibold tracking-[0.12em] text-red-700/70 uppercase">
                  What this means
                </p>
                <ul class="mt-2.5 space-y-2 text-sm text-red-950/85">
                  <li class="flex gap-2">
                    <span class="mt-1.5 size-1.5 shrink-0 rounded-full bg-red-400" aria-hidden="true" />
                    No DNS records were written or overwritten
                  </li>
                  <li class="flex gap-2">
                    <span class="mt-1.5 size-1.5 shrink-0 rounded-full bg-red-400" aria-hidden="true" />
                    <span>
                      <span class="rounded bg-red-100/80 px-1 font-mono text-[12px]"
                        >send.moonfallsoftware.com</span
                      >
                      is still registered and waiting
                    </span>
                  </li>
                  <li class="flex gap-2">
                    <span class="mt-1.5 size-1.5 shrink-0 rounded-full bg-red-400" aria-hidden="true" />
                    You can retry automatic setup, or finish with manual records
                  </li>
                </ul>
              </div>

              <div class="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                <button
                  type="button"
                  class="rounded-full bg-[#c45c26] px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Try again
                </button>
                <button
                  type="button"
                  class="rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-stone-600"
                >
                  Set up DNS manually
                </button>
              </div>
            </NitroFrame>
          </div>
          <Annotation>
            Failure is clearly explained, and offers explicit options. The agent acknowledges the failure
            and states what changed (nothing). There is no conflicting messaging, and the user can clearly
            see what is happening.
          </Annotation>
        </template>
      </MomentSection>

      <section class="border-t border-black/8 bg-[#faf8f5]">
        <div class="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-14">
          <p class="text-[11px] font-semibold tracking-[0.14em] text-stone-400 uppercase">
            Trust
          </p>
          <h2 class="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
            Build Nitrosend on a solid foundation of trust.
          </h2>
          <p class="mt-3 max-w-2xl text-sm leading-relaxed text-pretty text-stone-600 sm:text-base">
            As it is, Nitrosend is an exciting and useful tool. But what is the point of adding a bunch of new
            and exciting features if people bounce off the base product because they do not trust it? From
            reading public discussions about Nitrosend online, and from my own interactions with it, the most common
            issue people have is that they do not know if they can trust it. Concerns about ruining their reputation
            are understandable. Nitrosend attempts to address this with a solid promise that a human is always in
            control. Currently, though, it does not feel that way when actually using the product. If Nitrosend can
            match the product to the promise it makes, and keep the user feeling in control and informed at all
            times, people are more likely to believe that promise. You would not build a house on sand. Make sure
            Nitrosend is built on a solid foundation of trust.
          </p>
        </div>
      </section>

      <footer class="border-t border-black/8">
        <div
          class="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8"
        >
          <p class="text-sm text-stone-500">
            Make consequential moments calm, explicit, and recoverable.
          </p>
          <RouterLink
            to="/conversation"
            class="text-[20px] font-medium text-[#c45c26] underline-offset-2 hover:underline"
          >
            See the proposed walkthrough →
          </RouterLink>
        </div>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.trust-rise {
  animation: trust-rise 500ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

.trust-settle {
  animation: trust-settle 420ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes trust-rise {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
}

@keyframes trust-settle {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .trust-rise,
  .trust-settle {
    animation: none;
  }
}
</style>
