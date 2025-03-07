import { ref, reactive, defineComponent, onMounted, nextTick } from 'vue'
import {
  ElRow,
  ElCol,
  ElForm,
  ElFormItem,
  ElAutocomplete,
  ElCascader,


  ElInput,
  ElButton,
  ElButtonGroup,
  ElSwitch,
  ElUpload,
  ElTreeSelect,
  ElDatePicker,
  ElTree,
  ElSelect,
  ElOptionGroup,
  ElOption,
  ElInputNumber,
  ElRadioGroup,
  ElRadioButton,
  ElRadio,
  ElSelectV2,
  ElColorPicker,
} from 'element-plus'

const BaseForm = defineComponent({
  // props: {
  //   myProp: String
  // },
  name: 'BaseForm',
  setup(props, { attrs }) {
    const tabs = {
      ElAutocomplete,
      ElCascader,

      ElInput,
      ElButton,
      ElSelect,
      ElSelectV2,
      ElInputNumber,
      ElRadioGroup,
      ElColorPicker,
      ElSwitch,
      ElTreeSelect,
      ElTree,
      ElDatePicker,
      ElOptionGroup,
      ElUpload,
      ElButtonGroup,
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

    // 树形数据
    const treeRef = ref(null)

    onMounted(() => {
      nextTick(() => {
        // attrs.item.forEach(item => {
        //   if(item)
        // })
        for (const item of attrs.item) {
          if (item.itemRender.name === 'ElTree') {
            // treeRef.value.setCheckedKeys(formData[item.prop], true)
            for (const iterator of formData[item.prop]) {
              treeRef.value.setChecked(iterator, true, false)
            }
          }
        }
        // treeRef.value.
      })
    })

    const treeChange = (data, node, propName) => {
      nextTick(() => {
        let ids = treeRef.value.getCheckedNodes(false, true).map(item => item.id)
        formData[propName] = ids
      })
    }

    return {
      attrs,
      formRef,
      treeRef,
      formData,
      tabs,
      reset,
      submit,
      treeChange
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
                  return item.show === false ? null : <ElCol span={item.span}>{getFormItem(this.formData, this)}</ElCol>
                }
                function getFormItem(formData, _this) {
                  return (
                    <ElFormItem {...item}>
                      {item.itemRender.name === 'ElTree' ? (
                        <ElTree
                          ref="treeRef"
                          {...item.itemRender}
                          vModel={formData[item.prop]}
                          defaultExpandedKeys={formData[item.prop]}
                          onCheck={(data, node) => {
                            _this.treeChange(data, node, item.prop)
                          }}
                        ></ElTree>
                      ) : (
                        <Component {...item.itemRender} vModel={formData[item.prop]}>
                          {/* {{
                          default: (scope) => this.$slots[item.prop]?.(scope)
                        }} */}
                          {item.itemRender.name === 'ElSelect' ? (
                            // select
                            // select 插槽自定义
                            item.itemRender.isSlot ? (
                              { default: scope => this.$slots[item.prop]?.(scope) }
                            ) : // select 选项分组
                            item.itemRender.group ? (
                              item.itemRender.options.map(optionGroup => {
                                return (
                                  <ElOptionGroup label={optionGroup.label} key={optionGroup.label}>
                                    {optionGroup.options.map(optionItem => {
                                      return (
                                        <ElOption {...optionItem} key={optionItem.value}>
                                          {optionItem.label}
                                        </ElOption>
                                      )
                                    })}
                                  </ElOptionGroup>
                                )
                              })
                            ) : (
                              item.itemRender.options.map(optionItem => {
                                return (
                                  <ElOption {...optionItem} key={optionItem.value}>
                                    {optionItem.label}
                                  </ElOption>
                                )
                              })
                            )
                          ) : // select 普通
                          item.itemRender.name === 'ElRadioGroup' ? (
                            item.itemRender.options.map(optionItem => {
                              return item.itemRender.type === 'button' ? (
                                // 暂时无效
                                <ElRadioButton {...optionItem} key={optionItem.value} />
                              ) : (
                                <ElRadio {...optionItem} key={optionItem.value}>
                                  {optionItem.label}
                                </ElRadio>
                              )
                            })
                          ) : // 上传控件
                          item.itemRender.name === 'ElUpload' ? (
                            // {
                            //   trigger: () => (<ElButton type="primary">select file</ElButton>),
                            //   tip: () => (<div class="el-upload__tip">jpg/png files with a size less than 500kb</div>)
                            // }
                            <ElButton type="primary">上传文件</ElButton>
                          ) : null}
                          {/* ElRadioButton */}
                        </Component>
                      )}
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
