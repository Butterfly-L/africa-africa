import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/news',
    name: 'Africa News',
    component: ()=>import('../views/News.vue'),
  },
  {
    path: '/map',
    name: 'Learn Africa with Map',
    component: ()=>import('../views/MapView.vue'),
  },
  {
    path: '/',
    name: 'Africa, Africa!',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
