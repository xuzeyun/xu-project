<template>
  <BaseChart :options="chartOptions"></BaseChart>
</template>

<script setup>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { ElMessage, genFileId } from 'element-plus'

const chartOptions = reactive({
  // title: {
  //   text: 'Referer of a Website',
  //   subtext: 'Fake Data',
  //   left: 'center'
  // },
  backgroundColor: '',
  color: ['#287de6', '#3eb177', '#fbd318', '#d93f51'],
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'right'
  },
  grid: {
    top: '4%',
    left: '4%',
    right: '4%',
    bottom: '4%',
    // containLabel: true
  },
  series: [
    {
      name: '',
      type: 'pie',
      radius: '80%',
      data: [],
      label: {
        show: true,
        // position: 'inside',
        color: '#ffffff',
        formatter(param) {
          return param.name + ' '+param.value+' (' + param.percent * 2 + '%)';
        }
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})

defineExpose({
  chartOptions
})
</script>

