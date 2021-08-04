import {createRouter, createWebHashHistory} from 'vue-router';
const routes = [
  {
    path: '/',
    meta: {
      desc:'首页'
    },
    component: ()=> import('../views/home.vue')
  },
  {
    path: '/home',
    meta: {
      desc:'首页'
    },
    component: ()=> import('../views/home.vue')
  },
  {
    path: '/page1',
    meta: {
      desc:'page1'
    },
    component: ()=> import('../views/page1.vue')
  },
  {
    path: '/page2',
    meta: {
      desc:'page2'
    },
    component: ()=> import('../views/page2.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    meta: {
      desc:'404'
    },
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