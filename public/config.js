// =========================================================== 左侧
// 仓储实力（左1）
var win_ccsl = [
  {
    title: '总体情况',
    krzl: '153293',
    kryl: '23344',
    lpl: '99'
  },
  {
    title: '北京库',
    krzl: '73293',
    kryl: '12344',
    lpl: '100'
  },
  {
    title: '常平库',
    krzl: '51123',
    kryl: '5323',
    lpl: '99'
  },
  {
    title: '陕西库',
    krzl: '31356',
    kryl: '4965',
    lpl: '100'
  }
]

// 重要装备（左2）
var win_tjfl = {
  labels: ['单兵器具', '医疗仪器', '冷兵', '防化品', '对讲机', '计算机'],
  values: [3512, 3120, 2750, 2343, 1372, 1322]
}

// 装备质量（左3）
var win_kryl = [
  {
    value: 1346,
    name: '新品'
  },
  {
    value: 189,
    name: '堪品'
  },
  {
    value: 201,
    name: '待修'
  },
  {
    value: 14,
    name: '报废'
  }
]

// =========================================================== 右侧
// 出入库统计（右1）
var win_crktj = [
  {
    value: 1346,
    name: '本月库存'
  },
  {
    value: 189,
    name: '本月出库'
  },
  {
    value: 201,
    name: '本月入库'
  },
  {
    value: 14,
    name: '空置库房'
  }
]

// 库房利用率（右2）
var win_rk = {
  labels: ['总体', '北京库', '常平库', '陕西库'],
  values: [153293, 73293, 51123, 31356],
  values2: [129949, 60949, 45800, 26391]
}

// 7日平均温度湿度（右3）
var win_ck = {
  labels: ['2日', '3日', '4日', '5日', '6日', '7日', '今天'],
  values: [15, 15, 16, 18, 16, 15, 18],
  values2: [85.5, 88.2, 98.4, 100, 99, 99, 82.5]
}

// =========================================================== 中间
// 仓库小卡片（中）
var win_ckdw = {
  // 上1
  cpk: {
    name: '常平库',
    kczs: '7392',
    kf: '92/176',
    hw: '378/12731',
    byrk: '3782'
  },
  // 上2
  bjk: {
    name: '北京库',
    kczs: '7392',
    kf: '92/176',
    hw: '378/12731',
    byrk: '3782'
  },
  // 下1
  sxk: {
    name: '陕西库',
    kczs: '7392',
    kf: '92/176',
    hw: '378/12731',
    byrk: '3782'
  }
}
