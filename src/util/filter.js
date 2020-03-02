import Vue from 'vue'
import moment from 'moment'
Vue.filter('premiereAt', function (data) {
  console.log(moment(data * 1000).format('YYYY/MM/DD'))
  return moment(data * 1000).format('YYYY/MM/DD')
}) // 时间戳 毫秒数

// 自定义 过滤器  数组----->字符串
/* eslint-disable no-undef */
Vue.filter('filterActor', (data1) => {
  var arr = data1.map((item) => {
    return item.name
  })
  var str = arr.join(' ')
  if (str.length > 9) {
    return str.slice(0, 9) + '...'
  }
  return str
})
