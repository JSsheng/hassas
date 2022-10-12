import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import components from '@/components'
Vue.use(components)

// import PageTools from '@/components/PageTools'
// import UploadExcel from '@/components/UploadExcel'
// export default {
//   install(Vue) {
//     Vue.component('PageTools', PageTools) // 注册工具栏组件
//     Vue.component('UploadExcel', UploadExcel) // 注册导入excel组件
//   }
// }
import * as directive from '@/directives'
console.log(Object.keys(directive))
Object.keys(directive).forEach(ele => {
  Vue.directive(ele, directive[ele])
})

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
