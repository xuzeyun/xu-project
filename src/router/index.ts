// @ts-nocheck
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
      redirect: '/home',
      meta: { title: 'home', icon: '', allPath: '/home' },
      children: [
        {
          path: 'home',
          name: '',
          component: () => import('@/views/home/index.vue'),
          meta: { title: '主页', icon: 'ri-home-line', allPath: '/home' }
        },
        {
          path: 'system',
          name: 'system',
          meta: { title: '系统管理', icon: 'ri-settings-line', allPath: '/system' },
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
          meta: { title: '开发', icon: 'ri-braces-line', allPath: '/tools' },
          children: [
            {
              path: 'icons',
              name: 'icons',
              component: () => import('@/views/tools/icons/index.vue'),
              meta: { title: '图标库', icon: '', allPath: '/tools/icons' }
            },
            {
              path: 'form',
              name: 'form',
              component: () => import('@/views/tools/form/index.vue'),
              meta: { title: '表单组件示例', icon: '', allPath: '/tools/form' }
            },
            {
              path: 'table',
              name: 'table',
              component: () => import('@/views/tools/table/index.vue'),
              meta: { title: '表格组件示例', icon: '', allPath: '/tools/table' }
            },
            {
              path: 'emoji',
              name: 'emoji',
              component: () => import('@/views/tools/emoJi/index.vue'),
              meta: { title: '表情选择器', icon: '', allPath: '/tools/emoji' }
            },
            {
              path: 'pdf',
              name: 'pdf',
              meta: { title: 'PDF阅读器', icon: '', allPath: '/tools/pdf' },
              component: () => import('@/views/tools/pdf/index.vue')
            },
            {
              path: 'excelImport',
              name: 'excelImport',
              meta: { title: 'Excel本地导入', icon: '', allPath: '/tools/excelImport' },
              component: () => import('@/views/tools/excelImport/index.vue')
            },
            {
              path: 'gantt',
              name: 'gantt',
              meta: { title: '甘特图', icon: '', allPath: '/tools/gantt' },
              component: () => import('@/views/tools/gantt/index.vue')
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
