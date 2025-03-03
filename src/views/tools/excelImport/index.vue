<template>
  <el-button @click="importHandle" size="small" class="import-btn">导入</el-button>
  <div class="cent">
    <!-- 悬浮 -->
    <div class="fiexd-box cpk" v-if="winCkdw && winCkdw.length > 0">
      <div class="header">{{ winCkdw[0][0] }}</div>
      <div>
        <el-row :gutter="10">
          <el-col :span="12">
            <h3>库存总数</h3>
          </el-col>
          <el-col :span="12" align="right">
            <b class="text-1">{{ winCkdw[0][1] }}</b>
          </el-col>
          <el-col :span="12">
            <h3>库房</h3>
          </el-col>
          <el-col :span="12" align="right">
            <b class="text-2">{{ winCkdw[0][2] }}</b>
          </el-col>
          <el-col :span="12">
            <h3>货位</h3>
          </el-col>
          <el-col :span="12" align="right">
            <b class="text-3">{{ winCkdw[0][3] }}</b>
          </el-col>
          <el-col :span="12">
            <h3>本月入库</h3>
          </el-col>
          <el-col :span="12" align="right">
            <b class="text-4">{{ winCkdw[0][4] }}</b>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="fiexd-box bjk" v-if="winCkdw && winCkdw.length > 0">
      <div class="header">{{ winCkdw[1][0] }}</div>
      <div>
        <el-row :gutter="10">
          <el-col :span="12">
            <h3>库存总数</h3>
          </el-col>
          <el-col :span="12" align="right">
            <b class="text-1">{{ winCkdw[1][1] }}</b>
          </el-col>
          <el-col :span="12">
            <h3>库房</h3>
          </el-col>
          <el-col :span="12" align="right">
            <b class="text-2">{{ winCkdw[1][2] }}</b>
          </el-col>
          <el-col :span="12">
            <h3>货位</h3>
          </el-col>
          <el-col :span="12" align="right">
            <b class="text-3">{{ winCkdw[1][3] }}</b>
          </el-col>
          <el-col :span="12">
            <h3>本月入库</h3>
          </el-col>
          <el-col :span="12" align="right">
            <b class="text-4">{{ winCkdw[1][4] }}</b>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="fiexd-box sxk" v-if="winCkdw && winCkdw.length > 0">
      <div class="header">{{ winCkdw[2][0] }}</div>
      <div>
        <el-row :gutter="10">
          <el-col :span="12">
            <h3>库存总数</h3>
          </el-col>
          <el-col :span="12" align="right">
            <b class="text-1">{{ winCkdw[2][1] }}</b>
          </el-col>
          <el-col :span="12">
            <h3>库房</h3>
          </el-col>
          <el-col :span="12" align="right">
            <b class="text-2">{{ winCkdw[2][2] }}</b>
          </el-col>
          <el-col :span="12">
            <h3>货位</h3>
          </el-col>
          <el-col :span="12" align="right">
            <b class="text-3">{{ winCkdw[2][3] }}</b>
          </el-col>
          <el-col :span="12">
            <h3>本月入库</h3>
          </el-col>
          <el-col :span="12" align="right">
            <b class="text-4">{{ winCkdw[2][4] }}</b>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="map-left">
      <el-card header="仓储实力">
        <!-- <div slot="header" class="g-mb10 card-header">仓储实力</div> -->
        <div style="height: 175px">
          <table class="g-mytable" width="100%" style="height: auto">
            <tr style="background: #1c4996">
              <th></th>
              <th>库容总量</th>
              <th>库容余量</th>
              <th>良品率</th>
            </tr>
            <tr v-for="(item, index) in winCcsl" :key="index">
              <th>{{ item[0] }}</th>
              <td align="center" class="g-primary" style="color: #fff">{{ item[1] }}<span>m³</span></td>
              <td align="center" class="g-warning" style="color: #08ff6e">{{ item[2] }}<span>m³</span></td>
              <td align="center" class="g-success" style="color: #20c3ff">{{ item[3] }}<span>%</span></td>
            </tr>
          </table>
        </div>
      </el-card>
      <el-card header="重要装备">
        <div style="height: 220px">
          <TjflChart ref="tjflRef"></TjflChart>
        </div>
      </el-card>

      <el-card header="装备质量">
        <div style="height: 175px">
          <KrylChart ref="krylRef"></KrylChart>
        </div>
      </el-card>
    </div>

    <div class="map-right">
      <el-card header="出入库统计">
        <div style="height: 180px">
          <CrktjChart ref="crktjRef"></CrktjChart>
        </div>
      </el-card>
      <el-card header="库房利用率">
        <div style="height: 210px">
          <RkChart ref="rkRef"></RkChart>
        </div>
      </el-card>

      <el-card header="7日平均温度湿度">
        <div style="height: 180px">
          <CkChart ref="ckRef"></CkChart>
        </div>
      </el-card>
    </div>

    <Map ref="mapRef" @getClickData="getClickData"></Map>
  </div>

  <!-- 弹窗组件 -->
  <BaseDialog ref="importDialogRef" v-bind="importDialogConfig">
    <!-- 表单组件 -->
    <div>
      <el-upload accept=".xls,.xlsx" :auto-upload="false" drag action="#" ref="importRef" show-file-list :limit="1" :on-change="handleFileChange" v-model:file-list="fileList">
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">拖拽文件至该处或 <em>点击该处上传</em></div>
        <template #tip>
          <div class="el-upload__tip">支持xls/xlsx文件格式</div>
        </template>
      </el-upload>
    </div>
    <template #footer>
      <el-row>
        <el-col :span="12" align="left">
          <el-button type="success" @click="downloadHandle">下载数据模板</el-button>
        </el-col>
        <el-col :span="12" align="right">
          <el-button type="primary" @click="importSubmitHandle">确认</el-button>
          <el-button @click="importDialogConfig.show = false">取消</el-button>
        </el-col>
      </el-row>
    </template>
  </BaseDialog>
