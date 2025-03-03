<template>
  <BaseChart :options="chartOptions"></BaseChart>
</template>

<script setup>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { ElMessage, genFileId } from 'element-plus'

const chartOptions = reactive({
  backgroundColor: '',
  grid: {
    top: '20%',
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  color: ['#287def', '#08ff6e'],
  legend: {},
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '温度',
      data: [],
      type: 'line'
    },
    {
      name: '湿度',
      data: [],
      type: 'line'
    }
  ]
})

defineExpose({
  chartOptions
})
</script>

