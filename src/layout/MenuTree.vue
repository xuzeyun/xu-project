<template>
  <template v-for="item in props.routerList">
    <el-sub-menu v-if="item.children" :index="item.meta.allPath" :key="item.meta.allPath">
      <!-- 菜单 -->
      <template #title>
        <!-- <el-icon v-if="item.meta.icon">
          <component :is="item.meta.icon"></component>
        </el-icon> -->
        <font-awesome-icon :icon="`fa-solid ${item.meta.icon}`" />
        <span class="title">{{ item.meta.title }}</span>
      </template>
      <MenuTree :routerList="item.children"></MenuTree>
    </el-sub-menu>
    <el-menu-item v-else :index="item.meta.allPath" :key="item.meta.allPath">
      <font-awesome-icon :icon="`fa-solid ${item.meta.icon}`" />
      <template #title>
        <span class="title">{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'
const props = defineProps<{
  routerList: any
}>()
</script>

<style lang="scss" scoped>
.fas {
  color: var(--el-text-color-disabled);
  display: flex;
  width: 20px;
  height: 100%;
  justify-content: center;
  align-items: center;
}
// .title {
//   flex: 1;
//   width: 100%;
// }
</style>
