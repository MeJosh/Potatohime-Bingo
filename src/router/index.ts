import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import ("@/views/LeaderboardView.vue")
    },
    {
      path: '/bonuses/:teamId',
      name: 'team-bonuses',
      component: () => import("@/views/BonusPointsView.vue")
    },
    {
      path: '/board',
      name: 'board',
      component: () => import("@/views/BoardView.vue")
    },
    {
      path: '/boards/:teamId',
      name: 'team-board',
      component: () => import("@/views/BoardView.vue")
    }
  ]
})

export default router
