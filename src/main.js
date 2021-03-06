import Vue from 'vue'
import App from './App.vue'
import router from './router';
import './utils/rem';

// mock数据
if (process.env.NODE_ENV === 'development') {
  require('./server/mock/mock');
}

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
