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
    },
    {
      path: '/:season(TOHL[0-9prePLF]{2,5})/team/:team([a-z0-9]{2,3})',
      name: 'season-team-roster',
      component: () => import('../pages/season/Team.vue'),
      children: [
        {
          path: 'roster',
          component: () => import('../pages/season/team/Roster.vue')
        },
        {
          path: 'finances',
          component: () => import('../pages/season/team/Finances.vue')
        }
      ]
    }
  ]
})

export default router
