import $http from './$http'

export default ({
  apiCall() {
    return $http
      .get('/api/call')
      .then(response => response.data)
      .catch(err => console.log(err))
  }
})
