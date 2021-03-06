import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import breadCrumb from '../components//common//bread-crumb'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import coverImg from '../views/publish/cover-image'
import selectImg from '../views/publish/select-images'

import { quillEditor } from 'vue-quill-editor'

// elementUI导出的对象 对象里有一个方法 install
// Vue.use(elementUI) => 调用其提供的install方法,并且在方法中传入Vue对象
export default {
  install (Vue) {
    //   注册组件
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader) // 注册左侧菜单组件
    Vue.component('bread-crumb', breadCrumb) // 注册面包屑组件
    Vue.component('quill-editor', quillEditor) // 富文本编辑器
    Vue.component('cover-image', coverImg) // 发布子组件1
    Vue.component('select-images', selectImg) // 发布子组件2
  }
}
