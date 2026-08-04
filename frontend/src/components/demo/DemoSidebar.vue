<script setup lang="ts">
const primary = [
  { label: 'Setup', meta: '75%', metaTone: 'progress' as const },
  { label: 'Home', active: true },
  { label: 'Campaigns' },
  { label: 'Flows' },
  { label: 'Templates', badge: 'New', badgeTone: 'new' as const },
  { label: 'Inbox', badge: 'Beta', badgeTone: 'beta' as const },
  { label: 'Outreach', badge: 'Soon', badgeTone: 'soon' as const },
  { label: 'Activity' },
  { label: 'Contacts' },
]

const secondary = ['Brand', 'Integrations', 'Learning Center']
</script>

<template>
  <aside
    class="flex h-dvh w-[19rem] shrink-0 flex-col border-r border-black/6 bg-white text-[14px] text-stone-700"
  >
    <div class="px-4 pt-4 pb-3">
      <img
        src="/nitrosend-logo.png"
        alt="Nitrosend"
        class="h-7 w-auto max-w-full object-contain object-left"
      />
    </div>

    <div class="px-3 pb-3">
      <div
        class="flex items-center justify-between px-2.5 py-1.5 text-stone-600"
      >
        <span>Search...</span>
        <kbd
          class="rounded border border-black/8 bg-[#78716c]/10 px-1.5 py-0.5 text-[10px] font-medium text-stone-400"
          >/</kbd
        >
      </div>
    </div>

    <nav class="flex-1 overflow-y-auto px-2 pb-3" aria-label="Primary">
      <ul class="space-y-0.5">
        <li v-for="item in primary" :key="item.label">
          <div
            class="flex cursor-default items-center gap-2.5 rounded-lg px-2.5 py-1.5 font-semibold"
            :class="
              item.active
                ? 'bg-[#fff5f0] text-[#992e00]'
                : 'text-stone-800 hover:bg-[#78716c]/20'
            "
          >
            <span
              class="size-1.5 shrink-0 rounded-full"
              :class="item.active ? 'bg-[#e85d2c]' : 'bg-stone-300'"
              aria-hidden="true"
            />
            <span class="flex-1 truncate">{{ item.label }}</span>
            <span
              v-if="item.meta"
              class="text-[11px] font-semibold text-[#e85d2c]"
            >
              {{ item.meta }}
            </span>
            <span
              v-else-if="item.badge"
              class="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
              :class="{
                'bg-emerald-50 text-emerald-700': item.badgeTone === 'new',
                'bg-[#fff5f0] text-[#992e00]': item.badgeTone === 'beta' || item.badgeTone === 'soon',
              }"
            >
              {{ item.badge }}
            </span>
          </div>
        </li>
      </ul>

      <ul class="mt-5 space-y-0.5 border-t border-black/6 pt-3">
        <li v-for="label in secondary" :key="label">
          <div
            class="flex cursor-default items-center gap-2.5 rounded-lg px-2.5 py-1.5 font-bold text-stone-800 hover:bg-stone-50"
          >
            <span class="size-1.5 shrink-0 rounded-full bg-stone-300" aria-hidden="true" />
            <span class="truncate">{{ label }}</span>
          </div>
        </li>
      </ul>
    </nav>

    <div class="border-t border-black/6 px-3 py-3">
      <div class="flex items-center gap-2.5">
        <div
          class="flex size-8 shrink-0 items-center justify-center rounded-full bg-stone-200 text-[11px] font-semibold text-stone-600"
          aria-hidden="true"
        >
          AH
        </div>
        <div class="min-w-0 flex-1">
          <p class="truncate text-[13px] font-medium text-stone-900">Andrew Hulme</p>
          <p class="truncate text-[11px] text-stone-400">Free · MoonFall Software</p>
        </div>
        <span class="text-stone-300" aria-hidden="true">⚙</span>
      </div>
    </div>
  </aside>
</template>
