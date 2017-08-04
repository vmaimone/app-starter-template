# {{ name }}

> {{ description }}

## Mini-doc
* `/server/**` - each module is in a namespaced folder and should ultimately export a `hapi` plugin. All modules listed in `routes.js` are registered with the server

  * `/Auth` - defines routes to handle AD interaction (uses `@kleinsteel/auth` and `@kleinsteel/reverse-dns`)
  * `/Home` - an example api definition
  * `/plugins` - a home for various plugins. comes with a static file server and other files used in development

* `/client/**` - a frontend built with Vue

  * `/api` - a home for remote calls. includes a miniature http module that wraps the `fetch` api
  * `/components` - a home for various components. comes with a login form provided as a .vue file
  * `/pages` - a home for .vue files to be served up by vue-router

* `/config/**`
  * `env.js` - this module is used to set environment variables.
  * `index_dev.html` is loaded in memory during dev. At build time this file will be copied to `public/index.html`. Script tags referencing js build will be inserted automatically.

* `/test/**`   - Contains test files
* `/public/**` - Public folder to be served
* `/app.js`  - dev/production server
  * set `NODE_ENV=production` to turn off development features

## Dev Setup

``` bash
# install dependencies
npm install

# serve with hot reload 0.0.0.0:3000
npm run dev
```

## Production Setup

``` bash
# install dependencies
npm install

# build for production with minification
npm run build

# run application 0.0.0.0:3000
node app.js
```

Credits:
[Vue 2](https://vuejs.org/)
[Hapi](http://hapijs.com/)
[Webpack](https://webpack.github.io/)
