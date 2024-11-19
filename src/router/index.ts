import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UsuarioView from '@/views/UsuarioView.vue'
import UsuarioView2 from '@/views/UsuarioView2.vue'
import Vocabulos from '@/views/Vocabulos.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/usuario',
      name: 'usuario',
      component: UsuarioView
    },
    {
      path: '/usuario2',
      name: 'usuario2',
      component: UsuarioView2
    },
    {
      path: '/vocabulos',
      name: 'vocabulos',
      component: Vocabulos
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
