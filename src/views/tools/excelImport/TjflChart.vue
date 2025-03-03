<template>
  <BaseChart :options="chartOptions"></BaseChart>
</template>

<script setup>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { ElMessage, genFileId } from 'element-plus'

import * as echarts from 'echarts'


const chartOptions = reactive({
  backgroundColor: '',
  // title: {
  //   text: 'World Population'
  // },
  // tooltip: {
  //   trigger: 'axis',
  //   axisPointer: {
  //     type: 'shadow'
  //   }
  // },
  // // legend: {},
  // grid: {
  //   top: '4%',
  //   left: '3%',
  //   right: '4%',
  //   bottom: '3%',
  //   containLabel: true
  // },
  // xAxis: {
  //   type: 'value',
  //   boundaryGap: [0, 0.01]
  // },
  // yAxis: {
  //   type: 'category',
  //   data: ['车辆', '雷达', '单兵中继电台', '电池', '药品']
  // },
  // series: [
  //   {
  //     name: '2011',
  //     type: 'bar',
  //     data: [18203, 23489, 29034, 104970, 131744]
  //   },
  // ]


  xAxis: {
    max: 'dataMax'
  },
  color: ['#409eff'],
  grid: {
    top: '4%',
    left: '3%',
    right: '6%',
    bottom: '3%',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  yAxis: {
    type: 'category',
    data: [],
    inverse: true,
    // max: 9 // only the largest 3 bars will be displayed
  },
  series: [
    {
      realtimeSort: true,
      name: '数量（台/套）',
      type: 'bar',
      barWidth: '16',
      
      data: [],
      label: {
        show: true,
        position: 'inside',
        color: '#ffffff'
      },
      itemStyle: {
        barBorderRadius: [0,10,10,0],
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#15377c' },
          { offset: 0.5, color: '#245cab' },
          { offset: 1, color: '#3d95e8' }
        ])
      },
      // label: {
      //   show: true,
      //   position: 'center',
      //   valueAnimation: true
      // }
    }
  ],
  // legend: {
  //   show: true
  // },
  // animationDuration: 0,
  // animationDurationUpdate: 3000,
  // animationEasing: 'linear',
  // animationEasingUpdate: 'linear'
})

defineExpose({
  chartOptions
})
</script>

