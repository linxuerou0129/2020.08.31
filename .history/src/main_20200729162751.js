
import ElementUI from 'element-ui' //新添加
import '../theme/index.css' //新添加，避免后期打包样式不同，要放在import App from './App';之前

import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.use(ElementUI)   //新添加

import axios from 'axios'
//axios.defaults.withCredentials = true;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
