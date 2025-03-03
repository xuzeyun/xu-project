<template>
  <div class="wrap">
    <BaseForm ref="addFormRef" v-bind="addFormConfig"></BaseForm>
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
const options = [
  {
    value: 'guide',
    name: 'Guide',
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
          },
        ]
      },
    ]
  }
]

// 表单ref
const addFormRef = ref(null)
// 表单配置
const addFormConfig = reactive({
  config: {
    size: '',
    labelWidth: 80,
    inline: false,
    // 验证
    rules: {
      // postName: [
      //   { required: true, message: '请输入岗位名称', trigger: 'blur' },
      //   { min: 2, max: 10, message: '2~10个字符', trigger: 'blur' }
      // ],
      // postCode: [
      //   { required: true, message: '请输入岗位编码', trigger: 'blur' },
      //   { min: 2, max: 20, message: '2~20个字符', trigger: 'blur' }
      // ]
    }
  },
  // 字段
  data: {
    // postName: '',
    form01: '',
    form02: [],
  },
  item: [
    // 自动补全
    {
      
      prop: 'form01',
      label: '自动补全',
      span: 24,
      itemRender: {
        placeholder: '',
        name: 'ElAutocomplete',
        clearable: true,
        triggerOnFocus: true,
        fetchSuggestions(queryString, cb) {
          querySearch(queryString, cb)
        }
      }
    },
    {
      prop: 'form02',
      label: '级联选择',
      span: 24,
      itemRender: {
        placeholder: '',
        name: 'ElCascader',
        clearable: true,
        // props: {
        //   value: 'value',
        //   label: 'name',
        //   children: 'children'
        // },
        options: computed(() => options)
      }
    },
    { prop: 'postName', label: '输入框', span: 24, itemRender: { placeholder: '', name: 'ElInput', clearable: true } },
    { prop: 'postCode', label: '密码框', span: 24, itemRender: { placeholder: '', name: 'ElInput', clearable: true } },
    { prop: 'postSort', label: '数字框', span: 24, itemRender: { placeholder: '', name: 'ElInputNumber', min: 1, max: 10 } },
    { prop: 'remark', label: '文本域', span: 24, itemRender: { placeholder: '', name: 'ElInput', type: 'textarea', clearable: true } },
    {
      prop: 'status',
      label: '选择框',
      span: 24,
      itemRender: {
        placeholder: '',
        name: 'ElSelect',
        options: [
          { label: '正常', value: '0' },
          { label: '停用', value: '1' }
        ]
      }
    }
  ]
})

const reset = formEl => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 100%;
  border: var(--el-border-color) 1px solid;
  padding: 20px;
  box-sizing: border-box;
}
</style>
