<template>
  <template v-for="item in props.routerList">
    <el-sub-menu class="icon-center" v-if="item.children" :index="item.meta.allPath" :key="item.meta.allPath">
      <!-- 菜单 -->
      <template #title>
        <!-- <el-icon v-if="item.meta.icon">
          <component :is="item.meta.icon"></component>
        </el-icon> -->
        <i class="icon" v-if="item.meta.icon"><font-awesome-icon :icon="item.meta.icon" /></i>
        <span class="title">{{ item.meta.title }}</span>
      </template>
      <MenuTree :routerList="item.children"></MenuTree>
    </el-sub-menu>
    <el-menu-item class="icon-center" v-else :index="item.meta.allPath" :key="item.meta.allPath">
      <i class="icon" v-if="item.meta.icon"><font-awesome-icon :icon="item.meta.icon" /></i>
      <template #title>
        <span class="title">{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const props = defineProps<{
  routerList: any
}>()
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
