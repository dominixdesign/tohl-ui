import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../pages/Index.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../pages/About.vue')
    },
    {
      path: '/:season(TOHL[0-9prePLF]{2,5})/teams',
      name: 'season-teams',
      component: () => import('../pages/season/Teams.vue')
    }
    //
  ]
})

export default router
