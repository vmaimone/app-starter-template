let pageTitle = {
  props: {
    title: String
  },
  render(h) {
    return h('h1', this.title)
  }
}

let page = {

  components: { pageTitle },

  data: {
    pageTitle: 'SSR Demo',
    serverInfo: {},
    session: {}
  },

  methods: {
    stringify(object) {
      return JSON.stringify(object, null, '  ')
    }
  },

  render(h) {
    return (
      h('div', [
        h(pageTitle, { props: { title: this.pageTitle } }),
        h('div', [
          h('h3', 'Server Info'),
          h('pre', this.stringify(this.serverInfo)),
          h('h3', 'User Session'),
          h('pre', this.stringify(this.session))
        ])
      ])
    )
  }
}

module.exports = {
  method: 'get',
  path: '/vue-ssr',
  handler: function (request, reply) {
    return reply.vue(page, {
      inputVal: request.query.val || null,
      serverInfo: request.server.info,
      session: request.state.session
    })
  }
}
