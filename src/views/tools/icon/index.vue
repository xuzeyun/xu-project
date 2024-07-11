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
      <p>
        图标总数：<b>{{ modules.length }}</b>
      </p>
    </el-col>
  </el-row>
  <el-row class="icon-wrap">
    <el-card class="icon-card" v-for="(item, index) in initList" :key="index">
      <div>
        <font-awesome-icon class="icon" :icon="item.iconName" />
      </div>
      <p :title="item.iconName">
        <span>{{ item.iconName }}</span>
      </p>
    </el-card>
  </el-row>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { fas } from '@fortawesome/free-solid-svg-icons'

const modules = ref([])
const initList = ref([])

onMounted(() => {
  for (let [key, item] of Object.entries(fas)) {
    if (modules.value.length === 0) {
      console.log(item.iconName)
      modules.value.push({
        key,
        prefix: item.prefix,
        iconName: item.iconName
      })
    } else if (modules.value.length > 0) {
      console.log(modules.value)
      if (item.iconName != modules.value[modules.value.length - 1].iconName) {
        modules.value.push({
          key,
          prefix: item.prefix,
          iconName: item.iconName
        })
      }
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
    name: ''
  },
  item: [{ prop: 'name', label: '', itemRender: { placeholder: '图标名称', name: 'ElInput', clearable: true } }]
})

// 提交
const queryHandle = () => {
  console.log(formConfig.data.name, 'formConfig.data.name')
  let arr = modules.value.filter(item => {
    return item.iconName == formConfig.data.name
  })
  initList.value = arr
}
// 重置
const resetHandle = () => {
  // 重置表单
  formRef.value.reset()
  // 重新加载表格
  // tableRef.value.reload(true)
}
</script>

<style lang="scss" scoped>
.icon-wrap {
  display: flex;
  gap: 15px;
  .icon {
    font-size: 28px;
    margin-bottom: 10px;
  }
}
.icon-card {
  width: 150px;
  p {
    display: flex;
    height: 28px;
    align-items: center;
    margin: 0;
    font-size: 12px;
    line-height: 14px;
  }
}
</style>
