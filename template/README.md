# something

A Hapi Vue project

## Mini-doc

**/build/** - Contains files needed for build and hot development
**/build/index_dev.html** - Template for index.html, it will be used by HMR when developing in memory and during production build
**/client/** - Vue.js app source
**/config/** - Configuration files
**/public/** - Public folder to be served
**/server/** - Server side logic
**/test/** -   Contains test files
**/app.js**  - Production server

## Dev Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev
```

## Production Setup

``` bash
# install dependencies
npm install

# build for production with minification
npm run build

# run application at localhost:3000
node app.js
```

Credits:
[Vue 2](https://vuejs.org/)
[Hapi](http://hapijs.com/)
[Webpack](https://webpack.github.io/)
