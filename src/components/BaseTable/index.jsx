import { h, defineProps, defineComponent } from 'vue'
import {
  ElTable
} from 'element-plus'

const BaseTable = defineComponent({
  props: {
    myProp: String
  },
  setup(props, { attrs }) {
    return () => (
      <ElTable {...attrs}>
        111
      </ElTable>
    );
  }
});



export default BaseTable;