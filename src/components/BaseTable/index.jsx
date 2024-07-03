import { ref, onMounted, reactive } from 'vue'
// , defineComponent, onMounted
import { ElRow, ElCol, ElTable, ElTableColumn, ElPagination } from 'element-plus'

const BaseTable = {
  // props: {
  //   myProp: String
  // },
  setup(props, { attrs }) {
    onMounted(() => {
      console.log(attrs, 'attrs')
      initData(attrs.page, attrs.limit)
    })

    const tableData = ref([])
    const sortObj = reactive({})
    const queryObj = reactive({})

    // 分页功能
    const currentPage = ref(1)
    const pageSize = ref(10)
    const pageObj = reactive({
      page: 1,
      limit: 10,
      total: 0
    })
    const handleSizeChange = val => {
      pageSize.value = val
    }
    const handleCurrentChange = val => {
      currentPage.value = val
    }

    const initData = async (thisPage, thisLimit) => {
      const { list, page, limit, total } = await attrs.getTableData(thisPage, thisLimit, sortObj, queryObj)
      tableData.value = list
      pageObj.page = page || 1
      pageObj.limit = limit || 10
      pageObj.total = total || 0
    }

    return () => {
      if (!attrs.config) return '缺少config配置'
      return (
        <>
          <ElRow>
            {/* 表格 */}
            <ElTable {...attrs.config} data={tableData.value}>
              {/* 判断 如果有列配置 循环列 */}
              {attrs.columns && attrs.columns.length > 0
                ? attrs.columns.map(item => {
                    return <ElTableColumn {...item} key={item.prop}></ElTableColumn>
                  })
                : '请配置列'}
            </ElTable>
          </ElRow>
          <ElRow style='justify-content: right;'>
            {attrs.isPage ? (
              <ElPagination
                vModel:currentPage={currentPage.value}
                vModel:pageSize={pageSize.value}
                size={pageObj.limit}
                total={pageObj.total}
                pageSizes={pageObj.sizes}
                background={'background'}
                layout={'total, sizes, prev, pager, next, jumper'}
                onSizeChange={handleSizeChange}
                onCurrentChange={handleCurrentChange}
              ></ElPagination>
            ) : null}
          </ElRow>
        </>
      )
    }
  }
}

export default BaseTable

// 渲染函数
// export default {
//   setup(props, { attrs }) {
//     // const text = ref('hi')
//     return () => h(ElTable, {...attrs.config},
//       attrs.columns.map((item) => {
//         return h(ElTableColumn, { key: item.prop, ...item })
//       })
//     )
//   }
// }
