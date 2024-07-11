import { ref, onMounted, reactive, watch, defineComponent } from 'vue'
import { ElDialog, ElButtonGroup, ElButton } from 'element-plus'

const BaseTable = defineComponent({
  // props: {
  //   myProp: String
  // },
  name: 'BaseTable',
  setup(props, { attrs }) {
    console.log()
    const show = ref(attrs.show || false)

    onMounted(() => {})

    watch(
      () => attrs.show,
      val => {
        show.value = val
      }
    )

    return {
      attrs,
      show
    }
  },
  render() {
    return (
      <ElDialog vModel={this.show} {...this.attrs.config} showClose={false}>
        {{
          default: () => 'default slot',
          header: () => (
            <div>
              <span>1111</span>
              <ElButtonGroup>
                <ElButton type=""><font-awesome-icon icon="search" /></ElButton>
                <ElButton type="danger"><font-awesome-icon icon="close" /></ElButton>
              </ElButtonGroup>
            </div>
          ),
          footer: () => <div>{this.$slots.footer?.()}</div>
        }}
      </ElDialog>
    )
  }
})

export default BaseTable
