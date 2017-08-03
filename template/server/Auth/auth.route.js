const auth = require('@kleinsteel/auth')
const dnsLookup = require('@kleinsteel/reverse-dns')
const { Session, fromBase64 } = require('./auth.model')


exports.session = {
  method: 'GET',
  path: '/auth/login',
  handler(request, reply) {
    const currentState = (request.state && request.state.session)
      ? request.state.session
      : new Session(request)
    return reply(currentState).state('session', currentState)
  }
}

exports.login = {
  method: 'POST',
  path: '/auth/login',
  handler(request, reply) {
    let payload = {}
    if (typeof request.payload === 'string') payload = JSON.parse(request.payload)
    else payload = request.payload

    const creds = fromBase64(payload.user)

    const currentState = (request.state && request.state.session)
      ? request.state.session
      : new Session(request)

    let lookupResult = Promise.resolve(null)
    if (currentState.remoteAddress && !currentState.cn) {
      lookupResult = dnsLookup(currentState.remoteAddress)
        .then(result => {
          currentState.cn = result
          return currentState
        })
        .catch(err => {
          currentState.cn = ''
          return currentState
        })
    }

    return auth(creds)
      .catch(err => {
        if (err) console.error(err)
        return err
      })
      .then(isAuthed => {
        if (!isAuthed) console.error('Bad Auth: ' + creds.username)
        return Promise.all([ isAuthed, lookupResult ])
      })
      .then(([ isAuthed, state ]) => {
        const user = Object.assign(currentState, {
          username: isAuthed ? creds.username.toLowerCase() : '',
          isLoggedIn: isAuthed
        })

        return reply(user).state('session', user)
      })
    .catch(err => {
      if (err) console.error(err)
      return err
    })
  }
}

exports.logout = {
  method: [ 'GET', 'POST' ],
  path: '/auth/logout',
  handler(request, reply) {
    const user = new Session(request)
    return reply(user).state('session', user)
  }
}
