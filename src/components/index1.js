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
}
