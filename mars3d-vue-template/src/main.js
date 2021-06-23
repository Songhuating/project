import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import views from './views'

// import Vue from 'vue'

// 使用免费开源版本
import 'mars3d/dist/mars3d.css'
import * as mars3d from 'mars3d'

// 导入插件(其他插件类似，插件清单访问：http://mars3d.cn/dev/guide/start/install.html)
// echarts插件
// import 'mars3d-echarts'

// 为了方便使用,绑定到原型链，在其他vue文件，直接 this.mars3d 来使用
Vue.prototype.mars3d = mars3d
Vue.prototype.Cesium = mars3d.Cesium

Vue.config.productionTip = false

new Vue({
  router,
  store,
  // eslint-disable-next-line no-undef
  // views,
  render: h => h(App)
}).$mount('#app')
