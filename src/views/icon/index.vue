<template>
  <div>
    <el-row>
      <el-form ref="formRef" :inline="true" :model="queryForm">
        <el-form-item label="名称" prop="mc">
          <el-input v-model="queryForm.mc" placeholder="请输入名称" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryHandle"><font-awesome-icon class="icon" icon="search" />查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <!-- <el-card :data="cardData" shadow="hover">
        <i class="fa-solid fa-font-awesome"></i>
        <p>fa-font-awesome</p>
      </el-card> -->
      <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"> -->
      <el-card class="icon-card" v-for="(module, index) in modules" :key="index" >
        <el-icon :class="module.icon"></el-icon>
        <!-- <div slot="header" class="clearfix"> -->
          <!-- <span>{{ module.name }}</span> -->
        <!-- </div> -->
        <!-- <p>{{ module.content }}</p> -->
        <p>{{ module.name }}</p>
      </el-card>
    </el-row>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import {fas} from '@fortawesome/free-brands-svg-icons/index.js'

onMounted(() => {
  console.log(fas, 'fas');
});

// 查询表单
const queryForm = reactive({
  mc: ''
})

// const cardData = [
//   {
//     icon: '1',
//     mc: '2 '
//   }
// ]
  const modules = [
      { name: 'user', icon: 'fas fa-user' },
      { name: 'cog', icon: 'fas fa-cog' },
      { name: 'envelope', icon: 'fas fa-envelope' }
    ]






</script>

<style lang="scss" scoped>
.icon-card{
margin-right: 20px;
text-align: center;
p{
  margin:10px auto 0px auto;
}
}
</style>
