import { ref, reactive, defineComponent, onMounted } from 'vue'
import { ElRow, ElCol, ElForm, ElFormItem, ElInput, ElButton, ElButtonGroup, ElSelect, ElOption, ElInputNumber, ElRadioGroup, ElRadioButton, ElRadio, ElSelectV2 } from 'element-plus'

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
      ElSelectV2,
      ElInputNumber,
      ElRadioGroup
    }

    const formRef = ref(null)
    // 表单动态数据
    const formData = reactive({ ...attrs.data })

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
      let data = await formEl.validate(valid => {
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
                if (this.attrs.config.inline) {
                  return item.show === false ? null : getFormItem(this.formData)
                } else {
                  return item.show === false ? null : <ElCol span={item.span}>{getFormItem(this.formData)}</ElCol>
                }
                function getFormItem(formData) {
                  return (
                    <ElFormItem {...item}>
                      <Component {...item.itemRender} vModel={formData[item.prop]}>
                        {{
                          default: (scope) => this.$slots[item.prop]?.(scope)
                        }}
                        {item.itemRender.name === 'ElSelect'
                          ? // select
                            item.itemRender.options.map(optionItem => {
                              return (
                                <ElOption {...optionItem} key={optionItem.value}>
                                  {optionItem.label}
                                </ElOption>
                              )
                            })
                          : // el-radio-group
                            item.itemRender.name === 'ElRadioGroup'
                            ? item.itemRender.options.map(optionItem => {
                                return item.itemRender.type === 'button' ? (
                                  // 暂时无效
                                  <ElRadioButton {...optionItem} key={optionItem.value} />
                                ) : (
                                  <ElRadio {...optionItem} key={optionItem.value}>
                                    {optionItem.label}
                                  </ElRadio>
                                )
                              })
                            : null}
                        {/* ElRadioButton */}
                      </Component>
                    </ElFormItem>
                  )
                }
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
