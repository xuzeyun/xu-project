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
    const config = reactive(
      {
        fullscreen: false,
        ...attrs.config
      } || {}
    )

    onMounted(() => {
      console.log(attrs.config.title);
    })

    watch(
      () => attrs.show,
      val => {
        show.value = val
      }
    )

    const viewToggle = () => {
      config.fullscreen = !config.fullscreen
      console.log(config.fullscreen, 'config.fullscreen')
    }
    const close = () => {
      show.value = false
    }

    return {
      attrs,
      show,
      config,
      viewToggle,
      close
    }
  },
  render() {
    return (
      <ElDialog vModel={this.show} {...this.config} showClose={false}>
        {{
          default: () => <div>{this.$slots.default?.()}</div>,
          header: () => (
            <div className="g-dialog-header">
              <h3>{this.config.title}</h3>
              <a href="javascript:;" onClick={this.viewToggle}>
                <font-awesome-icon icon={this.config.fullscreen ? 'compress' : 'expand'} />
              </a>
              <a href="javascript:;" onClick={this.close}>
                <font-awesome-icon icon="xmark" />
              </a>
            </div>
          ),
          footer: () => <div>{this.$slots.footer?.()}</div>
        }}
      </ElDialog>
    )
  }
})

export default BaseTable
