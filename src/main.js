import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import gy from './plugins/index.js'
import 'vant/lib/index.css'

const app = createApp(App);
gy(app)
app.use(store)
app.use(router).mount('#app')
