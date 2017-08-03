const seperator = '\n' + '='.repeat(80) + '\n'

module.exports = function printRoutesTable(server) {
  const table = server.table()[0].table
  const uri = server.info.uri
  const entries = extractRoutes(table, entries => entries.map(stringifyRoute)).join('\n').trim()

  server.route({
    method: 'get',
    path: '/meta/routes',
    handler(request, reply) {
      return reply(extractRoutes(table).reduce((dict, current) => {
        const ns = current.ns || '/'
        delete current.ns
        if (!dict[ns]) dict[ns] = []
        dict[ns].push(current)
        return dict
      }, {}))
    }
  })

  console.log(
    seperator +
    `method  path ${' '.repeat(47 - uri.length)} Server running at: ${uri}` +
    seperator +
    entries +
    seperator
  )
}

function stringifyRoute({ method, path }) {
  const pad = ' '.repeat('method'.length - method.length)
  if (path === '/') path = '/index.html'
  return `${method}  ${pad}${path}`
}

function extractRoutes(table, fn) {
  const entries = table.map(entry => {
    const ns = entry.path.slice(1).split('/')[0].trim().toLowerCase()
    const path = entry.path
    const method = entry.method.toUpperCase()
    return { ns, path, method }
  })

  entries.sort((a, b) => {
    const aa = (a.ns + a.path.replace(a.ns, '') + a.method).toLowerCase()
    const bb = (b.ns + b.path.replace(b.ns, '') + b.method).toLowerCase()
    return aa === bb
      ? 0
      : (aa > bb ? 1 : -1)
  })

  if (typeof fn === 'function') {
    return fn(entries)
  } else {
    return entries
  }
}
