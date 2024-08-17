<template>
  <div class="header-wrap">
    <div class="header-li title">
      <div class="logo"></div>
      <h1>融通仓储管理系统</h1>
      <span class="version">[ V1.0.0 ]</span>
    </div>

    <div class="header-li">
      <el-button link>
        <RiRepeatLine class="g-icon" />
      </el-button>
    </div>
    <div class="header-li">
      <el-button link>
        <RiFullscreenLine v-if="fullscreen" class="g-icon" />
        <RiFullscreenExitLine v-else class="g-icon"
      /></el-button>
    </div>
    <div class="header-li tool dark" @click="toggleDark()">
      <el-button link> <RiSunLine v-if="isDark" class="g-icon" /><RiMoonLine v-else class="g-icon" /></el-button>
    </div>
    <div class="header-li">
      <el-dropdown>
        <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item><RiUserLine class="g-icon-r" />个人中心</el-dropdown-item>
            <el-dropdown-item><RiTShirt2Line class="g-icon-r" />主题配色</el-dropdown-item>
            <el-dropdown-item divided @click="exitHandle"><RiLogoutBoxLine class="g-icon-r" />退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <!-- <el-button-group class="ml-4">
      <el-button size="small" @click="changeSize('大')">大</el-button>
      <el-button size="small" @click="changeSize('中')">中</el-button>
      <el-button size="small" @click="changeSize('小')">小</el-button>
    </el-button-group> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { toggleDark, isDark } from '@/composables'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { RiSunLine, RiMoonLine, RiFullscreenLine, RiFullscreenExitLine, RiUserLine, RiTShirt2Line, RiLogoutBoxLine, RiRepeatLine } from '@remixicon/vue'

const changeSize = flag => {}

const fullscreen = ref(false)

onMounted(() => {})

const exitHandle = () => {
  alert()
}
</script>

<style lang="scss" scoped>
// @import "@/styles/variables.scss";
.header-wrap {
  height: 100%;
  display: flex;
  gap: 10px;
  .header-li {
    height: 100%;
    display: flex;
    align-items: center;
    h1 {
      font-size: 22px;
      text-align: center;
    }
  }
  .title {
    flex: 1;
    gap: 10px;
    .logo {
      display: inline-block;
      width: 26px;
      height: 26px;
      background-image: url(@/assets/images/logo.png);
      background-size: 100% 100%;
    }
    .version {
      font-size: 12px;
      display: inline-block;
      padding-top: 10px;
    }
  }
  .tool {
    justify-content: right;
    width: 40px;
    display: flex;
    justify-content: center;
  }
  .dark {
    cursor: pointer;
    i {
      transition: color 0.2s;
    }
    &:hover {
      i {
        color: var(--el-color-primary);
      }
    }
  }
}
</style>
