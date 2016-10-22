var auth = require('@kleinsteel/auth');
var dnsLookup = require('@kleinsteel/reverse-dns')
// var getRequestOptions = require('../lib/getRequestOptions');

const defaultState = (request) => ({
  username: '',
  sessionStart: new Date,
  lastLogin: null,
  remoteAddress: request && request.info.remoteAddress,
  cn: '',
  isLoggedIn: false
})

const session = {
  method: 'GET',
  path: '/auth/login',
  handler: function (request, reply) {
    let currentState = (request.state && request.state.session)
      ? request.state.session
      : defaultState(request)
    return reply(currentState).state('session', currentState)
  }
}

const login = {
  method: 'POST',
  path: '/auth/login',
  handler: function (request, reply) {
    let payload = {}
    if (typeof request.payload === 'string') payload = JSON.parse(request.payload)
    else payload = request.payload

    let creds = fromBase64(payload.user)

    let currentState = (request.state && request.state.session)
      ? request.state.session
      : defaultState(request)

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
        if(err) console.error(err)
        return err
      })
      .then(isAuthed => {
        if (!isAuthed) console.error('Bad Auth: ' + creds.username)
        return Promise.all([isAuthed, lookupResult])
      })
      .then(([isAuthed, state]) => {
        let user = Object.assign(currentState, {
          username: isAuthed ? creds.username.toLowerCase() : '',
          isLoggedIn: isAuthed
        })

        return reply(user).state('session', user)
      })
    .catch(err => {
        if(err) console.error(err)
        return err
      })


  }
}

const logout = {
  method: ['GET', 'POST'],
  path: '/auth/logout',
  handler: function (request, reply) {
    var options = Object.assign({},
      request.params,
      request.payload,
      request.query
    )
    var user = defaultState(request)
    return reply(user).state('session', user)
  }
}


/**
 * A helper to read incoming post requests that are serialized
 * @param  {String} json Base64 encoded string representing a js object
 * @return {Object} a js object parsed from the provided string
 */
function fromBase64(json) {
  if(typeof json !== 'string') json = JSON.stringify(json)
  return JSON.parse(new Buffer(json, 'base64'));
}


module.exports = [login, logout, session]