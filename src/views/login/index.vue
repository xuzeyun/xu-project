<template>
  <div class="login-container">
    <div class="login-box">
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form" size="large" auto-complete="on" label-position="left">
        <div class="title-container">
          <h3 class="title">登录</h3>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <!-- <svg-icon icon-class="user" /> -->
            <font-awesome-icon icon="user"></font-awesome-icon> 用户名
          </span>
          <el-input ref="username" v-model="loginForm.username" placeholder="" name="username" type="text" tabindex="1" auto-complete="on" />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <font-awesome-icon icon="lock"></font-awesome-icon> 密码
            <!-- <svg-icon icon-class="password" /> -->
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder=""
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          >
            <template #append>
              <font-awesome-icon icon="eye"></font-awesome-icon>
            </template>
          </el-input>
          <!-- <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span> -->
        </el-form-item>

        <el-button :loading="loading" type="primary" style="width: 100%; margin-top: 20px; margin-bottom: 30px" @click.native.prevent="handleLogin">登录</el-button>

        <!-- <div class="tips">
        <span style="margin-right: 20px">username: admin</span>
        <span> password: any</span>
      </div> -->
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const loginForm = reactive({
  username: '',
  password: ''
})

const loginRules = reactive({
  username: [{ required: true, trigger: 'blur' }],
  password: [{ required: true, trigger: 'blur' }]
})

const loginFormRef = ref(null)
const loading = ref(false)
const passwordType = ref('password')
const redirect = ref(null)

const showPwd = () => {
  if (passwordType.value === 'password') {
    passwordType.value = ''
  } else {
    passwordType.value = 'password'
  }
  // this.$nextTick(() => {
  //   this.$refs.password.focus()
  // })
}
const handleLogin = () => {
  // this.$refs.loginForm.validate(valid => {
  //   if (valid) {
  //     this.loading = true
  //     this.$store
  //       .dispatch('user/login', this.loginForm)
  //       .then(() => {
  //         this.$router.push({ path: this.redirect || '/' })
  //         this.loading = false
  //       })
  //       .catch(() => {
  //         this.loading = false
  //       })
  //   } else {
  //     console.log('error submit!!')
  //     return false
  //   }
  // })
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  height: 100%;
  justify-content: right;
  align-items: center;
  background-image: url(@/assets/images/login/login_page_bg.png);
  background-size: cover;
  background-repeat: no-repeat;
  padding-right: 10%;

  .login-box {
    backdrop-filter: saturate(100%) blur(2px);
    background: rgba(255, 255, 255, 0.4);
    padding: 50px;
    // width:
    width: 20%;
    height: 400px;
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
        letter-spacing: 15px;
      }
      .svg-container {
        color: var(--el-text-color-disabled);
      }
    }
  }
}
</style>
