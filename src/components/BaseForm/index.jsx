import { ref, reactive, defineComponent, onMounted } from 'vue'
import { ElRow, ElCol, ElForm, ElFormItem, ElInput, ElButton, ElButtonGroup, ElSelect, ElOption, ElInputNumber } from 'element-plus'

const BaseForm = defineComponent({
  // props: {
  //   myProp: String
  // },
  name: 'BaseForm',
  setup(props, { attrs }) {
    const tabs = {
      ElInput,
      ElButton,
      ElSelect,
      ElInputNumber
    }

    const formRef = ref(null)
    // 表单动态数据
    const formData = reactive({ ...attrs.data })
    // formData.value = { ...attrs.data }
    // console.log(attrs.data, formData.value,'---');

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
      return submitHandle(formRef.value)
    }
    const submitHandle = async formEl => {
      if (!formEl) return
      let data = await formEl.validate((valid, fields) => {
        return valid
      })
      return data
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
        <ElRow gutter={20}>
          {this.attrs.item && this.attrs.item.length > 0
            ? this.attrs.item.map(item => {
                // 确保 this.tabs[item.itemRender.name] 是一个有效的组件
                const Component = this.tabs[item.itemRender.name]
                if (!Component) {
                  console.error(`未找到组件: ${item.itemRender.name}`)
                  return null
                }
                return (
                  <ElCol span={item.span}>
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
                  </ElCol>
                )
              })
            : '请配置表单'}
          <ElFormItem>
            <ElButtonGroup>{this.$slots.btns?.()}</ElButtonGroup>
          </ElFormItem>
        </ElRow>
      </ElForm>
    )
  }
})

export default BaseForm
