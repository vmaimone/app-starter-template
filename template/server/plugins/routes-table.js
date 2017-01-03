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
        let ns = current.ns || '/'
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
  let pad = ' '.repeat('method'.length - method.length)
  if (path === '/') path = '/index.html'
  return `${method}  ${pad}${path}`
}

function extractRoutes(table, fn) {
  let entries = table.map(entry => {
    let ns = entry.path.slice(1).split('/')[0].trim().toLowerCase()
    let path = entry.path
    let method = entry.method.toUpperCase()
    return { ns, path, method }
  })

  entries.sort((a, b) => {
    let aa = (a.ns + a.path.replace(a.ns, '') + a.method).toLowerCase()
    let bb = (b.ns + b.path.replace(b.ns, '') + b.method).toLowerCase()
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
