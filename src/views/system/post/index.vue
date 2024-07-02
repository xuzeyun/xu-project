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
    <el-row style="margin-bottom: 10px">
      <!-- <el-button type="primary" @click="dialogVisible = true"><font-awesome-icon class="icon" icon="add" />新增</el-button>
      <el-button type="danger" @click="dialogVisible = true"><font-awesome-icon class="icon" icon="trash-alt" />批量删除</el-button> -->
    </el-row>
    <el-row style="margin-bottom: 10px">
      <BaseTable border></BaseTable>
    </el-row>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import BaseTable from '@/components/BaseTable/index.jsx'
// import { ElMessageBox } from 'element-plus'

// 查询表单
const queryForm = reactive({
  mc: ''
})

// 提交
const queryHandle = () => {
  console.log('submit!')
}
</script>

<style lang="scss" scoped></style>
