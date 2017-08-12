<template>
  <div id="app">
    <div class="level">
      <div class="level-left">
        <div class="title is-3">
          {{$route.meta.title}}
        </div>
      </div>
      <div class="level-right"></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'application',
  data() {
    return {
      appuser: {
        username: 'guest',
        isLoggedIn: false
      }
    }
  }
}
</script>

<style lang="scss">
@import '~bulma';
html {
  font-size: 14px;
  padding: 0.25rem;
  height: 100%;
  background-color: whitesmoke;
}
</style>
