<template>
  <div class="on-off" @click="onOff(true)">
    <RiMenuFold2Line v-show="isCollapse" class="g-icon" />
    <RiMenuUnfold2Line v-show="!isCollapse" class="g-icon" />
    <!-- <font-awesome-icon icon="outdent" v-show="!isCollapse" />
    <font-awesome-icon icon="indent" v-show="isCollapse" /> -->
  </div>
  <el-menu class="app-menu" default-active="1" :collapse="isCollapse" :router="true" @open="open" @close="close">
    <MenuTree :routerList="routes"></MenuTree>
  </el-menu>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { RiMenuFold2Line, RiMenuUnfold2Line } from '@remixicon/vue'
import MenuTree from './MenuTree.vue'
// 导入使用路由
import { useRouter } from 'vue-router'
const router = useRouter()

const routes = computed(() => router.options.routes[0].children)

// const router = VueRouter.createRouter()

onMounted(() => {
  // console.log('route')
  console.log(router, 'route')
})

// 展开菜单
const open = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
// 收起菜单
const close = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const isCollapse = ref(true)
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
  font-size: 16px;
  cursor: pointer;
}
</style>