</template>

<script setup>
import { defineComponent, onMounted, reactive, ref, nextTick } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage, genFileId } from 'element-plus'
import { Timer } from '@element-plus/icons-vue'
const { $Api } = getCurrentInstance().appContext.config.globalProperties
import { format } from 'date-fns'

import * as XLSX from 'xlsx/xlsx.mjs'
// const FileSaver = require('file-saver')

// import * as echarts from 'echarts'
// import china from '@/assets/map/china.json'
// import Chart from './Chart.vue'
// import { appInfo } from "/public/appInfo.js"

import Map from './Map.vue'
import TjflChart from './TjflChart.vue'
import KrylChart from './KrylChart.vue'
import CrktjChart from './CrktjChart.vue'
import RkChart from './RkChart.vue'
import CkChart from './CkChart.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mapRef = ref(null)
onMounted(() => {
  getCurTime()

  setTimeout(() => {
    showPageData()
  }, 500)

  getData()
})

// 本地默认数据
let dwList = [
  // 原平
  { jd: '112.723', wd: '38.7315' },
  // 北京
  { jd: '116.4074', wd: '39.9042' },
  // 西安
  { jd: '108.9398', wd: '34.3416' }
]

// 本地加载完成后数据
const chartData = ref([])

/**
 * ==================================================================
 * @areaname:			当前时间展示
 * @description:		显示当前 年月日时分秒
 * ------------------------------------------------------------------
 * @author: rt@xzy		@time: 2024/08/28 10:26:36
 * ==================================================================
 */

// 时间展示
const dateTime = ref('0000-00-00 00:00:00')
const getCurTime = () => {
  setInterval(() => {
    dateTime.value = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  }, 1000)
}

