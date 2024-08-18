<template>
  <div class="header-wrap">
    <div class="header-li title">
      <div class="logo"></div>
      <h1>融通仓储管理系统</h1>
      <span class="version">[ V1.0.0 ]</span>
    </div>

    <!-- 系统切换 -->
    <div class="header-li">
      <el-dropdown>
        <el-button link><RiRecycleLine class="g-icon" /></el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>筹划系统</el-dropdown-item>
            <el-dropdown-item>计划系统</el-dropdown-item>
            <el-dropdown-item>销毁系统</el-dropdown-item>
            <el-dropdown-item>态势系统</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!-- 全屏显示 -->
    <div class="header-li">
      <el-button link @click="fullScreenToggle">
        <RiFullscreenLine v-if="!fullscreen" class="g-icon" />
        <RiFullscreenExitLine v-else class="g-icon"
      /></el-button>
    </div>

    <!-- 主题切换 -->
    <div class="header-li">
      <el-dropdown>
        <el-button link><RiTShirt2Line class="g-icon" /></el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="themeToggle('亮白')"><RiSunLine class="g-icon-r" />亮白主题</el-dropdown-item>
            <el-dropdown-item @click="themeToggle('暗黑')"><RiMoonLine class="g-icon-r" />暗黑主题</el-dropdown-item>
            <el-dropdown-item @click="themeToggle('军蓝')">军蓝</el-dropdown-item>
            <el-dropdown-item @click="themeToggle('军绿')">军绿</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <!-- 系统设置 -->
    <div class="header-li">
      <el-button link><RiSettingsLine class="g-icon" @click="paletteHandle" /></el-button>
    </div>
    <div class="header-li">
      <el-dropdown>
        <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item><RiUserLine class="g-icon-r" />个人中心</el-dropdown-item>
            <el-dropdown-item divided @click="exitHandle"><RiLogoutBoxLine class="g-icon-r" />退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <el-drawer v-model="drawer" direction="rtl" title="系统设置">
    <!-- 系统配色 -->
    <h4><RiPaletteLine class="g-icon-r" />系统配色</h4>
    <el-row class="theme-color">
      <template v-for="item in colorList" :key="item.name">
        <dl @click="setThemeColor(item.name, item.colors)">
          <dt>{{ item.name }}</dt>
          <dd :style="{ 'background-color': item.colors[0] }"></dd>
          <dd :style="{ 'background-color': item.colors[1] }"></dd>
          <dd :style="{ 'background-color': item.colors[2] }"></dd>
          <dd :style="{ 'background-color': item.colors[3] }"></dd>
          <dd :style="{ 'background-color': item.colors[4] }"></dd>
        </dl>
      </template>
      <!-- 自定义配色 -->
      <dl class="custom" @click="setThemeColor('自定义配色')">
        <dt>自定义配色</dt>
        <dd>
          <label>主题色</label>
          <el-color-picker v-model="themeConfig.colors.primary" />
        </dd>
        <dd><label>成功色</label> <el-color-picker v-model="themeConfig.colors.success" /></dd>
        <dd><label>警告色</label> <el-color-picker v-model="themeConfig.colors.warning" /></dd>
        <dd><label>危险色</label> <el-color-picker v-model="themeConfig.colors.danger" /></dd>
        <dd><label>消息色</label> <el-color-picker v-model="themeConfig.colors.info" /></dd>
      </dl>
    </el-row>
    <!-- <BaseForm ref="drawerFormRef" v-bind="drawerFormConfig" v-if="drawer"></BaseForm> -->
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawerCancel">取消</el-button>
        <el-button type="primary" @click="drawerConfirm"><RiSave3Line class="g-icon-r" />保存</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import {
  RiSunLine,
  RiMoonLine,
  RiFullscreenLine,
  RiFullscreenExitLine,
  RiUserLine,
  RiTShirt2Line,
  RiLogoutBoxLine,
  RiRepeatLine,
  RiPaletteLine,
  RiSave3Line,
  RiSettingsLine,
  RiRecycleLine
} from '@remixicon/vue'
import { Theme, getTheme, setTheme } from '../utils/theme'
import { useDark, useToggle } from '@vueuse/core'

