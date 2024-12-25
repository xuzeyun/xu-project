// @ts-nocheck
import { defineStore } from 'pinia'
import { post } from '@/api/index.js'

// router
import router from '@/router'
// import router from 'vue-router'

// let modulesLayout = import.meta.glob('@/views/**/*.vue')
let modules = import.meta.glob('../views/**/*.vue')

let routerSet = []

let newArr = []
// let level = 1

export const appStore = defineStore({
  id: 'app',
  persist: true, // 持久化
  state: () => ({
    appName: '数据监测系统',
    version: 'v1.0.0',
    // 菜单 1 展开 0 收起（string类型）
    menu: '1',
    // 当前主题（默认 暗黑 科技 丛林）
    theme: 'tech',
    logoAlign: 'center',
    // 当前系统菜单
    menuData: [],
    // 所有系统菜单
    menuAllData: []
    // routerSet: []
  }),

  actions: {
    setAppName(appName) {
      this.appName = appName
    },
    setTheme(theme) {
      this.theme = theme
    },
    setLogoAlign(logoAlign) {
      this.logoAlign = logoAlign
    },

    // 获取所有菜单数据
    async setMenuAllData() {
      // /sys/role/menu/list
      let res = await post('/sys/menus')
      this.menuAllData = res.data.menus.filter(item => {
        // 获取两个系统页面
        // return item.name === '计划统筹管理系统' || item.name === '营区内处置系统' || item.name === '数据支撑平台' || item.name === '接收管理系统' || item.name === '合同管理系统'
        return (
          item.name === '计划统筹管理系统' ||
          item.name === '合同管理系统' ||
          item.name === '接收管理系统' ||
          item.name === '销毁管理系统' ||
          item.name === '专项任务管理系统' ||
          item.name === '态势展现系统' ||
          item.name === '数据支撑平台'
        )
      })
      this.menuData = res.data.menus[0].children
      let sysObj = {
        ...res.data.menus[0]
      }
      routerSet = [sysObj]
      this.setRouters()
    },

    // 设置当前系统左侧菜单数据
    setMenuData(data) {
      this.menuData = data.children
      let sysObj = {
        ...data
      }
      routerSet = [sysObj]
    },

    // 设置路由（全部路由）
    setRouters() {
      if (this.menuAllData && this.menuAllData.length > 0) {
        newArr = []
        this.copyTreeData(this.menuAllData, newArr)
        newArr.forEach(item => {
          router.addRoute(item)
        })
        console.log(router.getRoutes(), '--当前所有路由--')
      }
    },

    // 整理路由对象（递归）
    copyTreeData(arr, newArr, level = 1) {
      for (const item of arr) {
        console.log(level, item.name)
        console.log(`@/views${item.menuUrl}/index.vue`)
        let obj = {
          path: level === 1 ? '/' + item.path.split('/')[item.path.split('/').length - 1] : item.path.split('/')[item.path.split('/').length - 1],
          name: item.path.replace(/\//g, ''),
          meta: {
            title: item.name,
            icon: item.icon,
            allPath: item.path
          },
          // 判断如果1级路由，添加layout，叶节点路由添加模板
          component: level === 1 ? () => import(`@/layout/index.vue`) : item.children ? null : modules[`../views${item.menuUrl}/index.vue`]
          // ...item
        }
        if (item.children) obj.children = []
        newArr.push(obj)

        // 递归children
        if (item.children) {
          this.copyTreeData(item.children, obj.children, level + 1)
        }
      }
    }
  }
})
