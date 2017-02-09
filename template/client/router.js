import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: [
    {
      name: 'home',
      path: '/',
      meta: { title: 'Project Title' }
    }
  ]
})
