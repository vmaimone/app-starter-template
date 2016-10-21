import $http from './$http'

export default ({
  apiCall() {
    return $http
      .get('/call')
      .then(response => response.data)
      .catch(err => console.log(err))
  }
})
