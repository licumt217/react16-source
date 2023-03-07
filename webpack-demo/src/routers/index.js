import { createRouter, createWebHashHistory } from "vue-router"

const Login = () => import("../pages/login/index.vue")
const MyCar = () => import("../pages/myCar/index.vue")
const MyWallet = () => import("../pages/myWallet/index.vue")
const MyOrder = () => import("../pages/myOrder/index.vue")
const NotFound = () => import("../pages/notFound/index.vue")

const routes = [
    {
        path: '/login',
        component: Login
    }, {
        path: '/myCar',
        component: MyCar
    }, {
        path: '/myOrder',
        component: MyOrder
    }, {
        path: '/myWallet',
        component: MyWallet
    }, {
        path: '/404',
        component: NotFound
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/404'
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router;

