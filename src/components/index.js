import PageTools from './PageTools/index.vue'
import UploadExcel from './UploadExcel/index.vue'
const components = [PageTools, UploadExcel]
export default {
  install: function(Vue) {
    components.forEach(ele => {
      Vue.component(ele.name, ele)
    })
  }
}
