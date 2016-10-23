'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({
  port: process.env.NODE_ENV !== 'production' ? 3000 : 7212,
  router: {
    stripTrailingSlash: true
  },
  routes: {
    cors: { credentials: true }
  }
});

// Register webpack HMR, only for non-production environments
if (process.env.NODE_ENV !== 'production') {
  const initHMR = require('./server/plugins/webpack-hmr')
  const WebpackConfig = require('./config/webpack.config.js'); // Webpack config
  initHMR( server, WebpackConfig )
}

// public files for the client app
const initPublicDirectory = require('./server/plugins/public-directory')
initPublicDirectory(server, __dirname)

// api routes for the server side portion
const routes = require('./server/routes')
server.route( routes )

// user session state (cookie)
server.state('session', {
    // domain: ''
    ttl: null, // 24 * 60 * 60 * 1000,  /* One day */
    path: '/',
    isHttpOnly: true,
    isSecure: false,
    encoding: 'base64json'
})

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