// 退出登录
const exitHandle = () => {}

const isDark = useDark()
const toggleDark = useToggle(isDark)

const themeToggle = (flag: string) => {
  if (flag === '亮白') {
    toggleDark()
  } else if (flag === '暗黑') {
    toggleDark()
  }
}

const colorList = ref([
  { name: 'Element Plus Theme', colors: ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399'] },
  { name: 'Arco Design Theme', colors: ['#165dff', '#00b42a', '#ff7d00', '#f53f3f', '#86909c'] },
  { name: 'Ant Design Theme', colors: ['#1677ff', '#52c41a', '#faad14', '#ff4d4f', '#bfbfbf'] },
  { name: 'TDesign Theme', colors: ['#0052d9', '#2ba471', '#e37318', '#d54941', '#8b8b8b'] }
])

// =========================================
const drawer = ref(false)

const drawerCancel = () => {
  drawer.value = false
}

// 配色表单配置
// const drawerFormRef = ref(null)
// const drawerFormConfig = reactive({
//   config: {
//     size: '',
//     inline: true
//   },
//   data: {
//     primary: getTheme().colors.primary,
//     success: getTheme().colors.success,
//     warning: getTheme().colors.warning,
//     danger: getTheme().colors.danger,
//     info: getTheme().colors.info
//   },
//   item: [
//     { prop: 'primary', label: '主题色', itemRender: { name: 'ElColorPicker' } },
//     { prop: 'success', label: '成功色', itemRender: { name: 'ElColorPicker' } },
//     { prop: 'warning', label: '警告色', itemRender: { name: 'ElColorPicker' } },
//     { prop: 'danger', label: '危险色', itemRender: { name: 'ElColorPicker' } },
//     { prop: 'info', label: '消息色', itemRender: { name: 'ElColorPicker' } }
//   ]
// })

const themeConfig = reactive({
  name: '',
  colors: {
    primary: getTheme().colors.primary,
    success: getTheme().colors.success,
    warning: getTheme().colors.warning,
    danger: getTheme().colors.danger,
    info: getTheme().colors.info
  }
})

// 主题设置窗口打开
const paletteHandle = () => {
  drawer.value = true
}

// 主题设置提交
const drawerConfirm = () => {
  let data = { colors: themeConfig.colors }
  setTheme(data)
  drawer.value = false
}

// 主题设置数据整理
const setThemeColor = (name: string, colors: string[]) => {
  themeConfig.name = name
  if (name != '自定义配色') {
    ;(themeConfig.colors.primary = colors[0]),
      (themeConfig.colors.success = colors[1]),
      (themeConfig.colors.warning = colors[2]),
      (themeConfig.colors.danger = colors[3]),
      (themeConfig.colors.info = colors[4])
  }
}

// 全屏
const fullscreen = ref(false)
const fullScreenToggle = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    document.body.requestFullscreen.call(document.body)
  }
  fullscreen.value = !fullscreen.value
}
</script>

<style lang="scss" scoped>
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
}

// 主题
.theme-color {
  gap: 10px;
  dl {
    width: 100%;
    padding: 5px;
    display: flex;
    gap: 5px;
    border: var(--el-border-color-light) 2px solid;
    border-radius: 4px;
    cursor: pointer;
    dt {
      height: 30px;
      width: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    dd {
      height: 30px;
      flex: 1;
    }
    &:hover {
      border: var(--el-color-primary) 2px solid;
      color: var(--el-color-primary);
      font-weight: bold;
    }
  }
  .active {
    border: var(--el-color-primary) 2px solid;
    color: var(--el-color-primary);
    font-weight: bold;
  }
  .custom {
    dt,
    dd {
      height: auto;
    }
    dd {
      text-align: center;
      font-size: 12px;
      display: flex;
      gap: 2px;
      flex-direction: column;
    }
  }
}
</style>
