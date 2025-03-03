<!-- 
==================================================================
@file:					MenuTree.vue
@description:		菜单树
------------------------------------------------------------------
@author:				rt@xzy
@time:					2024/08/27 17:57:31
@version:				2.0
==================================================================
-->
<template>
  <template v-for="item in props.routerList">
    <el-sub-menu class="icon-center" v-if="item.children" :index="item.meta.allPath" :key="item.meta.allPath">
      <!-- 菜单 -->
      <template #title>
        <el-icon v-if="item.meta.icon">
          <i :class="item.meta.icon"></i>
          <!-- <component :is="tabs[item.meta.icon]"></component> -->
        </el-icon>
        <span class="title">{{ item.meta.title }}</span>
      </template>
      <MenuTree :routerList="item.children"></MenuTree>
    </el-sub-menu>
    <el-menu-item class="icon-center" v-else :index="item.meta.allPath" :key="item.meta.allPath">
      <el-icon v-if="item.meta.icon">
        <i :class="item.meta.icon"></i>
        <!-- <component :is="tabs[item.meta.icon]"></component> -->
      </el-icon>
      <template #title>
        <span class="title">{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup>
import { ref, defineProps } from 'vue'
// import {
//   RiHome5Line,
//   RiSettingsLine,
//   RiInboxArchiveLine,
//   RiFileSearchLine,
//   RiFoldersLine,
//   RiExchangeBoxLine,
//   RiMicroscopeLine,
//   RiExchange2Line,
//   RiBook2Line,
//   RiFileTransferLine,
//   RiFileList3Line,
//   RiCalendarScheduleLine,
//   RiTruckLine,
//   RiHomeOfficeLine,
//   RiHomeGearLine,
//   RiDeleteBin2Line,
//   RiBarChart2Line,
//   RiBubbleChartLine,
//   RiTaskLine,
//   RiCpuLine,
//   RiSlideshowLine,
//   RiArchiveLine,
//   RiFireLine,
//   RiDragMoveLine,
//   RiDashboard2Line
// } from '@remixicon/vue'

// const tabs = {
//   RiHome5Line,
//   RiSettingsLine,
//   RiInboxArchiveLine,
//   RiFileSearchLine,
//   RiFoldersLine,
//   RiExchangeBoxLine,
//   RiMicroscopeLine,
//   RiExchange2Line,
//   RiBook2Line,
//   RiFileTransferLine,
//   RiCalendarScheduleLine,
//   RiTruckLine,
//   RiHomeOfficeLine,
//   RiHomeGearLine,
//   RiFileList3Line,
//   RiDeleteBin2Line,
//   RiBarChart2Line,
//   RiBubbleChartLine,
//   RiTaskLine,
//   RiCpuLine,
//   RiSlideshowLine,
//   RiArchiveLine,
//   RiFireLine,
//   RiDragMoveLine,
//   RiDashboard2Line
// }

const props = defineProps({
  routerList: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
.icon {
  color: var(--el-text-color-disabled);
  display: flex;
  width: 24px;
  justify-content: center;
  align-items: center;
}
.icon-center {
  // height: 40px;
  ::v-deep(.el-sub-menu__title) {
    padding-right: 20px;
  }
}
// ::v-deep(.el-menu-item) {
//   height: 40px !important;
//   display: block;
// }
.title {
  flex: 1;
  overflow: hidden;
}
</style>
