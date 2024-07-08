import { ref, onMounted, reactive, defineComponent } from 'vue'
import { ElRow, ElForm, ElFormItem, ElInput, ElButton, ElButtonGroup } from 'element-plus'

const BaseForm = defineComponent({
  // props: {
  //   myProp: String
  // },
  name: 'BaseForm',
  setup(props, { attrs }) {
    onMounted(() => {
      formData.value = attrs.data
    })
    const tabs = {
      ElInput,
      ElButton
    }

    const formRef = ref()
    // 表单动态数据
    const formData = reactive({})

    // 表单重置
    const reset = () => {
      console.log(formRef.value, 'fuck')
      if (formRef.value) {
        formRef.value.resetFields()
      }
    }

    // 表单提交
    const handleSubmit = () => {
      if (formRef.value) {
        formRef.value.validate()
      }
    }

    return {
      attrs,
      formRef,
      formData,
      tabs,
      reset,
      handleSubmit
    }
  },
  render() {
    // 处理空状态
    if (!this.attrs.config || !this.attrs.data || !this.attrs.item || this.attrs.item.length === 0) {
      return <div>请配置表单</div>
    }
    return (
      <ElRow>
        <ElForm ref={el => (this.formRef = el)} {...this.attrs.config} vModel={this.formData}>
          {this.attrs.item && this.attrs.item.length > 0
            ? this.attrs.item.map(item => {
                // 确保 this.tabs[item.itemRender.name] 是一个有效的组件
                const Component = this.tabs[item.itemRender.name]
                if (!Component) {
                  console.error(`未找到组件: ${item.itemRender.name}`)
                  return null
                }
                return (
                  <ElFormItem {...item}>
                    <Component {...item.itemRender} vModel={this.formData[item.prop]} /> {/* 注意这里直接使用了组件，没有使用任何特殊的动态组件语法 */}
                  </ElFormItem>
                )
              })
            : '请配置表单'}
          <ElFormItem>
            <ElButtonGroup>{this.$slots.btns?.()}</ElButtonGroup>
          </ElFormItem>
        </ElForm>
      </ElRow>
    )
  }
})

export default BaseForm
