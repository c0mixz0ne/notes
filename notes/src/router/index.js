import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
      meta: {
        title: 'Notes : Main',
      },
    },
    {
      path: '/notes',
      name: 'notes',
      // dynamic chunk
      component: () => import('../views/NotesView.vue'),
      meta: {
        title: 'Notes : List',
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  if (isAuthenticated && to.path === '/') {
    next({ path: '/notes' })
  } else if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
