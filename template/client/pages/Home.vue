<template>
  <div class="example-component">
    <div class="button-container">
      <button type="button" class="button" @click="makeApiCall">Call API</button>
    </div>
    <div class="container ">
      <strong>API says:</strong> \{{ apiResponse }}
    </div>
  </div>
</template>

<script>
import api from '~api'
export default {
  name: 'example-component',
  data() {
    return {
      apiResponse: null
    }
  },
  methods: {
    makeApiCall() {
      const exampleData = api.example.apiCall()
      return exampleData.then(data => {
        return this.apiResponse = data
      })
    },
  }
}
</script>

<style>
  .example-component {
    padding: 1rem 0;
    margin: 1rem 0;
  }
  .example-component .button-container {
    text-align: center;
    margin: 1rem 0 ;
  }
  .example-component .container {
    border: 1px solid dimgray;
    border-radius: 4px;
    background-color: whitesmoke;
    padding: 1em;
  }
</style>
