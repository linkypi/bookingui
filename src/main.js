import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import VueResource from 'vue-resource';
import moment from 'moment';

Vue.use(VueResource);
Vue.use(moment);
Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
