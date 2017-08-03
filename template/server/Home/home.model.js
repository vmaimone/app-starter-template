module.exports = {

  getExampleData() {
    return Promise.resolve({
      array: [],
      number: 100,
      string: 'it works!'
    })
  },

  getContactInfo() {
    return {
      name: 'bob sacamano',
      address: '123 fake street',
      phone: 'KL5-3226'

    }
  }

}
