<template>
  <section class="column is-one-quarter is-offset-one-quarter" style="margin:10vh auto;">
    <login-form @login-success="loginSuccess"></login-form>
  </section>
</template>
<script>
  import loginForm from '~components/login-form.vue'
  export default {
    name: 'login',
    components: { loginForm },
    data() {
      return {
        form: {}
      }
    },
    methods: {
      loginSuccess(appuser) {
        this.$root.appuser = appuser
        return this.$router.push({ name: 'home' })
      },
    }
  }
</script>
