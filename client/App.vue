<template>
  <div>
    <h1>{{ title }}</h1>
    <button class="button" @click="helloCall()">Call API</button>
    <p style="text-large">API says: {{ api }}</p>
    <hr>
    <div>
      <div style="margin: 1rem; color: #bbbbbb;">
        <button class="button-sm" @click.prevent="checkAuth" type="button">
          <span v-if="showSuccessIndicator">Authenticated!</span>
          <span v-else>Check Login Status</span>
        </button>
        &nbsp;
        <small v-if="appuser.isLoggedIn === true">
          currently logged in as <strong>{{appuser.username}}</strong>
        </small>
        <small v-else>
          you are not loggin in
        </small>
      </div>
      <div style="padding:.5rem 1rem; border: 1px solid gray; display:inline-block">
        <div style="margin-bottom:1rem;color:dimgray">Login Component</div>
        <login-form @login-success="setAppuser"></login-form>
      </div>
    </div>
  </div>
</template>

<script>
import api from './api'
import loginForm from './components/login-form.vue'
export default {
  name: 'application',
  components: { loginForm },
  data: function() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      title: 'Welcome!',
      api: '',
      form: { username: '', password: '' },
      appuser: {},
      error: {},
      showSuccessIndicator: false
    }
  },
  created() {
    this.ping()
  },
  methods: {
    helloCall() {
      return api.example.apiCall().then((data) => {
        return this.api = data.message
      })
    },
    ping() {
      return api
        .auth
        .ping()
        .then(this.setAppuser)
    },
    logout() {
      return api.auth.logout().then(this.setAppuser)
    },
    checkAuth() {
      return this
        .ping()
        .then(() => {
          if(this.appuser.isLoggedIn) this.showSuccessAnimation()
        })
    },
    setAppuser(user) {
      return this.appuser = user||{}
    },
    showSuccessAnimation() {
      this.showSuccessIndicator = true
      window.setTimeout(() => this.showSuccessIndicator = false, 1e3)
    }
  }
}
</script>

<style lang="sass">
html {
  font-size: 16px;
}
body {
  font-family: Open Sans, sans-serif;

  .button {
    padding:.5rem;
    font-size:1rem;
  }

  .button-sm {
    padding:.25rem;
    font-size:.9rem;
  }

}
</style>
