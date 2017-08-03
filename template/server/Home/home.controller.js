const Home = require('./home.model')

exports.index = {
  method: 'get',
  path: '/api',
  handler(request, reply) {
    const data = Home.getExampleData()
    return reply(data)
  }
}

exports.about = {
  method: 'get',
  path: '/api/about',
  handler(request, reply) {
    const info = Home.getContactInfo()
    return reply(info)
  }
}
