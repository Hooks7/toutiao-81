import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import ElementUi from 'element-ui' // 引入组件
import Component from './components' // 引入自己设置的插件
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less' // 引入重置的基础样式
import axios from './utils/axios.config'
Vue.prototype.$http = axios
Vue.use(ElementUi)
Vue.use(Component)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
