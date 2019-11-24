<template>
  <div class="pollContainer">
    <div class="question">
      {{ poll.question }}
    </div>
    <div class="answersContainer">
      <AnswerRadio v-for="answer in poll.answers" :key="answer.id + '_' + answer.selected"
        :value="answer"
        :isEditing= false
        @click.native="answerSelected(answer)">
      </AnswerRadio>
    </div>
    <div>
      <button class="btn btn__green" :class="{'btn__green-disabled': !canSendAnswer}" :disabled="!canSendAnswer" @click="sendVote()">Vote</button>
    </div>
    <p class="answerPollCode">
      Poll: <strong>{{ poll.code }}</strong>
    </p>
  </div>
</template>

<script>
import AnswerRadio from '@/components/AnswerRadio.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      canSendAnswer: false
    }
  },
  computed: {
    ...mapGetters(['getPoll']),
    poll () {
      return this.getPoll
    }
  },
  components: {
    AnswerRadio
  },
  methods: {
    ...mapActions(['retrievePoll', 'answerPoll']),
    answerSelected (answer) {
      this.canSendAnswer = true
      this.$store.commit('setAnswer', answer.id)
    },
    sendVote () {
      const answersSelected = [...this.poll.answers.filter(a => a.selected === true).map((a) => a.id)]
      // console.log(answersSelected)
      this.answerPoll(answersSelected)
      // this.$store.commit('goToRoute', { routeName: 'statistics', parameters: { code: this.code } })
    },
    loadPoll () {
      const code = this.$route.params.code
      return this.retrievePoll(code)
    }
  },
  mounted () {
    this.loadPoll()
  }
}
</script>

<style lang="scss">
@import "@/styles/components/answer/_poll.scss";
</style>
