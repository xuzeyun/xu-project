<template>
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
      <!-- 表单组件 -->
      <BaseForm ref="formRef" v-bind="formConfig">
        <template #btns>
          <el-button type="primary" title="查询" @click="queryHandle"><font-awesome-icon icon="search" /></el-button>
          <el-button type="" title="重置" @click="resetHandle"><font-awesome-icon icon="repeat" /></el-button>
        </template>
      </BaseForm>
    </el-col>
    <el-col class="g-btns">
      <el-button size="small" type="primary" @click="dialogConfig.show = true"><font-awesome-icon class="icon" icon="add" />新增</el-button>
      <!-- <el-button size="small" type="success" @click="dialogVisible = true"><font-awesome-icon class="icon" icon="edit" />修改</el-button> -->
      <el-button size="small" type="danger" @click="dialogVisible = true"><font-awesome-icon class="icon" icon="trash" />删除</el-button>
      <el-button size="small" type="warning" @click="dialogVisible = true"><font-awesome-icon class="icon" icon="file-export" />导出</el-button>
    </el-col>
  </el-row>
  <!-- 表格组件 -->
  <BaseTable ref="tableRef" v-bind="tableConfig">
    <template #operation>
      <el-button size="small" type="primary">
        <font-awesome-icon class="icon" icon="edit" />
      </el-button>
      <el-button size="small" type="danger">
        <font-awesome-icon class="icon" icon="trash" />
      </el-button>
    </template>
  </BaseTable>

  <!-- 弹窗组件 -->
  <BaseDialog v-bind="dialogConfig">
    <!-- 表单组件 -->
    <BaseForm ref="addFormRef" v-bind="addFormConfig"> </BaseForm>

    <template #footer>
      <el-button type="primary" @click="addSubmit">确认</el-button>
      <el-button @click="dialogConfig.show = false">取消</el-button>
    </template>
  </BaseDialog>
</template>

<script setup>
import { reactive, ref, getCurrentInstance, onMounted } from 'vue'
const { $Api } = getCurrentInstance().appContext.config.globalProperties
// import { ElMessageBox } from 'element-plus'

// 表单配置
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
    { prop: 'postName', label: '', itemRender: { placeholder: '岗位名称', name: 'ElInput', clearable: true } },
    { prop: 'postCode', label: '', itemRender: { placeholder: '岗位编码', name: 'ElInput' } },
    {
      prop: 'status',
      label: '',
      itemRender: {
        placeholder: '状态',
        name: 'ElSelect',
        options: [
          { label: '正常', value: '0' },
          { label: '停用', value: '1' }
        ]
      }
    }
  ]
})

// 表格配置
const tableRef = ref(null)
const tableConfig = reactive({
  // 分页配置
  page: {
    show: true,
    page: 1,
    limit: 2,
    total: 0,
    sizes: [2, 20]
  },
  // 表格配置
  config: {
    border: true,
    stripe: true,
    size: 'small',
    tableLayout: 'auto'
    // data: []
  },
  // 请求数据
  getTableData: async (page, limit, sortObj, queryObj) => {
    const params = {
      _page: page,
      _per_page: limit,
      ...sortObj,
      ...queryObj
    }
    console.log(params, 'params')
    let res = await $Api.get('/api/getPostList', params)
    return {
      list: res.data,
      total: res.items
    }
  },
  // 表格列配置
  columns: [
    { label: '岗位名称', prop: 'postName' },
    { label: '岗位编码', prop: 'postCode' },
    { label: '排序', prop: 'postSort' },
    { label: '状态', prop: 'status' },
    { label: '创建时间', prop: 'createTime' },
    { label: '备注', prop: 'bz' },
    { label: '操作', prop: 'operation', fixed: 'right', width: '160', align: 'center' }
  ]
})

// 提交
const queryHandle = () => {
  tableRef.value.reload(true)
}
// 重置
const resetHandle = () => {
  // 重置表单
  formRef.value.reset()
  // 重新加载表格
  tableRef.value.reload(true)
}

// 弹窗配置
const dialogConfig = reactive({
  show: false,
  config: {
    title: '新增',
    width: '600',
    draggable: true,
    // fullscreen: true,
    onClose: () => {
      dialogConfig.show = false
    }
  }
})

// 新增窗口
const addFormRef = ref(null)
const addFormConfig = reactive({
  config: {
    size: '',
    labelWidth: 80,
    inline: false,
    rules: {
      postName: [
        { required: true, message: '请输入岗位名称', trigger: 'blur' },
        { min: 2, max: 10, message: '2~10个字符', trigger: 'blur' }
      ],
      postCode: [
        { required: true, message: '请输入岗位编码', trigger: 'blur' },
        { min: 2, max: 20, message: '2~20个字符', trigger: 'blur' }
      ]
    }
  },
  data: {
    postName: '',
    postCode: '',
    postSort: 1,
    status: '0',
    bz: ''
  },
  item: [
    { prop: 'postName', label: '岗位名称', span: 12, itemRender: { placeholder: '岗位名称', name: 'ElInput', clearable: true } },
    { prop: 'postCode', label: '岗位编码', span: 12, itemRender: { placeholder: '岗位编码', name: 'ElInput', clearable: true } },
    { prop: 'postSort', label: '岗位排序', span: 12, itemRender: { placeholder: '岗位编码', name: 'ElInputNumber', min: 1, max: 10 } },
    {
      prop: 'status',
      label: '状态',
      span: 12,
      itemRender: {
        placeholder: '状态',
        name: 'ElSelect',
        options: [
          { label: '正常', value: '0' },
          { label: '停用', value: '1' }
        ]
      }
    },
    { prop: 'bz', label: '备注', span: 24, itemRender: { placeholder: '备注', type: 'textarea', name: 'ElInput' } }
  ]
})

const addSubmit = async () => {
  let flag = await addFormRef.value.submit()

  if (!flag) return
  let data = addFormRef.value.formData
  let res = await $Api.post('/api/getPostList', data)
  dialogConfig.show = false

  // 重新加载表格
  tableRef.value.reload(true)
}
</script>

<style lang="scss" scoped></style>
