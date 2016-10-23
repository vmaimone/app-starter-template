<template>
  <form @submit.prevent="login(form)">
    <label>
      Username: <input type="text" v-model="form.username">
    </label>
    &nbsp;
    <label>
      Password: <input type="password" v-model="form.password">
    </label>
    &nbsp;
    <button type="submit">Ok</button>



  </form>
</template>
<script>
  import api from '../api'
  export default {
    name: 'login-form',
    data() {
      return {
        form: {}
      }
    },
    methods: {
      login(credentials) {
        return api
          .auth
          .authenticate(credentials)
          .then(user => {
            this.$emit('login-success', user)
            return user
          })
          .catch(err => {
            this.$emit('login-failure', err)
            return err
          })
      },
    }
  }
</script>