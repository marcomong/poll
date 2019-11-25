<template>
  <div class="pollContainer">
    <div class="error" v-if="error.message != null">
      {{error.message}}
    </div>
    <div class="question" v-if="error.message == null && poll != {}">
      {{ poll.question }}
    </div>
    <div class="answersContainer" v-if="error.message == null && poll != {}">
      <AnswerRadio v-for="answer in poll.answers" :key="answer.id + '_' + answer.selected"
        :value="answer"
        :isEditing= false
        @click.native="answerSelected(answer)">
      </AnswerRadio>
    </div>
    <div v-if="error.message == null && poll != {}">
      <button class="btn btn__green" :class="{'btn__green-disabled': !canSendAnswer}" :disabled="!canSendAnswer" @click="sendVote()">Vote</button>
    </div>
    <div v-else>
      <button class="btn btn__white" @click="back()">BACK</button>
    </div>
    <p class="answerPollCode" v-if="error == null">
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
    ...mapGetters(['getPoll', 'getError']),
    poll () {
      return this.getPoll
    },
    error () {
      return this.getError
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
      this.answerPoll(answersSelected)
    },
    loadPoll () {
      const code = this.$route.params.code
      return this.retrievePoll(code)
    },
    back () {
      this.$router.go(-1)
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
