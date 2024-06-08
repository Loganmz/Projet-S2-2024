import './assets/css/style.css'

import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router/auto'
import V3ScrollLock from 'v3-scroll-lock'

const router = createRouter({
  history: createWebHistory()
  // the routes property is handled by the plugin
})

const app = createApp(App)

app.use(router)
app.use(V3ScrollLock, {})

app.mount('#app')
