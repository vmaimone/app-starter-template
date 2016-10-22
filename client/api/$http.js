import Vue from 'vue'
import VueResource from 'vue-resource'
import createRestConfig from '../../config/rest-config.js'

// setup vue plugin for web requests and export custom object with fixed settings
Vue.use(VueResource)
Vue.http.options.xhr = { withCredentials: true }

const $http = {}
const REST_CONFIG = createRestConfig(process.env)

for (let key in Vue.http) {
  if (typeof Vue.http[key] === 'function') {
    $http[key] = (path = '/' , data = {} , options = {}) => _http(key, REST_CONFIG.URL + path, data, options)
  } else {
    $http[key] = Vue.http[key]
  }
}

export default $http

function _http (method, url, data, options) {
  data = data || {}
  options = options || {}

  if (!method) return Promise.reject('invalid http method')
  else method = method.toLowerCase()

  let promise
  if (method == 'post' || method == 'put') {
    promise = Vue.http[method](url, data, options)
  } else {
    options = Object.assign({}, data, options)
    promise = Vue.http[method](url, options)
  }

  return promise
}

