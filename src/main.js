import Vue from 'vue'
import Desktop from './desktop'

Vue.config.productionTip = false

new Vue({
  render: h => h(Desktop),
}).$mount('#app')
