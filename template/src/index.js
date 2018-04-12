import Vue from 'vue'

import router from './router/index.js'
import App from './app.vue'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
