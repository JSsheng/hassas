import * as filters from '@/filters' // 引入工具类
const fn = require.context('./', /\.vue$/)
console.log(fn.keys())
const components = fn.keys().map(ele => {
  return fn(ele)
})

export default (Vue) => {
  components.forEach(ele => {
    console.log(ele)
    Vue.component(ele.default.name, ele.default)
  })
  Object.keys(filters).forEach(key => {
    // 注册过滤器
    Vue.filter(key, filters[key])
  })
}

