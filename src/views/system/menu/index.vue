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
      <el-button size="small" type="primary" @click="addHandle(scope.row, scope.$index)">
        <font-awesome-icon class="icon" icon="add" />
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
import { reactive, ref, getCurrentInstance, onMounted, nextTick, computed } from 'vue'
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
    menuName: '',
    status: ''
  },
  item: [
    { prop: 'menuName', label: '菜单名称', itemRender: { placeholder: '菜单名称', name: 'ElInput', clearable: true } },
    {
      prop: 'status',
      label: '状态',
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
    let res = await $Api.get('/api/MenuList', params)
    return {
      list: res.data,
      total: res.items
    }
  },
  // 表格列配置
  columns: [
    { label: '菜单名称', prop: 'menuName' },
    { label: '图标', prop: 'icon' },
    { label: '路由地址', prop: 'path' },
    { label: '组件路径', prop: 'component', align: 'right', headerAlign: 'left' },
    { label: '状态', prop: 'status', align: 'center', headerAlign: 'left' },
    { label: '排序', prop: 'orderNum', align: 'right', headerAlign: 'left' },
    { label: '权限标识', prop: 'perms', align: 'right', headerAlign: 'left' },
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
    width: '800',
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
const curMenuType = ref('0')
const addFormConfig = reactive({
  config: {
    size: '',
    labelWidth: 80,
    inline: false,
    rules: {
      menuName: [
        { required: true, message: '请输入', trigger: 'blur' },
        { min: 2, max: 10, message: '2~10个字符', trigger: 'blur' }
      ],
      menuType: [
        { required: true, message: '请选择', trigger: 'blur' },
        // { min: 2, max: 20, message: '2~20个字符', trigger: 'blur' }
      ]
    }
  },
  data: {
    parentId: 0,//上级菜单
    component: '',// 组件路径
    icon: '',//菜单图标
    isCache: '0',//是否缓存
    isFrame: '0',//是否外链
    menuName: '',//菜单名称
    menuType: '0',//菜单类型
    orderNum: 1,//显示排序
    path: '',//路由地址
    perms: '',//权限标识
    query: '',//路由参数
    status: '0',//菜单状态
    visible: '0',//显示状态
    remark: '',
    createTime: ''
  },
  item: [
    { prop: 'parentId', label: '上级菜单', span: 12, itemRender: { placeholder: '上级菜单', name: 'ElInput', clearable: true } },
    {
      prop: 'menuType',
      label: '菜单类型',
      span: 12,
      itemRender: {
        placeholder: '菜单类型',
        name: 'ElRadioGroup',
        // type: 'button',
        options: [
          { label: '目录', value: '0' },
          { label: '菜单', value: '1' },
          { label: '按钮', value: '2' }
        ]
      },
      onChange: (e) => {
        console.log(e.target.value);
        curMenuType.value = e.target.value;
      }
    },
    { prop: 'icon', label: '菜单图标', span: 12, itemRender: { placeholder: '菜单图标', name: 'ElInput', clearable: true } },
    { prop: 'menuName', label: '菜单名称', span: 12, itemRender: { placeholder: '菜单名称', name: 'ElInput', clearable: true } },
    { prop: 'orderNum', label: '显示排序', span: 12, itemRender: { placeholder: '显示排序', name: 'ElInputNumber', min: 1, max: 10 } },
    {
      show: computed(() => curMenuType.value === '1'),
      prop: 'isFrame',
      label: '是否外链',
      span: 12,
      itemRender: {
        placeholder: '是否外链',
        name: 'ElRadioGroup',
        // type: 'button',
        options: [
          { label: '是', value: '0' },
          { label: '否', value: '1' }
        ]
      }
    },
    { prop: 'path', label: '路由地址', span: 12, itemRender: { placeholder: '路由地址', name: 'ElInput', clearable: true } },
    { prop: 'component', label: '组件路径', span: 12, itemRender: { placeholder: '组件路径', name: 'ElInput', clearable: true } },
    { prop: 'perms', label: '权限标识', span: 12, itemRender: { placeholder: '权限标识', name: 'ElInput', clearable: true } },
    { prop: 'query', label: '路由参数', span: 12, itemRender: { placeholder: '路由参数', name: 'ElInput', clearable: true } },
    {
      prop: 'isCache',
      label: '是否缓存',
      span: 12,
      itemRender: {
        placeholder: '是否缓存',
        name: 'ElRadioGroup',
        // type: 'button',
        options: [
          { label: '是', value: '0' },
          { label: '否', value: '1' }
        ]
      }
    },
    {
      prop: 'visible',
      label: '显示状态',
      span: 12,
      itemRender: {
        placeholder: '显示状态',
        name: 'ElRadioGroup',
        // type: 'button',
        options: [
          { label: '显示', value: '0' },
          { label: '隐藏', value: '1' }
        ]
      }
    },
    {
      prop: 'status',
      label: '菜单状态',
      span: 12,
      itemRender: {
        placeholder: '菜单状态',
        name: 'ElRadioGroup',
        // type: 'button',
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
  
  dialogConfig.show = true
  dialogRef.value.config.title = '新增'
}
const addSubmit = async () => {
  let flag = await addFormRef.value.submit()

  if (!flag) return
  let data = addFormRef.value.formData
  let res = await $Api.post('/api/MenuList', {
    ...data,
    createTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
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
    curMenuType.value = row.menuType;
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
  if (!data.createTime) data.createTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  let res = await $Api.patchById('/api/MenuList', data.id, {
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
      let res = await $Api.deleteById('/api/MenuList', row.id)
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