// 获取地图数据
const getData = () => {
  if (localStorage.getItem('dwList')) {
    // 如果本地存储中有数据，读取存储中数据
    chartData.value = JSON.parse(localStorage.getItem('dwList'))
    console.log(localStorage.getItem('dwList'), 'localStorage.getItem')
  } else {
    // 如果没有获取页面数据
    chartData.value = dwList
    localStorage.setItem('dwList', JSON.stringify(chartData.value))
  }

  // 获取完数据后重新渲染地图
  nextTick(() => {
    mapRef.value.mapOptions.series[0].markPoint.data = []
    chartData.value.forEach(item => {
      mapRef.value.mapOptions.series[0].markPoint.data.push({
        show: false,
        name: '仓库点位信息',
        coord: [item.jd, item.wd],
        // symbol: symbolFlagPath,icon_ck.png
        symbol: 'image://icon_ck.png', // 标注图片地址路径
        symbolSize: [16, 16],
        itemStyle: {
          color: '#f56c6c'
        },
        // value: [item.ckmc, item.krzl, item.kryl, item.lpl, item.jd, item.wd, item.id],
        value: [],
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: false
          }
        }
      })
    })

    // 计算总数
    // let [krzlTotal, krylTotal, lplTotal] = [0, 0, 0]
    // chartData.value.forEach(item => {
    //   krzlTotal += Number(item.krzl)
    //   krylTotal += Number(item.kryl)
    //   lplTotal += Number(item.lpl)
    // })
    // totalObj.krzlTotal = Number(krzlTotal.toFixed(2))
    // totalObj.krylTotal = Number(krylTotal.toFixed(2))
    // totalObj.lplTotal = Number((lplTotal / 3).toFixed(2))

    // console.log(mapRef.value.mapOptions.series[0].markPoint.data, '更新后')
  })
}

// 点击地图仓库
const getClickData = data => {}

/**
 * ==================================================================
 * @areaname:			新增弹窗
 * @description:		代码区域介绍
 * ------------------------------------------------------------------
 * @author: rt@xzy		@time: 2024/08/15 14:23:55
 * ==================================================================
 */

// 导入数据 ================================================================================
const importHandle = () => {
  importDialogConfig.show = true
}

// 弹窗配置
const importDialogRef = ref(null)
const importDialogConfig = reactive({
  show: false,
  config: {
    title: '导入数据',
    width: '600',
    draggable: true,
    destroyOnClose: true,
    // fullscreen: true,
    onClose: () => {
      importDialogConfig.show = false
    }
  }
})

const importRef = ref(null)
const fileList = ref([])
const importData = ref([])

// 上传确认键
const importSubmitHandle = () => {
  if (fileList.value.length === 0) {
    ElMessage({
      message: '请先选择文件',
      type: 'warning'
    })
    return
  }
  if (!(fileName === '数据模板.xlsx' || fileName === '数据模板.xls')) {
    return ElMessage({
      message: '请选择正确文件',
      type: 'error'
    })
  }
  // 数据存入 本地存储
  localStorage.setItem('pageData', JSON.stringify(importData.value))
  ElMessage({
    message: '数据导入成功',
    type: 'success'
  })
  // 关闭窗口
  fileList.value = []
  importDialogConfig.show = false
  // importRef.value.submit()
  // 渲染数据
  showPageData()
}

let fileName = ''

// 文件上传前
const handleFileChange = file => {
  fileName = file.name

  const reader = new FileReader()
  reader.onload = e => {
    const data = new Uint8Array(e.target.result)
    const workbook = XLSX.read(data, { type: 'array' })

    // 循环sheet页获取数据
    workbook.SheetNames.forEach((item, index) => {
      const sheet = workbook.SheetNames[index]
      const worksheet = workbook.Sheets[sheet]
      importData.value.push(XLSX.utils.sheet_to_json(worksheet, { header: 1 }))
    })
  }

  reader.readAsArrayBuffer(file.raw)
}

// 仓储实力（1）
const winCcsl = ref([])

// 重要装备（2）
const winTjfl = ref({
  labels: [],
  values: []
})
const tjflRef = ref(null)

// 装备质量（3）
const winKryl = ref([])
const krylRef = ref(null)

// 出入库统计（4）
const crktjRef = ref(null)
const winCrktj = ref([])

// 库房利用率（5）
const winRk = ref({
  labels: [],
  values: [],
  values2: []
})
const rkRef = ref(null)

// 7日平均温度湿度（6）
const winCk = ref({
  labels: [],
  values: [],
  values2: []
})
const ckRef = ref(null)

// 仓库信息（7）
const winCkdw = ref([])

