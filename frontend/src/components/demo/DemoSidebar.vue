<script setup lang="ts">
import type { Component } from 'vue'
import {
  Archive,
  BarChart3,
  House,
  Inbox,
  Layers,
  LayoutGrid,
  Megaphone,
  Puzzle,
  Rocket,
  Send,
  Settings,
  Sun,
  Users,
} from '@lucide/vue'

type NavItem = {
  label: string
  icon: Component
  active?: boolean
  meta?: string
  badge?: string
  badgeTone?: 'new' | 'beta' | 'soon'
}

const primary: NavItem[] = [
  { label: 'Setup', meta: '75%', icon: Rocket },
  { label: 'Home', active: true, icon: House },
  { label: 'Campaigns', icon: Send },
  { label: 'Flows', icon: LayoutGrid },
  { label: 'Templates', badge: 'New', badgeTone: 'new', icon: Archive },
  { label: 'Inbox', badge: 'Beta', badgeTone: 'beta', icon: Inbox },
  { label: 'Outreach', badge: 'Soon', badgeTone: 'soon', icon: Megaphone },
  { label: 'Activity', icon: BarChart3 },
  { label: 'Contacts', icon: Users },
]

const secondary: NavItem[] = [
  { label: 'Brand', icon: Layers },
  { label: 'Integrations', icon: Puzzle },
]

function iconColor(active?: boolean) {
  return active ? 'text-[#e85d2c]' : 'text-stone-500'
}
</script>

<template>
  <aside
    class="flex h-dvh w-[19rem] shrink-0 flex-col border-r border-black/6 bg-white text-[14px] text-stone-700"
  >
    <div class="grid grid-cols-[1fr_auto] items-center gap-x-2 gap-y-2 px-[1.375rem] pt-4 pb-3">
      <img
        src="/nitrosend-logo.png"
        alt="Nitrosend"
        class="h-7 w-auto max-w-full object-contain object-left"
      />
      <button
        type="button"
        aria-label="Toggle dark mode"
        class="justify-self-center text-stone-400 hover:text-stone-600"
      >
        <Sun :size="16" :stroke-width="1.75" absolute-stroke-width aria-hidden="true" />
      </button>

      <span class="py-1.5 text-stone-600">Search...</span>
      <kbd
        class="justify-self-center rounded border border-black/8 bg-[#78716c]/10 px-1.5 py-0.5 text-[10px] font-medium text-stone-400"
        >/</kbd
      >
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
            <component
              :is="item.icon"
              :size="16"
              :stroke-width="1.75"
              absolute-stroke-width
              class="shrink-0"
              :class="iconColor(item.active)"
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
        <li v-for="item in secondary" :key="item.label">
          <div
            class="flex cursor-default items-center gap-2.5 rounded-lg px-2.5 py-1.5 font-bold text-stone-800 hover:bg-stone-50"
          >
            <component
              :is="item.icon"
              :size="16"
              :stroke-width="1.75"
              absolute-stroke-width
              class="shrink-0 text-stone-500"
              aria-hidden="true"
            />
            <span class="truncate">{{ item.label }}</span>
          </div>
        </li>
      </ul>
    </nav>

    <div class="border-t border-black/6 px-3 py-3">
      <div class="flex items-center gap-2.5">
        <img
          src="/moonfall-logo.png"
          alt="MoonFall Software"
          class="size-8 rounded-xl object-contain"
        />
        <div class="min-w-0 flex-1">
          <p class="truncate text-[13px]">
            <span class="font-medium text-stone-900">Andrew Hulme</span>
            <span class="ml-1.5 font-normal text-stone-400">Free</span>
          </p>
          <p class="truncate text-[11px] text-stone-400">MoonFall Software</p>
        </div>
        <Settings
          :size="16"
          :stroke-width="1.75"
          absolute-stroke-width
          class="shrink-0 text-stone-300"
          aria-hidden="true"
        />
      </div>
    </div>
  </aside>
</template>
