'use strict'
require('./config/env')
const Hapi = require('hapi')
const server = new Hapi.Server()

// webserver settings
server.connection({
  port: process.env.PORT,
  router: {
    stripTrailingSlash: false
  },
  routes: {
    cors: { credentials: true }
  }
})

// register webpack HMR, only for non-production environments
if (process.env.NODE_ENV !== 'production') {
  const initHMR = require('./server/plugins/webpack-hmr')
  const WebpackConfig = require('./config/webpack.config.js') // Webpack config
  initHMR(server, WebpackConfig)
}

// public files for the client app
const initPublicDirectory = require('./server/plugins/public-directory')
initPublicDirectory(server, __dirname)

// api routes for the server side portion
const routes = require('./server/routes')
for (let index = 0; index < routes.length; index++) {
  const register = routes[index]
  server.register(register)
}

// user session state (cookie)
server.state('session', {
  // domain: ''
  ttl: null, // 24 * 60 * 60 * 1000,  /* One day */
  path: '/',
  isHttpOnly: true,
  isSecure: false,
  encoding: 'base64json'
})

// decorate reply interface with reply.vue
// const ReplyVue = require('./server/plugins/reply-vue')
// server.register(ReplyVue, err => err ? console.error(err) : null)

// boot the server and log the routes table to the console
const createRoutesTable = require('./server/plugins/routes-table')
server.start((err) => {
  if (err) {
    throw err
  } else {
    createRoutesTable(server)
  }
})
