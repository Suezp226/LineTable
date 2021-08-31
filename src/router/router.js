import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [{
        path: '/',
        meta: {
            desc: '试一试'
        },
        component: () =>
            import ('../views/home.vue')
    },
    {
        path: '/home',
        meta: {
            desc: '试一试'
        },
        component: () =>
            import ('../views/home.vue')
    },
    {
        path: '/introduct',
        meta: {
            desc: '介绍'
        },
        component: () =>
            import ('../views/introduct.vue')
    },
    {
        path: '/teachPage',
        meta: {
            desc: '教程'
        },
        component: () =>
            import ('../views/teachPage.vue')
    },
    {
        path: '/tablePage',
        meta: {
            desc: '应用'
        },
        component: () =>
            import ('../views/tablePage.vue')
    },
    {
        path: '/H5TablePage',
        meta: {
            desc: 'H5应用'
        },
        component: () =>
            import ('../views/H5TablePage.vue')
    },
    {
        path: '/dragPage',
        meta: {
            desc: '拖拽构建平台'
        },
        name: '拖拽构建平台',
        component: () =>
            import ('../views/dragPage.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        meta: {
            desc: '404'
        },
        name: '404',
        component: () =>
            import ('../views/404.vue')
    },
]

const router = createRouter({
    // 使用 hash 模式的路由
    history: createWebHashHistory(),
    routes
})

export default router;