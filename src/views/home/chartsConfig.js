// color: [ "#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#3ba272" ],

// 各区域物资总数量统计
export const wzzslOpt = {
  title: {
    show: false
  },
  grid: {
    top: "10%",
    bottom: "15%",
  },
  
  legend: {
    show: false,
    data: ['计划数量', '清点数量'],
    left: "right",
    top: "bottom",
  },
  tooltip: {},
  xAxis: {
    data: ['东部', '南部', '西部', '北部', '中部'],
  },
  yAxis: {},
  series: [{
      name: '数量',
      type: 'bar',
      stack: 'one',
      data: [
        { value: 23, itemStyle: { color: '#5470c6' } },
        { value: 34, itemStyle: { color: '#91cc75' } },
        { value: 34, itemStyle: { color: '#fac858' } },
        { value: 44, itemStyle: { color: '#ee6666' } },
        { value: 12, itemStyle: { color: '#73c0de' } },
      ]
    },
  ]
};

// 点位top
export const dwjsTopOpt = {
  title: {
    text: "各区域物资总数量统计",
    left: "center",
    show: false
  },
  grid: {
    top: "10%",
    bottom: "15%",
  },
  
  legend: {
    show: false,
    data: ['计划数量', '清点数量'],
    left: "right",
    top: "bottom",
  },
  tooltip: {},
  xAxis: {
    data: ['点位1', '点位2', '点位3', '点位4', '点位5', '点位6', '点位7', '点位8', '点位9', '点位10'],
    // name: '区域',
    // axisLabel: {
    //   rotate: 30,
    // },
    // axisLine: {
    //   onZero: true
    // },
    // splitLine: {
    //   show: false
    // },
    // splitArea: {
    //   show: false
    // },
  },
  yAxis: {},
  series: [{
      name: '数量',
      type: 'bar',
      stack: 'one',
      data: [
        { value: 23, itemStyle: { color: '#5470c6' } },
        { value: 34, itemStyle: { color: '#91cc75' } },
        { value: 34, itemStyle: { color: '#fac858' } },
        { value: 44, itemStyle: { color: '#ee6666' } },
        { value: 12, itemStyle: { color: '#73c0de' } },
        { value: 23, itemStyle: { color: '#5470c6' } },
        { value: 34, itemStyle: { color: '#91cc75' } },
        { value: 34, itemStyle: { color: '#fac858' } },
        { value: 44, itemStyle: { color: '#ee6666' } },
        { value: 12, itemStyle: { color: '#73c0de' } },
      ]
    },
    // {
    //   name: '清点数量',
    //   type: 'bar',
    //   stack: 'one',
    //   data: []
    // }
  ]
};

// 单位top
export const danweijsTopOpt = {
  title: {
    text: "各区域物资总数量统计",
    left: "center",
    show: false
  },
  grid: {
    top: "10%",
    bottom: "15%",
  },
  
  legend: {
    show: false,
    data: ['计划数量', '清点数量'],
    left: "right",
    top: "bottom",
  },
  tooltip: {},
  xAxis: {
    data: ['302', '303', '304', '305', '306', '307', '308', '309', '310', '311'],
    // name: '区域',
    // axisLabel: {
    //   rotate: 30,
    // },
    // axisLine: {
    //   onZero: true
    // },
    // splitLine: {
    //   show: false
    // },
    // splitArea: {
    //   show: false
    // },
  },
  yAxis: {},
  series: [{
      name: '数量',
      type: 'bar',
      stack: 'one',
      data: [
        { value: 23, itemStyle: { color: '#5470c6' } },
        { value: 34, itemStyle: { color: '#91cc75' } },
        { value: 34, itemStyle: { color: '#fac858' } },
        { value: 44, itemStyle: { color: '#ee6666' } },
        { value: 12, itemStyle: { color: '#73c0de' } },
        { value: 23, itemStyle: { color: '#5470c6' } },
        { value: 34, itemStyle: { color: '#91cc75' } },
        { value: 34, itemStyle: { color: '#fac858' } },
        { value: 44, itemStyle: { color: '#ee6666' } },
        { value: 12, itemStyle: { color: '#73c0de' } },
      ]
    },
    // {
    //   name: '清点数量',
    //   type: 'bar',
    //   stack: 'one',
    //   data: []
    // }
  ]
};

// 区域点位数量
export const qydwslOpt = {
  title: {
    show: false
  },
  grid: {
    top: "10%",
    bottom: "15%",
  },
  
  legend: {
    show: false,
    data: ['计划数量', '清点数量'],
    left: "right",
    top: "bottom",
  },
  tooltip: {},
  xAxis: {
    data: ['东部', '南部', '西部', '北部', '中部'],
  },
  yAxis: {},
  series: [{
      name: '数量',
      type: 'bar',
      stack: 'one',
      data: [
        { value: 23, itemStyle: { color: '#5470c6' } },
        { value: 34, itemStyle: { color: '#91cc75' } },
        { value: 34, itemStyle: { color: '#fac858' } },
        { value: 44, itemStyle: { color: '#ee6666' } },
        { value: 12, itemStyle: { color: '#73c0de' } },
      ]
    },
  ]
};


// 区域接收点位
export const qyjsdwOpt = {
  title: {
    show: false
  },
  grid: {
    top: "10%",
    bottom: "15%",
  },
  
  legend: {
    show: false,
    data: ['计划数量', '清点数量'],
    left: "right",
    top: "bottom",
  },
  tooltip: {},
  xAxis: {
    data: ['东部', '南部', '西部', '北部', '中部'],
  },
  yAxis: {},
  series: [{
      name: '数量',
      type: 'bar',
      stack: 'one',
      data: [
        { value: 23, itemStyle: { color: '#5470c6' } },
        { value: 34, itemStyle: { color: '#91cc75' } },
        { value: 34, itemStyle: { color: '#fac858' } },
        { value: 44, itemStyle: { color: '#ee6666' } },
        { value: 12, itemStyle: { color: '#73c0de' } },
      ]
    },
  ]
};

