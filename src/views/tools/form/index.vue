<template>
  <div class="wrap">
    <BaseForm ref="formRef" v-bind="formConfig">
      <!-- 上传  -->
      <!--
        使用el-form元素内部插槽
        prop值 + element原有插槽名称。如：想使用el-upload中的tip插槽（upload + #tip = #uploadTip）
      -->
      <template #uploadTrigger>
        <el-button type="primary">选择附件</el-button>
      </template>
      <template #uploadTip>
        <div style="margin-left: 10px">jpg/png 文件大小小于等于 500KB.</div>
      </template>
    </BaseForm>

    <el-row>
      <el-col align="center">
        <el-button type="primary" title="保存" @click="saveHandle(formRef)">
          <i class="ri-save-line"></i>保存
        </el-button>
        <el-button type="" title="重置" @click="resetHandle(formRef)">
          <i class="ri-repeat-line"></i>重置
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

onMounted(() => {
  restaurants.value = loadAll()
})

// 自动补全
const restaurants = ref([])
const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' }
  ]
}
const createFilter = queryString => {
  return restaurant => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  }
}
const querySearch = (queryString, cb) => {
  const results = queryString ? restaurants.value.filter(createFilter(queryString)) : restaurants.value
  cb(results)
}

// 级联选择
const cascaderOptions = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency'
          },
          {
            value: 'feedback',
            label: 'Feedback'
          }
        ]
      }
    ]
  }
]
const props = {
  expandTrigger: 'hover'
}

// 表单ref
const formRef = ref(null)
// 表单配置
const formConfig = reactive({
  config: {
    size: '',         // 表单元素尺寸（同element尺寸用法）
    labelWidth: 100,  // label宽度
    inline: false,    // 是否内联
    // 表单验证
    rules: {
      input: [
        { required: true, message: '请输入', trigger: 'blur' },
        { min: 2, max: 10, message: '请输入2~10个字符', trigger: 'blur' }
      ],
    }
  },
  // 字段
  data: {
    input: '',
    // form01: '',
    // form02: []
  },
  item: [
    // 输入框
    { prop: 'input', label: '输入框', span: 8, itemRender: { placeholder: '', name: 'ElInput', clearable: true } },
    // 自动补全
    {
      prop: 'autocomplete',
      label: '自动补全',
      span: 8,
      itemRender: {
        placeholder: '根据输入内容自动提示',
        name: 'ElAutocomplete',
        clearable: true,
        triggerOnFocus: true,
        fetchSuggestions(queryString, cb) {
          querySearch(queryString, cb)
        }
      }
    },
    // { prop: 'password', label: '密码框', span: 8, itemRender: { placeholder: '', name: 'ElInput', type: 'password', clearable: true } },
    { prop: 'number', label: '数字框', span: 8, itemRender: { placeholder: '', name: 'ElInputNumber', min: 1, max: 10 } },
    { prop: 'tag', label: '标签输入', span: 24, itemRender: { placeholder: '输入内容按Enter键生产标签', name: 'ElInputTag', clearable: true } },
    { prop: 'textarea', label: '文本域', span: 24, itemRender: { placeholder: '', name: 'ElInput', type: 'textarea', clearable: true } },
    // 选择器
    {
      prop: 'select',
      label: '选择框',
      span: 8,
      itemRender: {
        placeholder: '',
        name: 'ElSelect',
        options: [
          { label: '正常', value: '0' },
          { label: '停用', value: '1' }
        ]
      }
    },
    // 虚拟化选择器（大数据量）
    {
      prop: 'selectV2',
      label: '选择框-虚拟',
      span: 8,
      itemRender: {
        placeholder: '',
        name: 'ElSelectV2',
        options: [
          { label: '正常', value: '0' },
          { label: '停用', value: '1' }
        ]
      }
    },
    // 级联选择
    {
      prop: 'cascader',
      label: '级联选择',
      span: 8,
      itemRender: {
        name: 'ElCascader',
        clearable: true,
        options: [
          {
            id: '001',
            value: 'guide',
            label: 'Guide',
            children: [
              {
                id: '001001',
                value: 'disciplines',
                label: 'Disciplines',
                children: [
                  {
                    id: '001001001',
                    value: 'consistency',
                    label: 'Consistency'
                  },
                  {
                    id: '001001002',
                    value: 'feedback',
                    label: 'Feedback'
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    
    
    { prop: 'date', label: '日期选择', span: 24, itemRender: { name: 'ElDatePicker', type: 'date', format: 'YYYY/MM/DD', valueFormat: 'YYYY-MM-DD', clearable: true } },
    
    {
      prop: 'radio',
      label: '单选框',
      span: 8,
      itemRender: {
        name: 'ElRadioGroup',
        options: [
          { label: '正常', value: '0' },
          { label: '停用', value: '1' }
        ]
      }
    },
    {
      prop: 'radio2',
      label: '单选框-按钮',
      span: 8,
      itemRender: {
        name: 'ElRadioGroup',
        type: 'button',
        options: [
          { label: '正常', value: '0' },
          { label: '停用', value: '1' }
        ]
      }
    },
    {
      prop: 'radio3',
      label: '单选框-边框',
      span: 8,
      itemRender: {
        name: 'ElRadioGroup',
        options: [
          { label: '正常', value: '0', border: true },
          { label: '停用', value: '1', border: true }
        ]
      }
    },
    // 复选框
    {
      prop: 'checkbox',
      label: '复选框',
      span: 24,
      itemRender: {
        placeholder: '',
        name: 'ElCheckboxGroup',
        options: [
          { label: '正常', value: '0' },
          { label: '停用', value: '1' }
        ]
      }
    },
    { prop: 'rate', label: '评分', span: 6, itemRender: { name: 'ElRate', clearable: true } },
    
    {
      prop: 'switch',
      label: '开关',
      span: 6,
      itemRender: {
        name: 'ElSwitch'
      }
    },
    { prop: 'color', label: '取色器', span: 6, itemRender: { name: 'ElColorPicker', clearable: true } },
    {
      prop: 'upload',
      label: '附件',
      span: 24,
      slotName: 'upload',
      // form表单元素内部插槽
      slotTip: 'uploadTip',
      slotTrigger: 'uploadTrigger',
      itemRender: {
        name: 'ElUpload',
        action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
        showFileList: true
      }
    }
  ]
})



const saveHandle = async formEl => {
  if (!formEl) return
  let flag = await formEl.submit()
  if (!flag) return
  let data = formEl.formData

  console.log(data);
}
const resetHandle = formEl => {
  if (!formEl) return
  formEl.reset()
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 100%;
  overflow-y: auto;
  border: var(--el-border-color) 1px solid;
  padding: 20px;
  box-sizing: border-box;
}
</style>
