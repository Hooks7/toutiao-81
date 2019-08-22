import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import breadCrumb from '../components//common//bread-crumb'
// elementUI导出的对象 对象里有一个方法 install
// Vue.use(elementUI) => 调用其提供的install方法,并且在方法中传入Vue对象
export default {
  install (Vue) {
    //   注册组件
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-crumb', breadCrumb)
  }
}
