<template>
  <div class="chart" ref="chartRef"></div>
</template>
<script setup>
import { ref, defineProps, onMounted } from 'vue'
import * as Echarts from 'echarts'

// import "echarts/lib/chart/bar";
// import "echarts-liquidfill";
// 引入提示框和标题组件
// import "echarts/lib/component/tooltip";
// import "echarts/lib/component/title";

const props = defineProps({
  type: {
    type: String,
    default: () => ''
  },
  options: {
    type: Object,
    default: () => ({})
  },
  mapData: {
    type: Object,
    default: () => ({})
  }
})

const emits = defineEmits(["getClickDate"]);

// 数据更新后重新渲染图表
watch(props.options, (count, prevCount) => {
  initData()
})

const chartRef = ref(null)
let myChart = null
onMounted(() => {
  myChart = Echarts.init(chartRef.value, props.type === 'map' ? 'light' : 'dark')
  initData()
  mapAutoSize()
})

// 渲染
const initData = () => {
  if (props.type === 'map') {
    Echarts.registerMap('china', props.mapData)
    myChart.on('click', params => {
      emits("getClickData", params);
    })
  }
  myChart.setOption(props.options)
  
}

const mapAutoSize = () => {
  const viewElem = document.body;
  const resizeObserver = new ResizeObserver(() => {
    myChart.resize();
  })
  resizeObserver.observe(viewElem);
}
</script>
<style lang="scss" scoped>
.chart {
  flex: 1 1 100%;
  height: 100%;
}
</style>
