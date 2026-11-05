import { createRouter, createWebHistory } from 'vue-router'

import Tasks from '../components/Tasks/Tasks.vue'
import Login from '../Pages/Login.vue'
import Register from '../Pages/Register.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            component: Login,
            meta: { guestOnly: true },
        },
        {
            path: '/register',
            component: Register,
            meta: { guestOnly: true },
        },
        {
            path: '/tasks',
            component: Tasks,
            meta: { requiresAuth: true },
        },
    ],
})

router.beforeEach((to) => {
    const token = localStorage.getItem('token')
    if (to.meta.requiresAuth && !token) {
        return '/login'
    }
    if (to.meta.guestOnly && token) {
        return '/tasks'
    }

    return true
})

export default router