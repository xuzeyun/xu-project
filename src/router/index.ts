import { createRouter, createWebHistory } from 'vue-router'
/* Layout */
import Layout from '@/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '根',
      component: Layout,
      meta: { title: '', icon: '', allPath: '/' },
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/home/index.vue'),
          meta: { title: 'home', icon: 'fa-user-secret', allPath: '/home' }
        },
        {
          path: 'demo',
          name: 'demo',
          meta: { title: '开发示例', icon: 'fa-user-secret', allPath: '/demo' },
          children: [
            {
              path: 'emoji',
              name: 'emoji',
              component: () => import('@/views/demo/emoJi.vue'),
              meta: { title: '表情选择器', icon: '', allPath: '/demo/emoji' }
            }
          ]
        }
      ]
    }
    // 登录
    // {
    //   path: '/login',
    //   component: () => import('@/views/login/index'),
    //   hidden: true
    // },
  ]
})

export default router
