<template>
  <div>
    <el-row>
      <el-form ref="formRef" :inline="true" :model="queryForm">
        <el-form-item label="名称" prop="mc">
          <el-input v-model="queryForm.mc" placeholder="请输入名称" clearable />
        </el-form-item>
        <el-form-item label="状态" prop="zt">
          <el-select v-model="queryForm.zt" placeholder="请选择状态" clearable>
            <el-option label="正常" value="正常" />
            <el-option label="异常" value="异常" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryHandle"><font-awesome-icon class="icon" icon="search" />查询</el-button>
          <el-button @click="queryReset(formRef)"><font-awesome-icon class="icon" icon=" " />重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row style="margin-bottom: 10px">
      <el-button type="primary" @click="dialogVisible = true"><font-awesome-icon class="icon" icon="add" />新增</el-button>
    </el-row>
    <el-row style="margin-bottom: 10px">
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <!-- <el-table-column type="index" width="50" /> -->
        <el-table-column prop="mc" label="名称" />
        <el-table-column prop="qxbm" label="权限编码" show-overflow-tooltip />
        <el-table-column prop="tb" label="图标" />
        <el-table-column prop="lx" label="类型" />
        <el-table-column prop="cdurl" label="菜单URL" />
        <el-table-column prop="cdzj" label="菜单组件" />
        <el-table-column prop="pxh" label="排序号" />
        <el-table-column prop="zt" label="状态">
          <template #default="scope">
            <el-tag size="small" type="success" v-if="scope.row.zt === 0">正常</el-tag>
            <el-tag size="small" type="danger" v-else-if="scope.row.zt === 1">异常</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="cz" label="操作" align="center">
          <template #default="scope">
            <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)"> 新增 </el-button>
            <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)"> 编辑 </el-button>
            <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-pagination
        v-model:current-page="currentPage2"
        v-model:page-size="pageSize2"
        :page-sizes="[100, 200, 300, 400]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="sizes, prev, pager, next"
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-row>
  </div>

  <!-- 新增弹窗============================================================================================= -->
  <el-dialog v-model="dialogVisible" title="新增" width="500" :before-close="handleClose">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" :label-position="labelPosition" label-width="auto">
      <el-form-item label="上级菜单" prop="sjcd">
        <el-select v-model="ruleForm.sjcd" placeholder="请选择">
          <!-- <template v-for="item in tableData">
            <el-option :label="item.mc" :value="item.id" />
            <template v-for="children in item.children">
              <el-option :label="children.mc" :value="children.id" />
              <span>{{ "-"+children.mc }}</span>
            </template>
          </template> -->

          <el-option label="系统管理" value="系统管理" />
          <el-option label="菜单管理" value="菜单管理" />
        </el-select>
      </el-form-item>
      <el-form-item label="菜单名称" prop="cdmc">
        <el-input v-model="ruleForm.cdmc" />
      </el-form-item>
      <el-form-item label="权限编码" prop="qxbm">
        <el-input v-model="ruleForm.qxbm" />
      </el-form-item>
      <el-form-item label="图标" prop="tb">
        <el-input v-model="ruleForm.tb" />
      </el-form-item>
      <el-form-item label="菜单URL" prop="cdurl">
        <el-input v-model="ruleForm.cdurl" />
      </el-form-item>
      <el-form-item label="菜单组件" prop="cdzj">
        <el-input v-model="ruleForm.cdzj" />
      </el-form-item>
      <el-form-item label="类型" prop="lx">
        <el-radio-group v-model="ruleForm.lx">
          <el-radio value="ml">目录</el-radio>
          <el-radio value="cd">菜单</el-radio>
          <el-radio value="an">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态" prop="zt">
        <el-radio-group v-model="ruleForm.zt">
          <el-radio value="jy">禁用</el-radio>
          <el-radio value="zc">正常</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序号" prop="pxh">
        <el-input-number v-model="ruleForm.pxh" @change="handleChange" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"> 提交 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue'
// import { ElMessageBox } from 'element-plus'

// 查询表单
const queryForm = reactive({
  mc: '',
  zt: ''
})
// 提交
const queryHandle = () => {
  console.log('submit!')
}
// 重置
const formRef = ref()
const queryReset = formEl => {
  if (!formEl) return
  formEl.resetFields()
}

// 表格数据
const tableData = [
  {
    tb: 1,
    lx: '2016-05-02',
    mc: 'wangxiaohu',
    qxbm: 'No. 189, Grove St, Los Angeles',
    cdurl: '',
    cdzj: '111',
    pxh: '',
    zt: 0
  },
  {
    tb: 2,
    lx: '2016-05-04',
    mc: 'wangxiaohu',
    qxbm: 'No. 189, Grove St, Los Angeles'
  },
  {
    tb: 3,
    lx: '2016-05-01',
    mc: 'wangxiaohu',
    qxbm: 'No. 189, Grove St, Los Angeles',
    children: [
      {
        tb: 31,
        lx: '2016-05-01',
        mc: 'wangxiaohu1',
        qxbm: 'No. 189, Grove St, Los Angeles',
        zt: 0
      },
      {
        tb: 32,
        lx: '2016-05-01',
        mc: 'wangxiaohu2',
        qxbm: 'No. 189, Grove St, Los Angeles',
        zt: 1
      }
    ]
  },
  {
    tb: 4,
    date: '2016-05-01',
    mc: 'wangxiaohu',
    qxbm: 'No. 189, Grove St, Los Angeles'
  }
]
// 分页符
const currentPage2 = ref(5)
const pageSize2 = ref(20)
const small = ref(false)
const background = ref(true)
const disabled = ref(false)

const handleSizeChange = () => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = () => {
  console.log(`current page: ${val}`)
}

// 弹窗=============================================================================================
const dialogVisible = ref(false)

// const formSize = ref('default')
const ruleFormRef = ref()
const ruleForm = reactive({
  cdmc: '',
  sjcd: '',
  qxbm: '',
  tb: '',
  cdurl: '',
  cdzj: '',
  lx: '',
  zt: '',
  pxh: ''
})

// 必输项写在这里
const rules = reactive({
  sjcd: [
    {
      required: true,
      message: 'Please select 上级菜单',
      trigger: 'change'
    }
  ],
  cdmc: [{ required: true, message: '请输入', trigger: 'blur' }],
  qxbm: [{ required: true, message: '请输入', trigger: 'blur' }],
  lx: [
    {
      required: true,
      message: 'Please select activity lx',
      trigger: 'change'
    }
  ],
  zt: [
    {
      required: true,
      message: 'Please select activity zt',
      trigger: 'change'
    }
  ],
  pxh: [{ required: true, message: '1', trigger: 'blur' }]
})

// const options = Array.from({ length: 10000 }).map((_, idx) => ({
//   value: `${idx + 1}`,
//   label: `${idx + 1}`
// }))
</script>

<style lang="scss" scoped></style>
