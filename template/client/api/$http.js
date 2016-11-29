import createRestConfig from '../../config/rest-config.js'
const REST_CONFIG = createRestConfig(process.env)

// setup vue plugin for web requests and export custom object with fixed settings
const DEFAULT_OPTIONS = {
  method: 'get',
  credentials: 'include'
}

const $http = {
  get: (path = '/' , data = {} , options = {}) => _http('get', REST_CONFIG.URL + path, data, options),
  put: (path = '/' , data = {} , options = {}) => _http('put', REST_CONFIG.URL + path, data, options),
  post: (path = '/' , data = {} , options = {}) => _http('post', REST_CONFIG.URL + path, data, options),
  delete: (path = '/' , data = {} , options = {}) => _http('delete', REST_CONFIG.URL + path, data, options)
}

export default $http


/* == private methods ============================================================================================= */
function _http (method, url, data, options) {
  data = data || {}
  options = Object.assign({}, DEFAULT_OPTIONS, options || {})
  options.method = method || options.method

  if (options.method == 'post' || options.method === 'put') {
    options.body = JSON.stringify(data || {})
  } else {
    if (data) {
      let qparams = typeof data.params === 'object' ? data.params : data
      let qs = []
      for (let param in qparams) {
        let value = qparams[param]
        if ((value !== null) && (value !== void 0)) {
          qs.push(param+'='+(value instanceof Date ? value.toJSON() : value))
        }
      }
      if(qs.length) url += ('?' + qs.join('&'))
    }
  }

  return fetch(url, options)
    .then(status)
    .catch(function(error) {
      console.log('Request failed', error);
      return Promise.reject(error)
    })
}

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json().then( data => ({ ok: true, data: data }))
  } else {
    return Promise.reject({ ok: false, data: response.statusText })
  }
}
