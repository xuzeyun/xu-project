import { ref, onMounted, reactive, defineComponent } from 'vue'
import { ElRow, ElTable, ElTableColumn, ElPagination } from 'element-plus'

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

    const tableData = ref([])
    const sortObj = reactive({})
    const queryObj = reactive({})

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
      const { list, total } = await attrs.getTableData(thisPage, thisLimit, sortObj, queryObj)
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
      reload,
      handleSizeChange,
      handleCurrentChange
    }
  },
  render() {
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <ElRow>
          {/* 表格 */}
          <ElTable {...this.attrs.config} data={this.tableData}>
            <ElTableColumn label="#" type="index" align="center" width="60"></ElTableColumn>
            {/* 判断 如果有列配置 循环列 */}
            {this.attrs.columns && this.attrs.columns.length > 0
              ? this.attrs.columns.map(item => {
                  return (
                    <ElTableColumn {...item} key={item.prop}>
                      {{
                        default: (scope) => this.$slots[item.prop]?.(scope)
                      }}
                    </ElTableColumn>
                  )
                })
              : '请配置列'}
          </ElTable>
        </ElRow>
        <ElRow style="justify-content: right;">
          {this.attrs.page.show ? (
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
          ) : null}
        </ElRow>
      </div>
    )
  }
})

export default BaseTable
