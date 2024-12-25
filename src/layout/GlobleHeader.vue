<template>
  <div class="header-wrap">
    <div class="header-col left">
      <div class="header-li title" v-if="logoAlign === 'left'">
        <div class="logo"></div>
        <h1>{{ curSystemName }}</h1>
        <span class="version">[ V1.0.0 ]</span>
      </div>
      <div class="header-li datetime-version" v-if="logoAlign === 'center'">
        <div class="date-time">
          {{ dateTime }}
        </div>
        <span class="version">版本：[ V1.0.0 ]</span>
      </div>
    </div>

    <div class="header-col center">
      <div class="header-li title" v-if="logoAlign === 'center'" :style="logoAlign === 'center' ? 'margin-left: -36px;' : ''">
        <div class="logo"></div>
        <h1>{{ curSystemName }}</h1>
      </div>
    </div>

    <div class="header-col right">
      <!-- 系统切换 -->
      <div class="header-li">
        <el-dropdown>
          <el-button link><RiRecycleLine class="g-icon" /></el-button>
          <template #dropdown>
            <!-- <el-dropdown-menu>
              <el-dropdown-item @click="systemChange('态势展现系统')" disabled>态势展现系统</el-dropdown-item>
              <el-dropdown-item @click="systemChange('计划统筹管理系统')">计划统筹管理系统</el-dropdown-item>
              <el-dropdown-item @click="systemChange('合同管理系统')" disabled>合同管理系统</el-dropdown-item>
              <el-dropdown-item @click="systemChange('接收管理系统')" disabled>接收管理系统</el-dropdown-item>
              <el-dropdown-item @click="systemChange('销毁管理系统')">销毁管理系统</el-dropdown-item>
              <el-dropdown-item @click="systemChange('专项任务管理系统')" disabled>专项任务管理系统</el-dropdown-item>
              <el-dropdown-item @click="systemChange('营区内处置系统')">营区内处置系统</el-dropdown-item>
              <el-dropdown-item @click="systemChange('数据支撑平台')">数据支撑平台</el-dropdown-item>
            </el-dropdown-menu> -->
            <el-dropdown-menu>
              <el-dropdown-item v-for="(item, index) in _appStore.menuAllData" :key="index" @click="sysChange(item)">{{ item.name }}</el-dropdown-item>
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
              <el-dropdown-item @click="themeToggle('')"><RiSunLine class="g-icon-r" />默认</el-dropdown-item>
              <el-dropdown-item @click="themeToggle('dark')"><RiMoonLine class="g-icon-r" />暗黑</el-dropdown-item>
              <el-dropdown-item @click="themeToggle('tech')"><RiCpuLine class="g-icon-r" />科技</el-dropdown-item>
              <el-dropdown-item @click="themeToggle('forest')"><RiLeafLine class="g-icon-r" />丛林</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <!-- 系统设置 -->
      <div class="header-li">
        <el-button link><RiSettingsLine class="g-icon" @click="paletteOpen" /></el-button>
      </div>
      <div class="header-li">
        <el-dropdown>
          <el-avatar size="small"><RiUser3Fill class="g-icon" style="font-size: 12px" /></el-avatar>
          <!-- <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" /> -->
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
      <h4><RiLayoutTop2Line class="g-icon-r" />头部标题位置</h4>
      <el-row>
        <el-radio-group v-model="settings.logoAlign">
          <el-radio-button label="居左展示" value="left" />
          <el-radio-button label="居中展示" value="center" />
        </el-radio-group>
      </el-row>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawerClose">取消</el-button>
          <el-button type="primary" @click="drawerConfirm"><RiSave3Line class="g-icon-r" />保存</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed, getCurrentInstance } from 'vue'
import {
  RiSunLine,
  RiMoonLine,
  RiFullscreenLine,
  RiFullscreenExitLine,
  RiUserLine,
  RiTShirt2Line,
  RiLogoutBoxLine,
  RiExchangeBoxLine,
  RiPaletteLine,
  RiSave3Line,
  RiSettingsLine,
  RiRecycleLine,
  RiCpuLine,
  RiLeafLine,
  RiLayoutTop2Line,
  RiUser3Fill
} from '@remixicon/vue'
// import { Theme, getTheme, setTheme } from '../utils/theme'
// import { useDark, useToggle } from '@vueuse/core'
const { $Api } = getCurrentInstance().appContext.config.globalProperties
import { format } from 'date-fns'
import { appStore } from '@/stores/app.js'
import { useRouter } from 'vue-router'
import { removeToken } from '@/utils/auth'
const _appStore = appStore()
const router = useRouter()

// @editor: rt@xzy @description: 菜单数据导入, @time: 2024/09/04 10:13:49
// // 开发者菜单
// import devOtherMenu from '@/router/devMenu.js'

onMounted(() => {
  // 获取时间
  getCurTime()
  // 主题切换
  themeToggle(_appStore.theme)
  // 设置logo位置
  settings.logoAlign = _appStore.logoAlign
  // 系统菜单
  // _appStore.setMenuAllData(jhtcglxtMenu)

  // getChildNode(jhtcglxtMenu)
})

// 获得子节点（递归）
const getChildNode = arr => {
  if (arr[0] && arr[0].children) {
    getChildNode(arr[0].children)
  } else {
    router.push(arr[0].path)
    return
  }
}

