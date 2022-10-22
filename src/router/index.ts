import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/OrderList.vue')
  },
  {
    path: '/order-list',
    name: 'OrderList',
    component: () => import('@/views/OrderList.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/Cart.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
