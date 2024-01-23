<template>
  <el-container class="app-cont">
    <!-- header -->
    <el-header>
      <GlobelHeader></GlobelHeader>
    </el-header>
    <!-- main-body -->
    <el-container class="app-bd">
      <!-- aside -->
      <el-aside class="self-aside">
        <GlobelAside></GlobelAside>
      </el-aside>
      <el-container class="self-main">
        <!-- footer -->
        <!-- <el-footer>
          <GlobelFooter></GlobelFooter>
        </el-footer> -->
        <!-- mian -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import GlobelHeader from '@/layout/GlobleHeader.vue'
import GlobelFooter from '@/layout/GlobleFooter.vue'
import GlobelAside from '@/layout/GlobleAside.vue'
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
.el-aside {
  width: auto;
  border-right: var(--el-border-color) 1px solid;
  position: relative;
}
.el-main {
  height: calc(100vh - 50px);
  overflow: auto;
}
.el-footer {
  height: 30px;
  display: flex;
  font-size: 12px;
  align-items: center;
  border-bottom: var(--el-border-color) 1px solid;
}
</style>