// 退出登录
const exitHandle = () => {
  $Api.get('/sys/logout').then(res => {
    // 清除token
    removeToken(res.data.token)
    // 清除用户数据

    // 退出后跳转至登录页面
    router.push('/login')
  })
}

// const isDark = useDark()
// const toggleDark = useToggle(isDark)

/**
 * ==================================================================
 * @areaname:			主题切换
 * @description:		实现多主题切换
 * ------------------------------------------------------------------
 * @author: rt@xzy		@time: 2024/08/28 10:28:08
 * ==================================================================
 */
const themeToggle = (flag: string) => {
  document.getElementsByTagName('html')[0].setAttribute('class', flag)
  _appStore.setTheme(flag)
}

/**
 * ==================================================================
 * @areaname:			系统设置
 * @description:		系统布局样式自定义
 * ------------------------------------------------------------------
 * @author: rt@xzy		@time: 2024/08/28 10:23:29
 * ==================================================================
 */
const drawer = ref(false)
// logo位置展示
const settings = reactive({
  logoAlign: 'left'
})
const logoAlign = ref(_appStore.logoAlign)
// 系统设置窗口打开
const paletteOpen = () => {
  drawer.value = true
}
// 系统设置窗口关闭
const drawerClose = () => {
  drawer.value = false
}
// 系统设置提交
const drawerConfirm = () => {
  // let data = { colors: themeConfig.colors }
  // setTheme(data)
  logoAlign.value = settings.logoAlign
  _appStore.setLogoAlign(settings.logoAlign)
  drawer.value = false
}

/**
 * ==================================================================
 * @areaname:			系统窗口全屏
 * @description:		全屏非全屏切换
 * ------------------------------------------------------------------
 * @author: rt@xzy		@time: 2024/08/28 10:25:42
 * ==================================================================
 */
// 窗口全屏
const fullscreen = ref(false)
const fullScreenToggle = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => alert(`Error attempting to enable full-screen mode: ${err.message}`))
  } else {
    document.exitFullscreen()
  }
  fullscreen.value = !fullscreen.value
}

/**
 * ==================================================================
 * @areaname:			当前时间展示
 * @description:		显示当前 年月日时分秒
 * ------------------------------------------------------------------
 * @author: rt@xzy		@time: 2024/08/28 10:26:36
 * ==================================================================
 */
// 时间展示
const dateTime = ref('0000-00-00 00:00:00')
const getCurTime = () => {
  setInterval(() => {
    dateTime.value = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  }, 1000)
}

/**
 * ==================================================================
 * @areaname:			系统切换
 * @description:		系统切换
 * ------------------------------------------------------------------
 * @author: rt@xzy		@time: 2024/09/02 15:57:14
 * ==================================================================
 */
const curSystemName = ref(_appStore.appName)
// const systemChange = systemName => {
//   curSystemName.value = systemName
//   _appStore.setAppName(systemName)

//   // 设置系统菜单
//   if (systemName === '计划统筹管理系统') {
//     _appStore.setMenuAllData(jhtcglxtMenu)
//   } else if (systemName === '数据支撑平台') {
//     _appStore.setMenuAllData(sjzcptMenu)
//   } else if (systemName === '销毁管理系统') {
//     _appStore.setMenuAllData(xhglxtMenu)
//   } else if (systemName === '营区内处置系统') {
//     _appStore.setMenuAllData(yqnczxtMenu)
//   }

//   // 打开第一个菜单
//   getChildNode(_appStore.menuData)
// }

// 系统切换
const sysChange = sysInfo => {
  // 存储系统名称
  curSystemName.value = sysInfo.name || '数据监测系统'
  _appStore.setAppName(sysInfo.name || '数据监测系统')

  // console.log(sysInfo);
  // console.log(sysInfo, 'sysInfo-----------------');
  _appStore.setMenuData(sysInfo)
  getChildNode(sysInfo.children)
}
</script>

<style lang="scss" scoped>
.header-wrap {
  height: 100%;
  display: flex;
  .header-col {
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1;
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
    .datetime-version {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;
      gap: 2px;
      .date-time {
        color: var(--el-color-primary);
        font-family: timeFont;
        font-size: 18px;
      }
      .version {
        font-size: 12px;
        color: var(--el-color-info);
      }
    }
  }
  .left .right {
    width: 300px;
  }
  .left {
  }
  .center {
    justify-content: center;
  }
  .right {
    justify-content: right;
    .header-li {
      padding: 0 6px;
    }
  }
}

// 主题
// .theme-color {
//   gap: 10px;
//   dl {
//     width: 100%;
//     padding: 5px;
//     display: flex;
//     gap: 5px;
//     border: var(--el-border-color-light) 2px solid;
//     border-radius: 4px;
//     cursor: pointer;
//     dt {
//       height: 30px;
//       width: 200px;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//     }
//     dd {
//       height: 30px;
//       flex: 1;
//     }
//     &:hover {
//       border: var(--el-color-primary) 2px solid;
//       color: var(--el-color-primary);
//       font-weight: bold;
//     }
//   }
//   .active {
//     border: var(--el-color-primary) 2px solid;
//     color: var(--el-color-primary);
//     font-weight: bold;
//   }
//   .custom {
//     dt,
//     dd {
//       height: auto;
//     }
//     dd {
//       text-align: center;
//       font-size: 12px;
//       display: flex;
//       gap: 2px;
//       flex-direction: column;
//     }
//   }
// }
</style>
