/**
 * 数量格式化
 * 添加逗号分割
 * 小数点后精度处理
 * @param {*} num 源数据
 * @param {*} bit 小数点后保留位数
 */
function lessThanWan(num, bit = 0) {
  if (!num && num !== 0) return '--'
  if (typeof num === 'object') {
    return num
  }
  // const int = Math.round(num * Math.pow(10, bit)) / Math.pow(10, bit);
  const int = parseFloat(num).toFixed(bit)
  let str = int.toString()
  const symbol = ~str.indexOf('-') ? '-' : ''
  str = ~str.indexOf('-') ? str.slice(1) : str
  return (
    symbol +
    str.replace(/\d+/, function (n) {
      return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
        return $1 + ','
      })
    })
  )
}

// 数字转中文大写
export function NumberToChinese(num) {
  let changeNum = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '漆', '捌', '玖']
  let unit = ['', '拾', '佰', '仟', '万']
  num = parseInt(num)
  let getWan = temp => {
    let strArr = temp.toString().split('').reverse()
    let newNum = ''
    for (let i = 0; i < strArr.length; i++) {
      newNum = (i === 0 && strArr[i] == 0 ? '' : i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? '' : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i])) + newNum
    }
    return newNum
  }
  let overWan = Math.floor(num / 10000)
  let noWan = num % 10000
  if (noWan.toString().length < 4) noWan = '0' + noWan
  return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num)
}

export function ThousandNum(value, bit = 0) {
  if (!value && value !== 0) return '--'
  if (typeof value === 'object') {
    return value
  }
  if (value < 10000) {
    return lessThanWan(value, bit)
  }
  const newValue = ['', '', '']
  let fr = 1000
  let num = 3
  let text1 = ''
  let fm = 1
  while (value / fr >= 1) {
    fr *= 10
    num += 1
  }
  if (num <= 8) {
    // 万
    text1 = parseInt(num - 4) / 3 > 1 ? '千万' : '万'
    fm = text1 === '万' ? 10000 : 10000000
    if (text1 === '千万') {
      fm = 10000
      text1 = '万'
    }
    if (value % fm === 0) {
      newValue[0] = parseInt(value / fm) + ''
    } else {
      newValue[0] = parseFloat(value / fm).toFixed(2) + ''
    }
    newValue[1] = text1
  } else if (num <= 16) {
    // 亿
    text1 = (num - 8) / 3 > 1 ? '千亿' : '亿'
    text1 = (num - 8) / 4 > 1 ? '万亿' : text1
    text1 = (num - 8) / 7 > 1 ? '千万亿' : text1
    fm = 1
    if (text1 === '亿') {
      fm = 100000000
    } else if (text1 === '千亿') {
      //fm = 100000000000;
      fm = 100000000
      text1 = '亿'
    } else if (text1 === '万亿') {
      fm = 1000000000000
    } else if (text1 === '千万亿') {
      //fm = 1000000000000000;
      fm = 1000000000000
      text1 = '万亿'
    }
    if (value % fm === 0) {
      newValue[0] = parseInt(value / fm) + ''
    } else {
      newValue[0] = parseFloat(value / fm).toFixed(2) + ''
    }
    newValue[1] = text1
  }
  return newValue.join('')
}
