
import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import pinia from '@/stores'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import './index.less'

// 引入animate
import "animate.css";

const app = createApp(App)

app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(pinia)
app.use(router)

app.mount('#app')
