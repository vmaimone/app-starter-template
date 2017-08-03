const { login, logout, session } = require('./auth.route')

exports.register = function(server, options, next) {
  server.route([ login, logout, session ])
  next()
}

exports.register.attributes = {
  name: 'authentication'
}
