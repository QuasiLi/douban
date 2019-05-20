import 'lib-flexible/flexible'

import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Vant from 'vant'

//导入路由
import router from './router/index.js'

import { Row, Col, Icon, Toast} from 'vant'

Vue.use(Row).use(Col).use(Icon).use(Toast)

Vue.config.productionTip = false

Vue.prototype.axios = axios

Vue.use(VueAxios, axios)

new Vue({
    router,
  render: h => h(App),
}).$mount('#app')
