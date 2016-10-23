import $http from './$http'

const CurrentUser = {
  username: '',
  lastPing: null
}

export default ({
  ping() {
    CurrentUser.lastPing = new Date()
    return $http
      .get('/auth/login')
      .then(response => {
        return response.data
      })
  },

  authenticate({ username, password }) {
    const user = { username, password }
    const user64 = window.btoa(JSON.stringify(user))
    const payload = { user: user64 }

    return $http
      .post('/auth/login', payload)
      .then(response => {
        if (response.ok) {
          let authUser = response.data
          if (authUser.isLoggedIn && authUser.username) {
            CurrentUser.username = authUser.username
            CurrentUser.lastPing = new Date()
            console.info(`[LOGIN] username '${authUser.username}' has been authenticated`)
            return response.data
          } else {
            console.error(`[LOGIN] login attempt failed for user '${username}'`)
            if(CurrentUser.username) return this.logout()
            else throw new Error('auth failed')
          }
        } else {
          console.error(`[LOGIN] unable to authenticate`)
          throw new Error('request failed')
        }

      })
  },

  logout() {
    return $http
      .get('/auth/logout')
      .then(response => {
        console.info(`[LOGOUT] username '${CurrentUser.username}' has been logged out`)
        CurrentUser.username = ''
        CurrentUser.lastPing = 0
        CurrentUser.isLoggedIn = false
        return response.data
      })
  }
})