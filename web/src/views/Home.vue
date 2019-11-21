<template>
  <div class="home">
    <div class="home__container">
      <div class="home__actions">
        <button class="btn btn__white" @click="goToRoute('definePoll')">
          <div class="btn__imageContainer">
            <img src="@/assets/question-mark.svg" alt="question mark" class="btn__imageContainer__image">
          </div>
          <div class="btn__title">
            <p>Create</p>
          </div>
        </button>
        <button class="btn btn__green" @click="goToRoute('pollCode')">
          <div class="btn__imageContainer">
            <img src="@/assets/check-square-regular.svg" alt="question mark" class="btn__imageContainer__image">
          </div>
          <div class="btn__title">
            <p>Answer</p>
          </div>
        </button>
      </div>
      <div class="home__separator">
      </div>
      <div class="home__intro">
        <h2>Give your answer</h2>
        <h2>Make it count</h2>
        <h2>Real time</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isUserLoggedIn']),
    isLoggedIn () {
      return this.isUserLoggedIn
    }
  },
  methods: {
    goToRoute (route) {
      this.$store.commit('goToRoute', { routeName: route })
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/components/_home.scss";
</style>
