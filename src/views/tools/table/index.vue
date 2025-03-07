<template>
  <el-row class="g-table">
    <BaseTable ref="tableRef" v-bind="tableConfig">
      <template #status="scope">
        <el-tag v-if="scope.row.status === '0'" type="success">正常</el-tag>
        <el-tag v-else-if="scope.row.status === '1'" type="danger">停用</el-tag>
      </template>
      <template #operation="scope">
        <el-button size="small" link type="primary" title="修改" @click="editHandle(scope.row, scope.$index)">
          <i class="ri-edit-box-fill g-icon"></i>
        </el-button>
        <el-button size="small" link type="primary" title="查看" @click="addHandle(scope.row, scope.$index)">
          <i class="ri-eye-fill g-icon"></i>
        </el-button>
        <el-button size="small" link type="danger" title="删除" @click="deleteHandle(scope.row, scope.$index)">
          <i class="ri-delete-bin-2-fill g-icon"></i>
        </el-button>
      </template>
    </BaseTable>
  </el-row>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

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
    showOverflowTooltip: true,
    // tableLayout: 'auto'
    showSummary: true,
    data: []
  },
  // 请求数据
  getTableData: async (page, limit, sortObj, queryObj) => {
    const params = {
      _page: page,
      _per_page: limit,
      // ...formRef.value.formData,
      ...sortObj,
      ...queryObj
    }
    console.log(params, 'params')
    // let res = await $Api.get('/api/MenuList', params)
    let res = {
      data: [
        { htbh: 'BH00001' },
        { htbh: 'BH00002' },
        { htbh: 'BH00005' },
        { htbh: 'BH00003' },
        { htbh: 'BH00006' },
        { htbh: 'BH00004' },
      ],
      total: 6
    }
    return {
      list: res.data,
      total: res.total
    }
  },
  // 表格列配置
  columns: [
    { label: '合同编号', prop: 'htbh', sortable: true, filters: true },
    { label: '合同名称', prop: 'htmc' },
    { label: '合同状态', prop: 'htzt' },
    { label: '备注', prop: 'bz' },
    { label: '创建人', prop: 'createUser', align: 'right', headerAlign: 'left' },
    { label: '创建时间', prop: 'createTime', align: 'right', headerAlign: 'left' },
    { label: '操作', prop: 'operation', fixed: 'right', width: '160', align: 'center' }
  ]
})
</script>

<style lang="scss" scoped></style>
