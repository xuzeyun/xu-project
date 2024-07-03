<template>
  <div>
    <el-row>
      <el-form ref="formRef" :inline="true" :model="queryForm">
        <el-form-item label="" prop="mc">
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
    <BaseTable v-bind="tableConfig"></BaseTable>
  </div>
</template>

<script setup>
import { reactive, ref, getCurrentInstance } from 'vue'
import BaseTable from '@/components/BaseTable/index.jsx'
const { $Api } = getCurrentInstance().appContext.config.globalProperties
// import { ElMessageBox } from 'element-plus'

// 查询表单
const queryForm = reactive({
  mc: ''
})

const tableConfig = reactive({
  page: 1,
  limit: 10,
  total: 0,
  sizes: [10, 20],
  isPage: true,
  // <el-table>上挂载的属性
  config: {
    border: true,
    stripe: true,
    // size: 'small',
    // data: [
    //   { mc: 111, zt: 111 },
    //   { mc: 111, zt: 111 },
    //   { mc: 111, zt: 111 },
    //   { mc: 111, zt: 111 },
    //   { mc: 111, zt: 111 },
    // ]
  },
  // 获取表格数据方法
  getTableData: async (page, limit, sortObj, queryObj) => {
    const params = {
      _page: page,
      _limit: limit,
      ...sortObj,
      ...queryObj
    }
    console.log(params, 'params');
    let res = await $Api.get('/api/getPostList', params);
    return {
      list: res,
      page: 1,
      limit: 10,
      total: 4
    };
  },
  // 表格列配置
  columns: [
    { label: '岗位名称', prop: 'postName'},
    { label: '岗位编码', prop: 'postCode'},
    { label: '排序', prop: 'postSort'},
    { label: '状态', prop: 'status'},
    { label: '创建时间', prop: 'createTime'},
  ]
})

// 提交
const queryHandle = () => {
  console.log('submit!')
}
</script>

<style lang="scss" scoped></style>
