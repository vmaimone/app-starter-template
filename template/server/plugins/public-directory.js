const Inert = require('inert')
const { resolve } = require('path')

class PublicDirectory {
  constructor() {
    Object.assign(this, {
      auth: false,
      cache: {
        expiresIn: 24 * 60 * 60 * 1000,
        privacy: 'public'
      }
    })
  }
}

module.exports = function initPublicDirectory(server, path) {
  return server.register([ Inert ], err => {
    if (err) {
      throw err
    }

    server.route({
      method: 'GET',
      path: '/assets/{filepath*}',
      config: {
        auth: false,
        cache: {
          expiresIn: 24 * 60 * 60 * 1000,
          privacy: 'public'
        }
      },
      handler: {
        directory: {
          path: resolve(path, 'assets'),
          listing: true,
          index: true
        }
      }
    })

    server.route({
      method: 'GET',
      path: '/{filename*}',
      config: new PublicDirectory(),
      handler: {
        directory: {
          path: resolve(path),
          listing: true,
          index: true
        }
      }
    })

    server.route({
      method: 'GET',
      path: '/public/{filename*}',
      config: new PublicDirectory(),
      handler: {
        directory: {
          path: './public',
          listing: true,
          index: true
        }
      }
    })
  })
}
