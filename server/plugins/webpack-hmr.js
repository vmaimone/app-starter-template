const HapiWebpackDevMiddleware = require('hapi-webpack-dev-middleware')
const HapiWebpackHotMiddleware = require('hapi-webpack-hot-middleware')

module.exports = function initHMR( server, WebpackConfig ) {

  const devMiddleware = {
    register: HapiWebpackDevMiddleware,
    options: {
      config: WebpackConfig,
      options: {
        noInfo: true,
        publicPath: WebpackConfig.output.publicPath,
        stats: {
          colors: true
        }
      }
    }
  }

  const hotMiddleware = {
    register: HapiWebpackHotMiddleware
  }

  const onError = function (err) {
    if (err) {
      throw err
    }
  }

  return server.register([ devMiddleware, hotMiddleware ], onError)
}
