import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import * as Api from './api'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// import 'animate.css/source/animate.min.css';
import 'animate.css'
import './styles/index.scss'

/* add icons to the library */
library.add(fas)

const app = createApp(App)
// pinia
const pinia = createPinia()
// 图标库
app.component('font-awesome-icon', FontAwesomeIcon)
// 接口全局挂载
app.config.globalProperties.$Api = Api

app.use(pinia)
app.use(router)
app.mount('#app')
