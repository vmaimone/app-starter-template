const seperator = '\n' + '='.repeat(80) + '\n'

module.exports = function printRoutesTable(server) {
  const table = server.table()[0].table
  const uri = server.info.uri
  const entries = extractRoutes(table, entries => entries.map(stringifyRoute)).join('\n').trim()
  console.log( ''
    + seperator
    + `method  path ${' '.repeat(47-uri.length)} Server running at: ${uri}`
    + seperator
    + entries
    + seperator
  )
}

function stringifyRoute({method, path}) {
  let pad = ' '.repeat('method'.length - method.length)
  if(path === '/') path = '/index.html'
  return `${method}  ${pad}${path}`
}

function extractRoutes(table, fn) {
  let entries = table.map(entry => {
      let ns = entry.path.slice(1).split('/')[0].trim()
      let path = entry.path
    let method = entry.method.toUpperCase()
    return { ns, path, method }
  })

  entries.sort((a, b) => {
    return a.ns+a.method+a.path.replace(a.ns,'') > b.ns+a.method+b.path.replace(b.ns,'')
  })

  if (typeof fn === 'function') {
    return fn(entries)
  } else {
      return entries
  }
}