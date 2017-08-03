require('./env')
const path = require('path')
const webpack = require('webpack')
const BabiliPlugin = require('babili-webpack-plugin')

Object.assign(exports, require('./webpack.config'))

exports.output.publicPath = '.'
exports.devtool = '#source-map'
exports.output.sourceMapFilename = '[name].[hash:7].js.map'
exports.resolve = {
  alias: {
    'client': path.resolve(__dirname, '../client'),
    'config': path.resolve(__dirname, '../config'),
    'components': path.resolve(__dirname, '../client/components'),
    'vue$': 'vue/dist/vue.esm.js',
    'vue-router$': 'vue-router/dist/vue-router.esm.js'
  }
}
// http://vuejs.github.io/vue-loader/workflow/production.html
exports.plugins = (exports.plugins || []).concat([

  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"',
      PORT: process.env.PORT
    }
  }),
  // new webpack.LoaderOptionsPlugin({
  //   minimize: true,
  //   debug: false
  // }),
  new BabiliPlugin({}, {
    comments: false
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: true
    },
    output: {
      comments: false
    }
  })
])

