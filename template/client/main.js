import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.use(VueRouter)

window.App = new Vue({
  el: '#app',
  components: {
    App,
    router: new VueRouter(router)
  }
})
