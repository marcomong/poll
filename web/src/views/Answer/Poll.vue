<template>
  <div class="pollContainer">
    <div class="question">
      What is your favorite animal?
    </div>
    <div class="answersContainer">
      <AnswerRadio v-for="answer in answers" :key="answer._id"
        :value="answer"
        :isEditing= false
        @click.native="answerSelected(answer)">
      </AnswerRadio>
    </div>
    <div>
      <button class="btn btn__green" :class="{'btn__green-disabled': !canSendAnswer}" :disabled="!canSendAnswer" @click="sendVote()">Vote</button>
    </div>
    <p class="answerPollCode">
      Poll: <strong>{{code}}</strong>
    </p>
  </div>
</template>

<script>
import AnswerRadio from '@/components/AnswerRadio.vue'

export default {
  data () {
    return {
      code: 1234,
      canSendAnswer: false,
      answers: [
        {
          _id: 1,
          value: 'Cat',
          selected: false
        },
        {
          _id: 2,
          value: 'Dog',
          selected: false
        },
        {
          _id: 3,
          value: 'Rabbit',
          selected: false
        }
      ]
    }
  },
  components: {
    AnswerRadio
  },
  methods: {
    answerSelected (answer) {
      this.canSendAnswer = true
      this.answers = this.answers.map((a) => {
        a.selected = a._id === answer._id
        return a
      })
    },
    sendVote () {
      const answerSelected = this.answers.filter(a => a.selected === true)[0]
      console.log(answerSelected)
      this.$store.commit('goToRoute', { routeName: 'statistics', parameters: { code: this.code } })
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/components/answer/_poll.scss";
</style>
