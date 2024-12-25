<template>
  <div class="on-off" @click="onOff(true)">
    <RiMenuFold2Line v-show="isCollapse" class="g-icon" />
    <RiMenuUnfold2Line v-show="!isCollapse" class="g-icon" />
  </div>
  <el-menu class="app-menu" :default-active="curPath" :collapse="isCollapse" :router="true" @open="open" @close="close">
    <MenuTree :routerList="routes"></MenuTree>
  </el-menu>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { RiMenuFold2Line, RiMenuUnfold2Line } from '@remixicon/vue'
import MenuTree from './MenuTree.vue'
import { appStore } from '@/stores/app.js'
const _appStore = appStore()
// 导入使用路由
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const routes = computed(() => router.options.routes[0].children)

console.log(routes)

// const routes = computed(() => _appStore.menuData)

onMounted(() => {
  // console.log('route')
  // console.log(routes, 'routes')
  // console.log(router, 'route')
  getCurPath()
})

// 路由变化时，动态改变菜单状态
watch(
  () => route,
  (newValue, oldValue) => {
    // newValue === oldValue
    getCurPath()
  },
  { deep: true }
)

// 当前路由地址
const curPath = ref('')

// 获取当前路由地址
const getCurPath = () => {
  curPath.value = route.path
}

// 展开菜单
const open = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
// 收起菜单
const close = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const isCollapse = ref(false)
const onOff = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<style lang="scss" scoped>
// @import "@/styles/variables.scss";
.app-menu:not(.el-menu--collapse) {
  width: 200px;
  // min-height: 400px;
}
.el-menu {
  border-right: none;
  height: calc(100vh - 81px);
  overflow: auto;
  padding: 10px 0;
}
.on-off {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: var(--el-border-color) 1px solid;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 14px;
  cursor: pointer;
}
</style>
