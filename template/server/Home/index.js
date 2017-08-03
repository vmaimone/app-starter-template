const { index, about } = require('./home.controller')

exports.register = function(server, options, next) {
  server.route([ index, about ])
  next()
}

exports.register.attributes = {
  name: 'home-api'
}
