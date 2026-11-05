import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import { Toaster } from 'vue-sonner'
import { createPinia } from 'pinia'
import 'vue-sonner/style.css'

import './style.css'

import router from './router'
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(VueQueryPlugin)

app.component('Toaster', Toaster)

app.mount('#app')