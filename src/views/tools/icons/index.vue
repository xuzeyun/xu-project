<template>
  <el-row class="g-tools">
    <el-col class="g-forms">
      <!-- 表单组件 -->
      <BaseForm ref="formRef" v-bind="formConfig">
        <template #btns>
          <el-button type="primary" title="查询" @click="queryHandle"><i class="ri-search-line"></i></el-button>
          <el-button type="" title="重置" @click="resetHandle"><i class="ri-refresh-line"></i></el-button>
        </template>
      </BaseForm>
    </el-col>
    <el-col class="g-btns">
      <span class="g-text-number">图标总数：<b>3058</b></span>
      <span class="g-text-number"
        >当前展示数：<b>{{ initList.length }}</b></span
      >
      <el-switch v-model="lineOrFill" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" active-text="线性" inactive-text="面性" />
    </el-col>
  </el-row>
  <div class="icons">
    <div class="icon-card" shadow="hover" v-for="(item, index) in initList" :key="index">
      <!-- <el-popover placement="top-start" :title="`ri-${item.name}${item.type === 'Editor' ? '' : lineOrFill ? '-line' : '-fill'}`" :width="300" trigger="click" :content="item.tags"> -->
      <!-- <template #reference> -->
      <div class="icon-img">
        <i :class="`icon ri-${item.name}${item.type === 'Editor' ? '' : lineOrFill ? '-line' : '-fill'}`"></i>
      </div>
      <div class="icon-name">
        {{ item.name }}
      </div>
      <!-- </template> -->
      <!-- </el-popover> -->
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import data from '@/assets/remixicon/tags.json'

import { RiFolderAddFill, RiDeleteBin2Fill, RiExportFill, RiImportFill, RiSearchLine, RiRefreshLine, RiEditBoxFill } from '@remixicon/vue'

// 全部图标
const modules = ref([])
// 查询后图标
const initList = ref([])
const lineOrFill = ref(true)

onMounted(() => {
  for (const key in data) {
    console.log(key)
    let obj = data[key]
    for (const keyIn in obj) {
      if (key === '_comment') {
        break
      }
      modules.value.push({
        type: key,
        name: keyIn,
        tags: obj[keyIn]
      })
    }
  }
  initList.value = [...modules.value]
})

// 表单配置
const formRef = ref(null)
const formConfig = reactive({
  config: {
    size: '',
    inline: true
  },
  data: {
    name: '',
    type: ''
  },
  item: [
    {
      prop: 'type',
      label: '类别',
      itemRender: {
        name: 'ElSelect',
        options: [
          { label: '全部', value: '' },
          { label: '箭头', value: 'Arrows' },
          { label: '建筑', value: 'Buildings' },
          { label: '商业', value: 'Business' },
          { label: '通信', value: 'Communication' },
          { label: '设计', value: 'Design' },
          { label: '开发', value: 'Development' },
          { label: '设备', value: 'Device' },
          { label: '文件', value: 'Document' },
          { label: '编辑', value: 'Editor' },
          { label: '金融', value: 'Finance' },
          { label: '健康与医疗', value: 'Health & Medical' },
          { label: '标志', value: 'Logos' },
          { label: '地图', value: 'Map' },
          { label: '媒体', value: 'Media' },
          { label: '系统', value: 'System' },
          { label: '用户和面孔', value: 'User & Faces' },
          { label: '天气', value: 'Weather' },
          { label: '其他', value: 'Others' }
        ]
      }
    },
    { prop: 'name', label: '关键字', itemRender: { placeholder: '图标名称', name: 'ElInput', clearable: true } }
  ]
})

// 提交
const queryHandle = () => {
  // if (!formRef.value.formData.name) {
  //   initList.value = [...modules.value]
  //   return
  // }

  initList.value = []
  let arr = modules.value.filter(item => {
    return (
      (item.name.indexOf(formRef.value.formData.name) != -1 || item.tags.indexOf(formRef.value.formData.name) != -1) && (item.type === formRef.value.formData.type || formRef.value.formData.type == '')
    )
  })
  initList.value = arr
}
// 重置
const resetHandle = () => {
  // 重置表单
  formRef.value.reset()
  queryHandle()
  // 重新加载表格
  // tableRef.value.reload(true)
}
</script>

<style lang="scss" scoped>
.icons {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  border: var(--el-border-color) 1px solid;
  align-content: flex-start;
  // gap: 15px;
  .icon-card {
    // width: 70px;
    width: 10%;
    // padding: 25px 0;
    height: 120px;
    border-right: var(--el-border-color) 1px solid;
    border-bottom: var(--el-border-color) 1px solid;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 12px;
    &:hover {
      background-color: var(--el-border-color-extra-light);
    }
    .icon-img {
      .icon {
        font-size: 28px;
        color: var(--el-text-color-regular);
      }
    }
    .icon-name {
      font-size: 12px;
      color: var(--el-text-color-regular);
    }
  }
}

::v-deep(.el-card) {
  .el-card__body {
    display: flex;
    flex-direction: row;
    gap: 10px;
    padding: 15px;
  }
}
</style>
