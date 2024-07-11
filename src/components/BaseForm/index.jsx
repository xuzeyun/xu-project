import { ref, reactive, defineComponent } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElButtonGroup, ElSelect, ElOption } from 'element-plus'

const BaseForm = defineComponent({
  // props: {
  //   myProp: String
  // },
  name: 'BaseForm',
  setup(props, { attrs }) {
    const tabs = {
      ElInput,
      ElButton,
      ElSelect
    }

    const formRef = ref(null)
    // 表单动态数据
    const formData = reactive({})
    formData.value = { ...attrs.data }

    // 表单重置
    const reset = () => {
      resetHandle(formRef.value)
    }
    const resetHandle = formEl => {
      if (!formEl) return
      formEl.resetFields()
    }

    // 表单提交
    const submit = () => {
      submitHandle(formRef.value)
    }
    const submitHandle = formEl => {
      if (!formEl) return
      formEl.resetFields()
    }

    return {
      attrs,
      formRef,
      formData,
      tabs,
      reset,
      submit
    }
  },
  render() {
    // 处理空状态
    if (!this.attrs.config || !this.attrs.data || !this.attrs.item || this.attrs.item.length === 0) {
      return <div>请配置表单</div>
    }
    return (
      <ElForm ref="formRef" {...this.attrs.config} model={this.formData}>
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
                  <Component {...item.itemRender} vModel={this.formData[item.prop]}>
                    {item.itemRender.name === 'ElSelect'
                      ? // select
                        item.itemRender.options.map(optionItem => {
                          return (
                            <ElOption {...optionItem} key={optionItem.value}>
                              {optionItem.label}
                            </ElOption>
                          )
                        })
                      : null}
                  </Component>
                </ElFormItem>
              )
            })
          : '请配置表单'}
        <ElFormItem>
          <ElButtonGroup>{this.$slots.btns?.()}</ElButtonGroup>
        </ElFormItem>
      </ElForm>
    )
  }
})

export default BaseForm
