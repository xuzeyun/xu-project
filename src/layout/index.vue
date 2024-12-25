<!-- 
==================================================================
@file:					index.vue
@description:		layout组件
------------------------------------------------------------------
@author:				rt@xzy
@time:					2024/08/28 16:13:10
@version:				2.0
==================================================================
-->
<template>
  <el-container class="app-cont">
    <!-- header -->
    <el-header>
      <GlobelHeader></GlobelHeader>
    </el-header>
    <!-- main-body -->
    <el-container class="app-bd">
      <!-- 菜单栏 -->
      <el-aside class="self-aside">
        <GlobelAside></GlobelAside>
      </el-aside>
      <!-- 主题区域 -->
      <el-container class="self-main">
        <!-- mian -->
        <el-main>
          <!-- 面包屑 -->
          <el-row style="margin-bottom: 10px">
            <el-col :span="12">
              <el-breadcrumb separator="/">
                <template v-for="(item, index) in breadcrumbArr">
                  <el-breadcrumb-item :key="index" v-if="item">{{ item }}</el-breadcrumb-item>
                </template>
              </el-breadcrumb>
            </el-col>
          </el-row>
          <!-- 路由视口 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, watchEffect } from 'vue'
import GlobelHeader from '@/layout/GlobleHeader.vue'
import GlobelAside from '@/layout/GlobleAside.vue'
import { useRouter, useRoute } from 'vue-router'
import { RiFunctionLine } from '@remixicon/vue'
const router = useRouter()
const route = useRoute()

const breadcrumbArr = ref([])

// onMounted(() => {
//   // console.log(router, route.matched, 'rou');
//   route.matched.forEach(item => {
//     breadcrumbArr.value.push(item.meta.title)
//   })
// })

// 获取面包屑信息
watchEffect(() => {
  breadcrumbArr.value = []
  route.matched.forEach(item => {
    breadcrumbArr.value.push(item.meta.title)
  })
})
</script>
<style lang="scss" scoped>
.app-cont {
  height: 100%;
}
.app-bd {
  // height: 100%;
  flex: 1;
  .self-aside {
    ::v-deep(.el-menu) {
      border-right: none;
    }
  }
  .self-main {
    // flex: 1;
    height: 100%;
  }
}

.el-header {
  height: 50px;
  border-bottom: var(--el-border-color) 1px solid;
}
.el-aside {
  width: auto;
  border-right: var(--el-border-color) 1px solid;
  position: relative;
}
.el-main {
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
}
.el-footer {
  height: 30px;
  display: flex;
  font-size: 12px;
  align-items: center;
  border-bottom: var(--el-border-color) 1px solid;
}
</style>
