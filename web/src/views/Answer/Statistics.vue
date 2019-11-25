<template>
  <div class="statistics">
    <div class="error" v-if="error.message != null">
      {{error.message}}
    </div>
    <div class="question">
      {{ poll.question }}
      <p class="numOfVotes">
        VOTES: {{poll.votes}}
      </p>
    </div>
    <ResultBar v-for="statistic in poll.statistics"
      :key="statistic.id"
      :percentage="`${statistic.percentage.toFixed(0)}%`"
      :answer="statistic.value">
    </ResultBar>
    <div class="statistics__btn">
      <button class="btn btn__green" @click="goToRoute('pollCode')">JOIN NEW POLL</button>
      <button class="btn btn__white" @click="goToRoute('definePoll')">CREATE POLL</button>
    </div>
  </div>
</template>

<script>
import ResultBar from '@/components/ResultBar.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    ResultBar
  },
  computed: {
    ...mapGetters(['getPoll', 'getError']),
    poll () {
      return this.getPoll
    },
    error () {
      return this.getError
    }
  },
  methods: {
    ...mapActions(['retrievePollStatistics']),
    loadPollStatistics (code) {
      return this.retrievePollStatistics(code)
    },
    goToRoute (name) {
      this.$store.commit('goToRoute', { routeName: name })
    }
  },
  created () {
    const code = this.$route.params.code
    this.loadPollStatistics(code)
  }
}
</script>

<style lang="scss">
@import "@/styles/components/answer/_statistics.scss";
</style>
