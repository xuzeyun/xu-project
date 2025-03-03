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
  color: ['#287def', '#08ff6e'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
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
      name: '总库房',
      data: [],
      type: 'bar'
    },
    {
      name: '已用库房',
      data: [],
      type: 'bar'
    }
  ]
})

defineExpose({
  chartOptions
})
</script>

