import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
//import moment from 'moment'
//import index from './index.html'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
