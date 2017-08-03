exports.Session = class Session {
  constructor(options = {}) {
    Object.assign(this, {
      username: '',
      sessionStart: new Date(),
      lastLogin: null,
      remoteAddress: options.remoteAddress,
      cn: '',
      isLoggedIn: false
    })
  }
}


/**
 * A helper to read incoming post requests that are serialized
 * @param  {String} json Base64 encoded string representing a js object
 * @return {Object} a js object parsed from the provided string
 */
exports.fromBase64 = function fromBase64(json) {
  if (typeof json !== 'string') json = JSON.stringify(json)
  return JSON.parse(new Buffer(json, 'base64'))
}
