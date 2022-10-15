import PageTools from './PageTools/index.vue'
import UploadExcel from './UploadExcel/index.vue'
import UploadImg from './UploadImg/index.vue'
const components = [PageTools, UploadExcel, UploadImg]
export default {
  install: function(Vue) {
    components.forEach(ele => {
      Vue.component(ele.name, ele)
    })
  }
}
