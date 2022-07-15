import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/Home')
      },
      {
        path: '/my',
        component: () => import('@/views/My')
      },
      {
        path: '/looking',
        component: () => import('@/views/Looking')
      },
      {
        path: '/consult',
        component: () => import('@/views/Consult')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/register',
    component: () => import('@/views/register/index.vue')
  },
  {
    path: '/city',
    component: () => import('@/views/city/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
