// @ts-nocheck
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
// 全局API
import * as Api from '@/api'
import * as Utils from '@/utils'

import 'remixicon/fonts/remixicon.css'
import 'animate.css'
import 'element-plus/dist/index.css'
import './styles/index.scss'

// 全局组件
import BaseTable from '@/components/BaseTable/index.jsx'
import BaseForm from '@/components/BaseForm/index.jsx'
import BaseDialog from '@/components/BaseDialog/index.jsx'
// import BaseGantt from '@/components/BaseGantt/index.vue'

const app = createApp(App)
// pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 接口全局挂载
app.config.globalProperties.$Api = Api
// 方法全局挂载
app.config.globalProperties.$Utils = Utils

// 全局挂载组件
// 表格
app.component('BaseTable', BaseTable)
// 表单
app.component('BaseForm', BaseForm)
// 弹窗
app.component('BaseDialog', BaseDialog)
// 甘特
// app.component('BaseGantt', BaseGantt)

app.use(pinia)
app.use(router)
app.mount('#app')
