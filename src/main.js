import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import common from './assets/scripts/common'
import './assets/styles/common.css'

createApp(App).use(store).use(router).mixin(common).mount('#app')
