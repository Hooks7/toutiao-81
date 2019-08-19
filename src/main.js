import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUi from 'element-ui' // 引入组件
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less' // 引入重置的基础样式

Vue.use(ElementUi)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
