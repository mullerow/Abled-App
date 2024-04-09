import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
const storeDataRoot = createPinia()
const app = createApp(App)

app.use(storeDataRoot)

app.use(router)

app.mount('#app')