// 拉取本地存储渲染页面
const showPageData = () => {
  let data = {}
  if (localStorage.getItem('pageData')) {
    let list = JSON.parse(localStorage.getItem('pageData'))
    console.log(list, 'listlistlistlist')
    // 如果本地存储中有数据，读取存储中数据
    data.ccsl = list[0]
    data.zyzb = list[1]
    data.zbzl = list[2]
    data.crktj = list[3]
    data.kflyl = list[4]
    data.wdsd = list[5]
    data.dwxx = list[6]
  } else {
    return ElMessage.warning('请您导入数据')
  }

  // 仓储实力
  winCcsl.value = data.ccsl.filter((item, index) => {
    return index > 0
  })

  // 重要装备
  let zyzb = data.zyzb.filter((item, index) => {
    return index > 0
  })
  tjflRef.value.chartOptions.yAxis.data = []
  tjflRef.value.chartOptions.series[0].data = []
  zyzb.forEach(item => {
    tjflRef.value.chartOptions.yAxis.data.push(item[0])
    tjflRef.value.chartOptions.series[0].data.push(item[1])
  })

  // 装备质量
  let zbzl = data.zbzl.filter((item, index) => {
    return index > 0
  })
  krylRef.value.chartOptions.series[0].data = []
  zbzl.forEach(item => {
    krylRef.value.chartOptions.series[0].data.push({ name: item[0], value: item[1] })
  })

  // 出入库统计
  let crktj = data.crktj.filter((item, index) => {
    return index > 0
  })
  crktjRef.value.chartOptions.series[0].data = []
  crktj.forEach(item => {
    crktjRef.value.chartOptions.series[0].data.push({ name: item[0], value: item[1] })
  })

  // 库房利用率
  let kflyl = data.kflyl.filter((item, index) => {
    return index > 0
  })
  rkRef.value.chartOptions.xAxis.data = []
  rkRef.value.chartOptions.series[0].data = []
  rkRef.value.chartOptions.series[1].data = []
  kflyl.forEach(item => {
    rkRef.value.chartOptions.xAxis.data.push(item[0])
    rkRef.value.chartOptions.series[0].data.push(item[1])
    rkRef.value.chartOptions.series[1].data.push(item[2])
  })

  // 7日平均温度湿度
  let wdsd = data.wdsd.filter((item, index) => {
    return index > 0
  })
  ckRef.value.chartOptions.xAxis.data = []
  ckRef.value.chartOptions.series[0].data = []
  ckRef.value.chartOptions.series[1].data = []
  wdsd.forEach(item => {
    ckRef.value.chartOptions.xAxis.data.push(item[0])
    ckRef.value.chartOptions.series[0].data.push(item[1])
    ckRef.value.chartOptions.series[1].data.push(item[2])
  })

  // 点位
  winCkdw.value = data.dwxx.filter((item, index) => {
    return index > 0
  })
  console.log(winCkdw.value, 'winCkdw.value')
}

// 下载数据模板
const downloadHandle = () => {
  window.location.href = '/data/数据模板.xlsx'
}
</script>

