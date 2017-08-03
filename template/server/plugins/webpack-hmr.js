const HapiWebpackDevMiddleware = require('hapi-webpack-dev-middleware')
const HapiWebpackHotMiddleware = require('hapi-webpack-hot-middleware')

module.exports = function initHMR(server, WebpackConfig) {

  server.register({
    register: HapiWebpackDevMiddleware,
    options: {
      config: WebpackConfig,
      options: {
        publicPath: WebpackConfig.output.publicPath || '/public',
        stats: {
          colors: true,
          chunks: false
        }
      }
    }
  })

  server.register({
    register: HapiWebpackHotMiddleware
  })

  return server
}
