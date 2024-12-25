import { ref, onMounted, reactive, watch, defineComponent } from 'vue'
import { ElDialog, ElButtonGroup, ElButton } from 'element-plus'
import {
  RiCloseLargeLine,
  RiFullscreenLine,
  RiFullscreenExitLine
} from '@remixicon/vue'

const BaseDialog = defineComponent({
  // props: {
  //   myProp: String
  // },
  name: 'BaseDialog',
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
      // console.log(attrs.config.title);
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
      <ElDialog class="g-dialog" vModel={this.show} {...this.config} showClose={false}>
        {{
          default: () => <div>{this.$slots.default?.()}</div>,
          header: () => (
            <div className="g-dialog-header">
              <h3>{this.config.title}</h3>
              <a href="javascript:;" class="fullscreen" onClick={this.viewToggle}>
                {this.config.fullscreen ? <RiFullscreenExitLine /> : <RiFullscreenLine />}
              </a>
              <a href="javascript:;" class="close" onClick={this.close}>
                <RiCloseLargeLine />
              </a>
            </div>
          ),
          footer: () => <div>{this.$slots.footer?.()}</div>
        }}
      </ElDialog>
    )
  }
})

export default BaseDialog
