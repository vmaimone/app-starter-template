import Vue from 'vue'
import VueResource from 'vue-resource'
import createRestConfig from '../../config/rest-config.js'

Vue.use(VueResource) // Web requests, Vue plugin

let rest = createRestConfig(process.env)

let $http = {}

for(let key in Vue.http) {
  if(typeof Vue.http[key] === 'function') {
    $http[key] = (path, ...params) => Vue.http[key](rest.URL + path, ...params)
  } else {
    $http[key] = Vue.http[key]
  }
}

export default $http
