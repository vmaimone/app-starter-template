const Inert = require('inert')

module.exports = function initPublicDirectory(server, path) {

  return server.register([Inert], function (err) {
    if (err) {
      throw err
    }

    server.route({
      method: 'GET',
      path: '/{filename*}',
      config: {
        auth: false,
        cache: {
          expiresIn: 24 * 60 * 60 * 1000,
          privacy: 'public'
        }
      },
      handler: {
        directory: {
          path: path,
          listing: false,
          index: false
        }
      }
    })

    server.route({
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        reply.file(path + '/index.html')
      }
    })
  })
}
