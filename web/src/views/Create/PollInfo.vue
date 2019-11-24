<template>
  <div class="pollInfo">
    <h1 class="pollInfo__header">Save and share the poll!</h1>
    <div class="pollInfo__section">
      <div class="pollInfo__section__title">
        Link
      </div>
      <div class="pollInfo__section__content">
        <div class="pollInfo__section__content__value">
          <a :href="generateAnswerPollUrl()">{{ generateAnswerPollUrl() }}</a>
        </div>
        <button class="btn btn__green btn-small">copy</button>
      </div>
    </div>
    <div class="pollInfo__section">
      <div class="pollInfo__section__title">
        Code
      </div>
      <div class="pollInfo__section__content">
        <div class="pollInfo__section__content__value">
          {{ poll.code }}
        </div>
        <button class="btn btn__green btn-small">copy</button>
      </div>
    </div>
    <div class="pollInfo__section">
      <div class="pollInfo__section__title">
        Results
      </div>
      <div class="pollInfo__section__content">
        <div class="pollInfo__section__content__value">
          <a :href="generatePollUrl()">{{ generatePollUrl() }}</a>
        </div>
        <button class="btn btn__green btn-small">copy</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getPoll']),
    poll () {
      return this.getPoll
    }
  },
  methods: {
    generatePollUrl () {
      return `http://localhost:8080/answer/statistics/${this.poll.code}`
    },
    generateAnswerPollUrl () {
      return `http://localhost:8080/answer/poll/${this.poll.code}`
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/components/create/_pollInfo.scss";
</style>
