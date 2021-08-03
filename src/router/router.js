import {createRouter, createWebHashHistory} from 'vue-router';
const routes = [
  {
    path: '/',
    component: ()=> import('../views/home.vue')
  },
  {
    path: '/home',
    component: ()=> import('../views/home.vue')
  },
  {
    path: '/page1',
    component: ()=> import('../views/page1.vue')
  },
  {
    path: '/page2',
    component: ()=> import('../views/page2.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: ()=> import('../views/404.vue')
  },
]

const router = createRouter({
  // 使用 hash 模式的路由
  history: createWebHashHistory(),
  routes
})

export default router;