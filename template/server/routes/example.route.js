module.exports = ({
  method: 'GET',
  path: '/api/call',
  handler: function (request, reply) {
    reply({
      message: 'Hello!'
    })
  }
})