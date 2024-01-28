import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView
    },
    {
      path: '/bonus',
      name: 'bonus',
      component: () => import("../views/BonusPointsView.vue")
    },
    {
      path: '/rules',
      name: 'rules',
      component: () => import("../views/RulesView.vue")
    }
  ]
})

export default router
