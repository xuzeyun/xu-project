<template>
  <el-row class="g-tools">
    <i-ant-design-home />
    <i-tdesign-home />
    <i-line-md-cog-filled-loop />
    <i-line-md-arrows-horizontal />
    <i-tdesign-search />
    <i-tdesign-edit />
    <i-tdesign-grid-view />

    <el-col class="g-forms">
      <!-- 表单组件 -->
      <BaseForm ref="formRef" v-bind="formConfig">
        <template #btns>
          <el-button type="primary" title="查询" @click="queryHandle"><i-tdesign-search /><font-awesome-icon icon="search" /></el-button>
          <el-button type="" title="重置" @click="resetHandle"><font-awesome-icon icon="repeat" /></el-button>
        </template>
      </BaseForm>
    </el-col>
    <el-col class="g-btns">
      <span class="g-text-number">
        图标总数：<b>{{ modules.length }}</b>
      </span>
      <span class="g-text-number"
        >当前展示数：<b>{{ initList.length }}</b></span
      >
      <el-switch v-model="isShowName" inline-prompt active-text="是" inactive-text="否" style="margin-right: 10px" />
      <span class="g-text-number">是否显示图标名称</span>
    </el-col>
  </el-row>
  <el-row class="icon-wrap">
    <el-card class="icon-card" shadow="hover" v-for="(item, index) in initList" :key="index">
      <div class="icon-box">
        <font-awesome-icon class="icon" :icon="item.iconName" />
      </div>
      <p v-if="isShowName" :title="item.iconName">
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
const isShowName = ref(false)

onMounted(() => {
  for (let [key, item] of Object.entries(fas)) {
    if (modules.value.length === 0) {
      // console.log(item.iconName)
      modules.value.push({
        key,
        prefix: item.prefix,
        iconName: item.iconName
      })
    } else if (modules.value.length > 0) {
      // console.log(modules.value)
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
  if (!formRef.value.formData.name) {
    initList.value = [...modules.value]
    return
  }

  initList.value = []
  let arr = modules.value.filter(item => {
    return item.iconName.indexOf(formRef.value.formData.name) != -1
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
.icon-wrap {
  display: flex;
  gap: 15px;
  .icon-card {
    // width: 70px;
    .icon-box {
      display: flex;
      width: 40px;
      height: 40px;
      justify-content: center;
      align-items: center;
      .icon {
        font-size: 28px;
      }
    }
    p {
      display: flex;
      height: 40px;
      align-items: center;
      margin: 0;
      font-size: 12px;
      line-height: 14px;
      color: var(--el-text-color-placeholder);
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
