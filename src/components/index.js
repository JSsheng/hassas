import PageTools from './PageTools/index.vue'
const components = [PageTools]
export default {
  install: function(Vue) {
    components.forEach(ele => {
      Vue.component(ele.name, ele)
    })
  }
}
