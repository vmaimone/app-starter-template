import Vue from 'vue'
import router from './router'
import App from './App.vue'

const el = '#app'
const application = Object.assign(App, { el, router })

window.App = new Vue(application)
