<template>
  <div class="statistics">
    <div class="question">
      {{ statistics.question }}
      <p class="numOfVotes">
        VOTES: {{statistics.votes}}
      </p>
    </div>
    <ResultBar v-for="answer in statistics.answers"
      :key="answer._id"
      :percentage="answer.percentage"
      :answer="answer.value">
    </ResultBar>
    <div class="statistics__btn">
      <button class="btn btn__green">JOIN NEW POLL</button>
      <button class="btn btn__white">CREATE POLL</button>
    </div>
  </div>
</template>

<script>
import ResultBar from '@/components/ResultBar.vue'
export default {
  data () {
    return {
      statistics: {
        votes: 10,
        question: 'What is your fevorite animal?',
        answers: [
          {
            _id: 1,
            value: 'Cat',
            percentage: '10%'
          },
          {
            _id: 2,
            value: 'Dog',
            percentage: '30%'
          },
          {
            _id: 3,
            value: 'Rabbit',
            percentage: '60%'
          }
        ]
      }
    }
  },
  components: {
    ResultBar
  }
}
</script>

<style lang="scss">
@import "@/styles/components/answer/_statistics.scss";
</style>
