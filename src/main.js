import Vue from 'vue'
import store from './store';
import App from './App.vue'


import router from './router';

import './plugins/element.js'
import './plugins/axios.js'

import "./axios"
import "./permission"

import Editor from './components/Editor'
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  Editor,
  render: h => h(App)
}).$mount('#app')
