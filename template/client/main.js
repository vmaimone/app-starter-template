import Vue from 'vue'
import Filters from './filters'
import router from './router'
import App from './App.vue'

Vue.use(Filters)

const el = '#app'
const components = { App }

window.App = new Vue({
  el,
  router,
  components,
  render(h) { return h(App) }
})
