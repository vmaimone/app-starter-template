<template>
  <div class="box">
    <form @submit.prevent="login(form)">
      <div class="field" >
        <div class="control-label">
          <label class="label">Username</label>
        </div>
        <div class="control">
          <input type="text" class="input" v-model="form.username">
        </div>
      </div>
      <div class="field" >
        <div class="control">
          <label class="label">Password&nbsp;</label>
        </div>
        <div class="control">
          <input type="password" class="input" v-model="form.password">
        </div>
      </div>
      <div class="has-text-right" style="margin:1rem 0 0 0">
        <button class="button border-primary" type="submit">Log in</button>
      </div>
    </form>
  </div>
</template>

<script>
  import api from '~api'
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
