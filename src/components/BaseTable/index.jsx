import { ref, onMounted, reactive, defineComponent } from 'vue'
import { ElTable, ElTableColumn, ElPagination } from 'element-plus'
// import Filter from './Filter.vue'

const BaseTable = defineComponent({
  // props: {
  //   myProp: String
  // },
  name: 'BaseTable',
  setup(props, { attrs }) {
    onMounted(() => {
      console.log(attrs, 'attrs')

      pageObj.page = attrs.page.page || 1
      pageObj.limit = attrs.page.limit || 10
      pageObj.sizes = attrs.page.sizes || []

      loadTableData(pageObj.page, pageObj.limit)
    })

    const tableRef = ref(null)
    const tableData = ref([])
    const sortObj = reactive({})
    const queryObj = reactive({})
    const loading = ref(false)

    // 分页功能数据
    const pageObj = reactive({
      page: 0,
      limit: 0,
      total: 0,
      sizes: []
    })

    // 切换每页展示条数
    const handleSizeChange = val => {
      pageObj.limit = val
      loadTableData(pageObj.page, pageObj.limit)
    }
    // 页面跳转
    const handleCurrentChange = val => {
      pageObj.page = val
      loadTableData(pageObj.page, pageObj.limit)
    }

    // 初始化数据
    const loadTableData = async (thisPage, thisLimit) => {
      // 请求接口
      // loading.value = true
      const { list, total } = await attrs.getTableData(thisPage, thisLimit, sortObj, queryObj)
      // loading.value = false
      // 赋值
      tableData.value = list
      pageObj.total = total || 0
      console.log(tableData.value)
    }

    // 重新加载数据
    const reload = flag => {
      // flag true第一页请求 false当前页请求
      if (flag) pageObj.page = 1
      loadTableData(pageObj.page, pageObj.limit)
    }

    return {
      attrs,
      pageObj,
      tableData,
      sortObj,
      queryObj,
      tableRef,
      // loading,
      reload,
      handleSizeChange,
      handleCurrentChange
    }
  },
  render() {
    return [
      <div class="g-table-self">
        {/* 表格 */}
        <ElTable ref="tableRef" {...this.attrs.config} data={this.tableData}>
          {this.attrs.config.selection ? <ElTableColumn type="selection" width="50" align="center"></ElTableColumn> : null}
          <ElTableColumn label="#" type="index" align="center" width="60"></ElTableColumn>
          {/* 判断 如果有列配置 循环列 */}
          {this.attrs.columns && this.attrs.columns.length > 0
            ? this.attrs.columns.map(item => {
                // 单级表头 和 多级表头（目前支持二级，待优化）
                return !item.children ? (
                  <ElTableColumn {...item} key={item.prop}>
                    {{
                      default: scope => this.$slots[item.prop]?.(scope)
                    }}
                  </ElTableColumn>
                ) : (
                  <ElTableColumn {...item} key={item.prop}>
                    {item.children.map(itemChild => {
                      return (
                        <ElTableColumn {...itemChild} key={itemChild.prop}>
                          {{
                            default: scope => this.$slots[itemChild.prop]?.(scope)
                          }}
                        </ElTableColumn>
                      )
                    })}
                  </ElTableColumn>
                )
              })
            : '请配置列'}
        </ElTable>
      </div>,
      this.attrs.page.show ? (
        <div class="g-table-pafer">
          <ElPagination
            vModel:currentPage={this.pageObj.page}
            vModel:pageSize={this.pageObj.limit}
            total={this.pageObj.total}
            pageSizes={this.pageObj.sizes}
            background={'background'}
            layout={'total, sizes, prev, pager, next, jumper'}
            onSizeChange={this.handleSizeChange}
            onCurrentChange={this.handleCurrentChange}
            // size={attrs.config.size}
            size=""
          ></ElPagination>
        </div>
      ) : null
    ]
  }
})

export default BaseTable
