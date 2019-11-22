<template>
   <header class="header">
     <router-link to="/">
      <p class="logo">LetMeAnswer</p>
     </router-link>
      <nav class="user">
        <div class="authContainer" v-if="!isLoggedIn && this.$route.name != 'logIn' && false">
          <router-link to="/logIn">
            LOGIN
          </router-link>
        </div>
        <div class="authContainer" v-if="isLoggedIn " @click="performLogout()">
          LOGOUT
        </div>
      </nav>
    </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isUserLoggedIn']),
    isLoggedIn () {
      return this.isUserLoggedIn
    }
  },
  methods: {
    ...mapActions(['logout']),
    performLogout () {
      return this.logout()
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/components/_header.scss";
</style>