<style lang="scss" scoped>
.import-btn {
  position: absolute;
  right: 20px;
  top: 60px;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  h1 {
    // height: 60px;
    font-size: 30px;
    text-align: center;
    // line-height: 60px;
    letter-spacing: 2px;
    text-indent: -9999px;
    // color: #152956;
  }
  .logo {
    display: block;
    width: 35px;
    height: 35px;
    background-size: 100% 100%;
  }
}
.cent {
  height: 100%;
  width: 100%;
  // background-color: #d1e8ff;
  padding: 0;
  overflow: auto;
  position: relative;
  .map-background-bg {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
  }
  .map-background-bg-circle {
    background-color: rgba(256, 256, 256, 0.2);
    border-radius: 100%;
    position: absolute;
    left: 48%;
    top: 50%;
    transform: translate(-50%, -50%);
    filter: blur(1px);

    &.is-1 {
      width: 85vh;
      height: 85vh;
      z-index: 1;
    }

    &.is-2 {
      width: 110vh;
      height: 110vh;
      z-index: 2;
    }
  }

  .fiexd-box {
    position: absolute;
    width: 200px;
    height: 226px;
    border: #3881f8 1px solid;
    background: rgba(32, 84, 170, 0.5);
    padding: 10px 10px 0px;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 40px;
    &::after {
      position: absolute;
      content: '';
      display: block;
      width: 1px;
      background: #38a9f8;
    }
    &::before {
      position: absolute;
      content: '';
      display: block;
      height: 1px;
      background: #38a9f8;
    }
    .header {
      text-align: left;
      margin-bottom: 10px;
      line-height: 20px;
      font-size: 16px;
      font-weight: bold;
    }
    h3 {
      font-size: 14px;
      font-weight: normal;
      // text-align: center;
      margin-bottom: 3px;
      display: flex;
      align-items: center;
      img {
        width: 18px;
        height: 18px;
        margin-right: 3px;
      }
    }
    b {
      // font-size: 14px;
      font-size: 14px;
      display: block;
      // text-align: center;
    }
    .text-1 {
      color: #36a3ff;
    }
    .text-2 {
      color: #e34e4e;
    }
    .text-3 {
      color: #fbd318;
    }
    .text-4 {
      color: #08ff6e;
    }
  }
  .cpk {
    left: 50%;
    top: 50%;
    z-index: 9;
    margin-left: -460px;
    margin-top: -370px;
    &::after {
      left: 100px;
      height: 140px;
      bottom: -140px;
    }
    &::before {
      left: 100px;
      bottom: -140px;
      width: 480px;
    }
  }
  .bjk {
    left: 50%;
    top: 50%;
    margin-left: -120px;
    margin-top: -370px;
    z-index: 9;
    &::after {
      left: 100px;
      height: 98px;
      bottom: -98px;
    }
    &::before {
      left: 100px;
      bottom: -98px;
      width: 200px;
    }
  }
  .sxk {
    left: 50%;
    top: 50%;
    margin-left: -460px;
    margin-top: 160px;
    z-index: 9;
    &::after {
      left: 100px;
      height: 145px;
      top: -145px;
    }
    &::before {
      left: 100px;
      top: -145px;
      width: 410px;
    }
  }
}

.map-left {
  // padding: 20px 0;
  position: absolute;
  height: 100%;
  top: 0px;
  bottom: 0;
  left: 0px;
  width: 413px;

  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 1;
  justify-content: center;
  // b {
  //   font-size: 20px;
  //   display: block;
  //   text-align: right;
  // }
  .mini-card {
    // background: var(--el-border-color);
    border: var(--el-border-color) 1px solid;
    padding: 10px 4px;
    border-radius: 4px;
    h3 {
      font-size: 14px;
      font-weight: normal;
      text-align: center;
      margin-bottom: 3px;
    }
    b {
      font-size: 26px;
      display: block;
      text-align: center;
    }
  }
}

.map-right {
  // padding: 0px 0;
  position: absolute;
  height: 100%;
  width: 413px;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  z-index: 1;
  .card-wrap {
    border: var(--el-border-color) 1px solid;
    padding: 8px;
    border-radius: 6px;
    .mini-card {
      // background: var(--el-border-color);
      border: var(--el-border-color) 1px solid;
      padding: 10px 4px;
      border-radius: 4px;
      h3 {
        font-size: 14px;
        font-weight: normal;
        text-align: center;
        margin-bottom: 3px;
      }
      b {
        font-size: 26px;
        display: block;
        text-align: center;
      }
    }
  }
}
.fiexd-box {
  // display: none;
  .card-header {
    text-align: center !important;
  }
}

::v-deep(.el-card) {
  border: none;
  border-radius: 0;
  background: #152b56;
  .card-header {
    height: 28px;
    line-height: 26px;
    // background-color: linear-gradient(to right, red, blue);
    // background-color: red;
    background-repeat: no-repeat, no-repeat;
    background-size:
      auto 70%,
      auto;
    background-position:
      8px center,
      left center;
    text-indent: 2em;
    font-size: 16px;
    letter-spacing: 1px;
  }
  .el-card__header {
    height: 41px;
    line-height: 40px;
    padding: 0px;
    text-indent: 2.2em;
    border: none;
  }
  .el-card__body {
    padding: 14px;
  }
}
</style>
