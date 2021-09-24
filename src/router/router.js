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

// 进入路由前的拦截  可以做权限判断
// router.beforeEach((to, from, next) => {
//     document.title = `${to.meta.title} | vue-manage-system`;
//     const role = localStorage.getItem("ms_username");
//     if (!role && to.path !== "/login") {
//       next("/login");
//     } else if (to.meta.permission) {
//       // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//       role === "admin" ? next() : next("/403");
//     } else {
//       next();
//     }
//   });

export default router;