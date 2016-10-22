import Vue from 'vue'
import VueResource from 'vue-resource'
import createRestConfig from '../../config/rest-config.js'
const REST_CONFIG = createRestConfig(process.env)

// setup vue plugin for web requests and export custom object with fixed settings
Vue.use(VueResource)
Vue.http.options.xhr = { withCredentials: true }
// Vue.http.options = { xhr: { withCredentials: true } }

const $http = {}

for(let key in Vue.http) {
  if(typeof Vue.http[key] === 'function') {
    $http[key] = (path='/', data = {}, options = {}) => _http(key, REST_CONFIG.URL + path, data, options)
  } else {
    $http[key] = Vue.http[key]
  }
}

window.vhttp = Vue.http


function _http(method, url, data, options) {
  data = data || {}
  options = options || {}
  Object.assign(options, {
    credenentials: true
  })
  if (!method) return Promise.reject('invalid http method')
  method = method.toLowerCase()
  if (method == 'post' || method == 'put') {
    return Vue.http[method](url, data, options)
  } else {
    return Vue.http[method](url, Object.assign({}, data, options))
  }
}
export default $http
