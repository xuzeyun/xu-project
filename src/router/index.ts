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
          meta: { title: 'home', icon: 'house', allPath: '/home' }
        },
        {
          path: 'demo',
          name: 'demo',
          meta: { title: '开发示例', icon: 'book', allPath: '/demo' },
          children: [
            {
              path: 'emoji',
              name: 'emoji',
              component: () => import('@/views/demo/emoJi/index.vue'),
              meta: { title: '表情选择器', icon: '', allPath: '/demo/emoji' }
            }
          ]
        },
        {
          path: 'system',
          name: 'system',
          meta: { title: '系统管理', icon: 'gear', allPath: '/system' },
          children: [
            {
              path: 'menu',
              name: 'menu',
              component: () => import('@/views/system/menu/index.vue'),
              meta: { title: '菜单管理', icon: '', allPath: '/system/menu' }
            },
            {
              path: 'role',
              name: 'role',
              component: () => import('@/views/system/role/index.vue'),
              meta: { title: '角色管理', icon: '', allPath: '/system/role' }
            },
            {
              path: 'post',
              name: 'post',
              component: () => import('@/views/system/post/index.vue'),
              meta: { title: '岗位管理', icon: '', allPath: '/system/post' }
            }
          ]
        },
        // 开发小工具
        {
          path: 'tools',
          name: 'tools',
          meta: { title: '小工具', icon: 'fa-solid fa-font-awesome', allPath: '/icon' },
          children: [
            {
              path: 'icons',
              name: 'icons',
              component: () => import('@/views/tools/icon/index.vue'),
              meta: { title: 'Fas图标库', icon: '', allPath: '/tools/icons' }
            }
          ]
        }
      ]
    },
    // 登录
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
      meta: { title: 'login', icon: '', allPath: '/login' }
    }
  ]
})

export default router
