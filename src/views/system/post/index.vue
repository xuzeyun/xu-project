<template>
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
      <el-button size="small" type="primary" @click="addHandle"><font-awesome-icon class="icon" icon="add" />新增</el-button>
      <el-button size="small" type="danger" @click="dialogVisible = true"><font-awesome-icon class="icon" icon="trash" />删除</el-button>
      <el-button size="small" type="warning" @click="dialogVisible = true"><font-awesome-icon class="icon" icon="file-export" />导出</el-button>
    </el-col>
  </el-row>
  <!-- 表格组件 -->
  <BaseTable ref="tableRef" v-bind="tableConfig">
    <template #status="scope">
      <el-tag v-if="scope.row.status === '0'" type="success">正常</el-tag>
      <el-tag v-else-if="scope.row.status === '1'" type="danger">停用</el-tag>
    </template>
    <template #operation="scope">
      <el-button size="small" type="primary" @click="editHandle(scope.row, scope.$index)">
        <font-awesome-icon class="icon" icon="edit" />
      </el-button>
      <el-button size="small" type="danger" @click="deleteHandle(scope.row, scope.$index)">
        <font-awesome-icon class="icon" icon="trash" />
      </el-button>
    </template>
  </BaseTable>

  <!-- 弹窗组件 -->
  <BaseDialog ref="dialogRef" v-bind="dialogConfig">
    <!-- 表单组件 -->
    <BaseForm ref="addFormRef" v-bind="addFormConfig"> </BaseForm>

    <template #footer>
      <el-button type="primary" @click="curSaveType === 1 ? addSubmit() : editSubmit()">确认</el-button>
      <el-button @click="dialogConfig.show = false">取消</el-button>
    </template>
  </BaseDialog>
</template>

<script setup>
import { reactive, ref, getCurrentInstance, onMounted, nextTick } from 'vue'
const { $Api } = getCurrentInstance().appContext.config.globalProperties
import { ElMessage, ElMessageBox } from 'element-plus'
import { format } from 'date-fns'

// 当前保存类型（1新增2修改3查看）
const curSaveType = ref(1)
// 按钮通用loading
const loading = ref(false)

// 表单配置
const formRef = ref(null)
const formConfig = reactive({
  config: {
    size: '',
    inline: true
  },
  data: {
    postName: '',
    postCode: '',
    status: ''
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
    limit: 10,
    total: 0,
    sizes: [10, 20]
  },
  // 表格配置
  config: {
    border: true,
    stripe: true,
    size: '',
    showOverflowTooltip: true
    // tableLayout: 'auto'
    // data: []
  },
  // 请求数据
  getTableData: async (page, limit, sortObj, queryObj) => {
    const params = {
      _page: page,
      _per_page: limit,
      ...formRef.value.formData,
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
    { label: '排序', prop: 'postSort', align: 'right', headerAlign: 'left' },
    { label: '状态', prop: 'status', align: 'center', headerAlign: 'left' },
    { label: '创建时间', prop: 'createTime', align: 'right', headerAlign: 'left' },
    { label: '备注', prop: 'remark' },
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
const dialogRef = ref(null)
const dialogConfig = reactive({
  show: false,
  config: {
    title: '新增',
    width: '600',
    draggable: true,
    destroyOnClose: true,
    // fullscreen: true,
    onClose: () => {
      dialogConfig.show = false
    }
  }
})

// 新增表单
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
    remark: '',
    createTime: ''
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
    { prop: 'remark', label: '备注', span: 24, itemRender: { placeholder: '备注', type: 'textarea', name: 'ElInput' } }
  ]
})

// 新增
const addHandle = () => {
  curSaveType.value = 1
  // 新增数据初始化
  dialogRef.value.config.title = '新增'
  dialogConfig.show = true
}
const addSubmit = async () => {
  let flag = await addFormRef.value.submit()

  if (!flag) return
  let data = addFormRef.value.formData
  let res = await $Api.post('/api/getPostList', {
    ...data,
    createTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  })
  if (res && res.id) {
    ElMessage.success('操作成功')
  } else {
    ElMessage.danger('操作失败')
  }
  dialogConfig.show = false

  // 重新加载表格（新增因为增加了数据所以重新加载比较合理）
  tableRef.value.reload(true)
}

// 修改
const curEditIndex = ref(0)
const editHandle = (row, index) => {
  curEditIndex.value = index
  curSaveType.value = 2
  // 修改数据初始化
  // addFormConfig.data = { ...row }
  dialogConfig.show = true
  dialogRef.value.config.title = '修改'

  nextTick(() => {
    addFormRef.value.formData.id = row.id
    Object.keys(addFormRef.value.formData).forEach(key => {
      addFormRef.value.formData[key] = row[key]
    })
  })
}
const editSubmit = async () => {
  // 表单验证
  let flag = await addFormRef.value.submit()
  if (!flag) return
  let data = addFormRef.value.formData
  if(!data.createTime) data.createTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  let res = await $Api.patchById('/api/getPostList', data.id, {
    ...data
  })

  if (res && res.id) {
    tableRef.value.tableData[curEditIndex.value] = { ...data }
    ElMessage.success('操作成功')
  } else {
    ElMessage.danger('操作失败')
  }
  dialogConfig.show = false
}

// 删除
const deleteHandle = async (row, index) => {
  await ElMessageBox.confirm('删除该条目。是否确认?', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      let res = await $Api.deleteById('/api/getPostList', row.id)
      if (res && res.id) {
        tableRef.value.tableData.splice(index, 1)
        ElMessage.success('操作成功')
      } else {
        ElMessage.danger('操作失败')
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消'
      })
    })
}
</script>

<style lang="scss" scoped></style>
