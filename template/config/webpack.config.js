const path = require('path')
const webpack = require('webpack')
const projectRoot = path.resolve(__dirname, '../')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  context: projectRoot,
  entry: {
    app: './client/main.js'
  },
  output: {
    filename: '[name].[hash:7].js',
    path: path.resolve(__dirname, '../public/'),
    publicPath: '/',
    chunkFilename: '[name]-[chunkhash].js'
  },
  resolve: {
    alias: {
      'client': path.resolve(__dirname, '../client'),
      'config': path.resolve(__dirname, '../config'),
      'components': path.resolve(__dirname, '../client/components'),
      'ag-grid/main$': 'ag-grid/dist/ag-grid.min.js',
      'vue$': 'vue/dist/vue.js',
      'vue-router$': 'vue-router/dist/vue-router.min.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          esModule: false // control how `import` resolves `.default`
          // loaders: cssLoaders()
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [ path.join(projectRoot, 'client') ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'vue-style-loader',
          use: [ 'css-loader' ]
        })
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'vue-style-loader',
          use: [ 'css-loader', 'sass-loader' ]
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].[hash:7].css'
    }),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../public/index.html'),
      template: path.resolve(__dirname, './index_dev.html'),
      inject: true
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      minChunks(module) {
        return isExternal(module)
      }
    })
  ],
  devtool: '#cheap-module-eval-source-map'
}

if (process.env.NODE_ENV !== 'production') {
  module.exports.plugins.push(new webpack.HotModuleReplacementPlugin())
}

function isExternal({ userRequest }) {
  const isString = typeof userRequest === 'string'
  const isNodeModule = userRequest.indexOf('node_modules') > -1
  const isBowerComponent = userRequest.indexOf('bower_components') > -1

  return isString && (isNodeModule || isBowerComponent)
}
