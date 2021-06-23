import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index.vue')
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('../components/mars3d/Map.vue')
  },
  {
    path: '/cloud',
    name: 'Cloud',
    component: () => import('../components/mars3d/Cloud.vue')
  },
  {
    path: '/snow',
    name: 'Snow',
    component: () => import('../components/mars3d/Snow.vue')
  },
  {
    path: '/odline',
    name: 'odline',
    component: () => import('../components/mars3d/odline.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
