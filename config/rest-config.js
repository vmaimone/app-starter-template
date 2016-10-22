export default function createRestConfig(environment) {
  if(!environment) environment = process.env

  let env = environment.NODE_ENV || 'development'
  let port = environment.PORT || window.location.port || 80
  let prefix = environment.PREFIX || ''
  let hostname = environment.HOSTNAME || window.location.hostname || 'localhost'
  return {
    port: port,
    env: env,
    hostname: hostname,
    prefix: prefix,

    get URL() {
      return this.toString()
    },

    toString: function() {
      return `//${this.hostname}:${this.port}${this.prefix ? '/'+this.prefix : ''}`
    }
  }

}
