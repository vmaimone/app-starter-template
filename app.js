'use strict';

const Hapi = require('hapi');
const Inert = require('inert');

const server = new Hapi.Server();

server.connection({
  port: process.env.NODE_ENV !== 'production' ? 3000 : 7212,
  router: { stripTrailingSlash: true },
  routes: { cors: { credentials: true } }
});

// Register webpack HMR, only for non-production environments
if (process.env.NODE_ENV !== 'production') {
  const WebpackConfig = require('./config/webpack.config.js'); // Webpack config
  require('./server/plugins/webpack-hmr')( server, WebpackConfig )
}

server.register([Inert], function (err) {

  if (err) {
    throw err;
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
        path: __dirname + '/public',
        listing: false,
        index: false
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply.file('./public/index.html');
    }
  });
});

server.route( require('./server/routes') )

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
