const IS_BROWSER = (typeof window !== 'undefined') && (typeof module === 'undefined')

function $http(config) {
  this.REST_CONFIG = {}
  for (const key in config) {
    if (config.hasOwnProperty(key)) {
      this.REST_CONFIG[key.toUpperCase()] = config[key]
    }
  }
  this.REST_CONFIG = createRestConfig(this.REST_CONFIG)
  return _applyMethods(this)
}
_applyMethods($http)
$http.default = new $http(createRestConfig())
$http.REST_CONFIG = createRestConfig()
$http.cacheBuster = cacheBuster

if (IS_BROWSER) {
  window.$http = $http
} else {
  module.exports = $http
}

/* private methods */
function _applyMethods(context) {
  [ 'get', 'put', 'post', 'delete' ].forEach(method => {
    context[method] = function(path = '/', data = {}, options = {}) {
      if (method === 'get') {
        if (!Object.keys(data || {}).length) data = cacheBuster()
      }
      return _http.call(context, method, _url.call(context, path), data, options)
    }
  })
}

function _url(string) {
  if (typeof string !== 'string') string = String(string)
  if (string.slice(0, 4) === 'http' || string.slice(0, 2) === '//') {
    return string
  } else {
    return (this && this.REST_CONFIG)
      ? this.REST_CONFIG.URL + string
      : $http.REST_CONFIG.URL + string
  }
}

function _http(method, url, data, options) {
  options = options || {}
  options.method = method || options.method

  const DEFAULT_OPTIONS = {
    method: 'get',
    credentials: /www/.test(this.REST_CONFIG.hostname) ? false : 'include',
    headers: {}
  }

  for (const option in DEFAULT_OPTIONS) {
    if (!options[option]) options[option] = DEFAULT_OPTIONS[option]
  }

  if (options.method === 'get' || options.method === 'delete') {
    url += _qParams(data)
  } else {
    if (typeof data !== 'string') {
      options.body = JSON.stringify(data || {})
      options.headers['content-type'] = 'application/json;charset=UTF-8'
    } else {
      options.body = data || {}
    }
  }

  /* global fetch */
  return fetch(url, options)
    .then(status)
    .catch(error => {
      console.log('Request failed', error)
      return Promise.reject(error)
    })
}

function _qParams(data) {
  const qparams = typeof data.params === 'object' ? data.params : data
  const qs = []
  for (const param in qparams) {
    const value = qparams[param]
    if ((value !== null) && (value !== void 0)) {
      qs.push(param + '=' + (value instanceof Date ? value.toJSON() : value))
    }
  }
  if (qs.length) return ('?' + qs.join('&'))
  else return ''
}

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json().then(data => ({ ok: true, data }))
  } else {
    return Promise.reject({
      ok: false,
      data: response.data || response.statusText,
      statusText: response.statusText
    })
  }
}

function createRestConfig(environment) {
  if (!environment) {
    if (typeof process === 'object' && typeof process.env === 'object') environment = process.env
    else environment = {}
  }

  const env = environment.NODE_ENV || 'development'
  const defaultPort = typeof window !== 'undefined' ? window.location.port : null
  const defaultHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost'

  const port = environment.PORT || defaultPort || 80
  const prefix = environment.PREFIX || ''
  const hostname = environment.HOSTNAME || defaultHost || 'localhost'
  return {
    port,
    env,
    hostname,
    prefix,

    get URL() {
      return this.toString()
    },

    toString() {
      return `//${this.hostname}:${this.port}${this.prefix ? '/' + this.prefix : ''}`
    }
  }
}

function cacheBuster() {
  return { 'cache-bust': (Math.random() * 1e8).toFixed() }
}
