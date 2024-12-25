<!-- 
==================================================================
@file:					indexCenter.vue
@description:		信息门户专用模板
------------------------------------------------------------------
@author:				rt@xzy
@time:					2024/08/14 17:27:55
@version:				2.0
==================================================================
-->
<template>
  <el-container class="app-cont">
    <!-- header -->
    <!-- <el-header>
      <GlobelHeader></GlobelHeader>
    </el-header> -->
    <!-- main-body -->
    <el-container class="app-bd">
      <el-container class="self-main">
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, watchEffect } from 'vue'
import GlobelHeader from '@/layout/GlobleHeader.vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

</script>
<style lang="scss" scoped>
.app-cont {
  height: 100%;
}
.app-bd {
  // height: 100%;
  flex: 1;
}
.self-aside {
  ::v-deep(.el-menu) {
    border-right: none;
  }
}
.self-main {
  // flex: 1;
  height: 100%;
}

.el-header {
  height: 50px;
  border-bottom: var(--el-border-color) 1px solid;
}
.el-main {
  height: calc(100vh - 0px);
  overflow: auto;
  background: url(@/assets/images/page/zh_bg.jpg) no-repeat;
  background-size: cover;
}
</style>
