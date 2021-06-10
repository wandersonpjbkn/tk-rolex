import './registerServiceWorker'

import Vue from 'vue'
import App from './App.vue'
import meta from 'vue-meta'

Vue.use(meta)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
