import path from 'path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

// Vue & Jsx
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// elementUiPlus 实现自动导入功能的兄弟组件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig({
  publicDir: 'public',
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': pathSrc
    }
  },
  // 前端服务
  server: {
    host: '0.0.0.0',
    port: 9300,
    open: true, // 启动后在浏览器中打开
    proxy: {
      // 字符串简写写法：http://localhost:5173/foo -> http://localhost:4567/foo
      // '/foo': 'http://localhost:4567',
      // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  // 插件
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],

      resolvers: [
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        ElementPlusResolver(),

        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon'
        })
      ],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts')
    }),
    Components({
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: []
        }),
        // 自动导入 Element Plus 组件
        ElementPlusResolver()
      ]
    }),
    Icons({
      autoInstall: true
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // charest:false,
        additionalData: `
          @use '@/styles/theme/theme.scss';
          @import '@/styles/mixin.scss';
          @import '@/styles/variables.scss';
        `
      }
    }
  }
})
