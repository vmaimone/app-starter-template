import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '~pages/home.vue'
import Login from '~pages/login.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
      meta: { title: 'Project Title' }
    },
    {
      name: 'login',
      path: '/login',
      component: Login,
      meta: { title: 'Login' }
    }
  ]
})
