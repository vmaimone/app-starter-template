<template>
  <div>
    <h1>{{ msg }}</h1>
    <button class="button" v-on:click="helloCall()">Call API</button>
    <p style="font-size:2em">API says: {{ api }}</p>
  </div>
</template>

<script>
import api from './api'

export default {
  data: function() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Welcome!',
      api: '',
      error: {}
    }
  },
  methods: {
    helloCall: function() {
      api.example.apiCall().then((data) => {
        this.api = data.message
      }, (response) => {
        this.error = response.data || response
      })
    }
  }
}
</script>

<style lang="sass">
body {
  font-family: Open Sans, sans-serif;
}
</style>
