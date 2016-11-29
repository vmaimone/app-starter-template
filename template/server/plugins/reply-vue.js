process.env.VUE_ENV = 'server'
const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()
const devHtml = require('fs').readFileSync('./build/index_dev.html')
const partials = devHtml.toString().split('<app></app>')
const vueScript = ($options = {}) => `
  <script src="node_modules/vue/dist/vue.js"></script>
  <script>
    window.app = new Vue(${JSON.stringify($options)}).$mount('[server-rendered]')
  </script>
`
exports.register = register;

exports.register.attributes = {
  name: 'reply-vue',
  version: '0.0.0'
}

function register (server, options, next) {
  server.decorate('reply', 'vue', ViewModel);
  next();
};


function ViewModel(vm, data) {
  data = data || {}
  if (!vm.data) vm.data = data
  else Object.assign(vm.data, data)
  return renderViewModel(vm)
    .then(html => {
      let app = partials.join(html)
      app = app.split('<script id="ssr-script"></script>').join(vueScript(vm))
      return this.response(app)
    })
}


function renderViewModel(vm) {
  return new Promise((resolve, reject) => {
    return Promise.resolve(vm)
      .then(vm => renderer.renderToString(new Vue(vm), (err, html) => {
        if (err) reject(err)
        else resolve(html)
      }))
  })
}