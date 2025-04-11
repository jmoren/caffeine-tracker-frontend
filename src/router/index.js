import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import Forbidden from '@/views/User/Forbidden.vue'
import { fetchCurrentUser } from '@/services/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: () => import("../views/User/UserDashboard.vue"),
        },
        {
          path: 'drinks',
          name: 'Drinks',
          meta: { requiresAdmin: true },
          component: () => import("../views/Admin/Drinks.vue"),
        },
        {
          path: 'configuration',
          name: 'Configuration',
          meta: { requiresAdmin: true },
          component: () => import("../views/Admin/Configuration.vue"),
        },
        { path: 'forbidden',
          name: 'Forbidden',
          component: Forbidden
        },
      ]
    },
    { path: '/login', component: LoginView },
  ],
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      const res = await fetchCurrentUser()
      const user = res.data.user
      if (res.status === 401) next('/login')
      else {
        console.log(to.meta)
        if (to.meta.requiresAdmin)
          if (user.roles.indexOf('admin') > -1)
            next()
          else
            next('/forbidden')
        else
          next()
      }
    } catch(error) {
      console.log(error)
      next('/login')
    }
  } else {
    next()
  }
})

export default router
