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
  options: {
    type: Object,
    default: () => ({})
  }
})

let myChart
const chartRef = ref(null)
onMounted(() => {
  myChart = Echarts.init(chartRef.value)
  myChart.setOption(props.options)
})
</script>
<style lang="scss" scoped>
.chart {
  flex: 1 1 100%;
  height: 100%;
}
</style>
