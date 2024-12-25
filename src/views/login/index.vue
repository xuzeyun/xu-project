<template>
  <div class="login-container">
    <div class="login-wrap">
      <div class="login-title">
        <span>欢迎登录</span><br />
        <h1>融通仓储管理系统<b>[ V1.0.0 ]</b></h1>
      </div>
      <div class="login-box animate__animated animate__bounceInRight">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form" size="large" auto-complete="on" label-position="left">
          <div class="title-container">
            <h3 class="title">欢迎登录</h3>
          </div>
          <el-form-item prop="username">
            <el-input ref="username" v-model="loginForm.username" placeholder="" name="username" type="text" tabindex="1" auto-complete="on">
              <template #prepend>
                <!-- <font-awesome-icon icon="user"></font-awesome-icon> -->
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="" name="password" tabindex="2" auto-complete="on" @keyup.enter="handleLogin">
              <template #prepend>
                <!-- <font-awesome-icon icon="lock"></font-awesome-icon> -->
              </template>
              <template #append>
                <!-- <font-awesome-icon icon="eye" @click="showPassword" style="cursor: pointer" :style="passwordType ? '' : 'color: var(--el-color-primary)'"></font-awesome-icon> -->
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="code" class="code">
            <el-input ref="code" style="flex: 1" v-model="loginForm.code" placeholder="" name="code" type="text" tabindex="3" auto-complete="on">
              <template #prepend>
                <!-- <font-awesome-icon icon="shield"></font-awesome-icon> -->
              </template>
            </el-input>
            <el-image style="width: 100px; height: 100%; border-radius: 4px" :src="codeUrl" @click="GetCode" />
          </el-form-item>

          <el-form-item prop="isSave">
            <el-checkbox v-model="loginForm.isSave" label="记录登录信息" />
          </el-form-item>

          <el-button :loading="loading" type="primary" style="width: 100%; margin-top: 20px; margin-bottom: 30px" @click.prevent="handleLogin">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
import { setToken } from '@/utils/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const { $Api } = getCurrentInstance().appContext.config.globalProperties

onMounted(() => {
  // GetCode()
})

// 获取验证码
const GetCode = () => {
  // axios.get('/api/captcha').then(res => {
  //   codeUrl.value = res.data.data.captchaImg
  //   loginForm.token = res.data.data.token
  // })
}
// 验证码base64图片
const codeUrl = ref('')

// 登录模型
const loginForm = reactive({
  username: '',
  password: '',
  code: '',
  token: ''
})
// 登录验证模型
const loginRules = reactive({
  username: [{ required: true, trigger: 'change' }],
  password: [{ required: true, trigger: 'change' }],
  code: [{ required: true, trigger: 'change' }]
})

const loginFormRef = ref(null)
const loading = ref(false)
const passwordType = ref('password')
const redirect = ref(null)

const showPassword = () => {
  passwordType.value = passwordType.value ? '' : 'password'
}

// 登录
const handleLogin = () => {
  loginFormRef.value.validate(valid => {
    if (valid) {
      loading.value = true
      $Api.get('/api/login', loginForm).then(res => {
        ElMessage.success(res.msg)
        loading.value = false
        router.push('/home')
        setToken(res.result.token)
        getInfo()
      })
    } else {
      console.log('error submit!!')
      return false
    }
  })
}

const getInfo = async () => {
  let resInfo = await $Api.get('/api/getInfo', loginForm)

  let resRouters = await $Api.get('/api/getRouters', loginForm)
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  background-image: url(@/assets/images/login/login_bg.png);
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-wrap {
    width: 1200px;
    display: flex;
    overflow: hidden;
    justify-content: right;
    align-items: center;
  }
  .login-title {
    color: #fff;
    flex: 1;
    height: 280px;
    h1 {
      font-weight: bold;
      font-size: 52px;
      b {
        font-size: 20px;
        margin-left: 20px;
      }
    }
    span {
      font-weight: lighter;
      font-size: 26px;
    }
  }

  .login-box {
    backdrop-filter: saturate(100%) blur(8px) brightness(100%);
    background: rgba(255, 255, 255, 0);
    border: 1px solid rgba(255, 255, 255, 0.5);
    padding: 50px;
    // width:
    width: 300;
    // height: 280px;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    // border: solid 1px #ddd;
    .login-form {
      display: flex;
      flex-direction: column;
      .title {
        text-align: center;
        margin-bottom: 30px;
        font-size: 24px;
        // letter-spacing: 15px;
        color: #fff;
        // font-weight: bold;
      }
      .svg-container {
        color: var(--el-text-color-disabled);
      }
    }
  }
}
.code {
  ::v-deep(.el-form-item__content) {
    gap: 10px;
  }
}
</style>
