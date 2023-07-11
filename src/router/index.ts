import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainGame from '../components/main-game.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'MainGame',
    component: MainGame
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
