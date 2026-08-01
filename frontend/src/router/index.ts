import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'conversation',
    component: () => import('@/pages/ConversationView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundView.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
