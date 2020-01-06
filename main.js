import Vue from 'vue'
import App from './App'
import "./static/css/component.css";
// import "./static/css/style.css";
import {aes,
  md5,
  sha256,
  base64,
  sign} from './static/js/security'
import tabBar from './pages/tabBar/TabBar.vue'
Vue.component('tabBar', tabBar)
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
Vue.config.productionTip = false

import api from '@/common/vmeitime-http/'

App.mpType = 'app'
Vue.prototype.$api = api
const app = new Vue({
	...App
})
app.$mount()
