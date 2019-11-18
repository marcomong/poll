<template>
  <div class="home">
    <div class="home__actions">
      <button class="btn btn__white">
        <img src="@/assets/question-mark.svg" alt="question mark" class="btn__image">
        <p>Create</p>
      </button>
      <button class="btn btn__green">
        <img src="@/assets/pencil.svg" alt="question mark" class="btn__image">
        <p>Answer</p>
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
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isUserLoggedIn']),
    isLoggedIn () {
      return this.isUserLoggedIn
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/components/_home.scss";
</style>
