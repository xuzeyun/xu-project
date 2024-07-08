<template>
  <div>
    <el-row style="margin-bottom: 10px">
      <el-col :span="12">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>岗位管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row class="g-tools">
      <el-col class="g-forms">
        <BaseForm ref="formRef" v-bind="formConfig">
          <template #btns>
            <el-button type="primary" title="查询" @click="queryHandle"><font-awesome-icon icon="search" /></el-button>
            <el-button type="" title="重置" @click="resetHandle"><font-awesome-icon icon="repeat" /></el-button>
          </template>
        </BaseForm>
      </el-col>
      <el-col class="g-btns">
        <el-button size="small" type="primary" @click="dialogVisible = true"><font-awesome-icon class="icon" icon="add" />新增</el-button>
        <el-button size="small" type="success" @click="dialogVisible = true"><font-awesome-icon class="icon" icon="edit" />修改</el-button>
        <el-button size="small" type="danger" @click="dialogVisible = true"><font-awesome-icon class="icon" icon="trash" />删除</el-button>
        <el-button size="small" type="warning" @click="dialogVisible = true"><font-awesome-icon class="icon" icon="file-export" />导出</el-button>
      </el-col>
    </el-row>
    <BaseTable ref="tableRef" v-bind="tableConfig"></BaseTable>
  </div>
</template>

<script setup>
import { reactive, ref, getCurrentInstance } from 'vue'
import BaseTable from '@/components/BaseTable/index.jsx'
import BaseForm from '@/components/BaseForm/index.jsx'
const { $Api } = getCurrentInstance().appContext.config.globalProperties
// import { ElMessageBox } from 'element-plus'

const formRef = ref(null)
const formConfig = reactive({
  config: {
    size: '',
    inline: true
  },
  data: {
    postName: '',
    postCode: ''
  },
  item: [
    { prop: 'postName', label: '岗位名称', itemRender: { name: 'ElInput', clearable: true } },
    { prop: 'postCode', label: '岗位编码', itemRender: { name: 'ElInput' } }
  ]
})

const tableRef = ref(null)
const tableConfig = reactive({
  // 分页配置
  page: {
    show: true,
    page: 1,
    limit: 10,
    total: 0,
    sizes: [10, 20]
  },
  // 表格配置
  config: {
    border: true,
    stripe: true,
    size: '',
    tableLayout: 'auto'
    // data: []
  },
  // 请求数据
  getTableData: async (page, limit, sortObj, queryObj) => {
    const params = {
      _page: page,
      _limit: limit,
      ...sortObj,
      ...queryObj
    }
    console.log(params, 'params')
    let res = await $Api.get('/api/getPostList', params)
    return {
      list: res,
      total: 16
    }
  },
  // 表格列配置
  columns: [
    { label: '岗位名称', prop: 'postName' },
    { label: '岗位编码', prop: 'postCode' },
    { label: '排序', prop: 'postSort' },
    { label: '状态', prop: 'status' },
    { label: '创建时间', prop: 'createTime' }
  ]
})

// 提交
const queryHandle = () => {
  tableRef.value.reload(true)
}
// 重置
const resetHandle = () => {
  formRef.value.reset()
  tableRef.value.reload(true)
}
</script>

<style lang="scss" scoped></style>
