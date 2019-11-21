<template>
  <div class="definePoll">
    <div class="definePoll__question">
      <div class="definePoll__sectionTitle">
        Question:
      </div>
      <textarea type="text" name="question" id="question" class="definePoll__question__content" placeholder="Type your question here ..." v-model="poll.question"></textarea>
    </div>
    <div class="definePoll__answers">
      <div class="definePoll__sectionTitle">
        Answers:
      </div>
      <AnswerRadio v-for="answer in poll.answers" :key="answer._id"
        :value.sync="answer"
        :isEditing= true>
      </AnswerRadio>
      <button class="definePoll__addAnswerBtn" @click="addAnswer()">
        <img src="@/assets/plus-solid.svg" alt="add" class="definePoll__addAnswerBtn-image">
      </button>
    </div>
    <div class="pageActions">
      <button class="btn btn__white pageActions__btn" @click="cancel()">cancel</button>
      <button class="btn btn__green pageActions__btn"
      :class="{'btn__green-disabled': !isSaveAvailable}"
      :disabled="!isSaveAvailable" @click="save()">
        Create
      </button>
    </div>
  </div>
</template>

<script>
import AnswerRadio from '@/components/AnswerRadio.vue'

export default {
  data () {
    return {
      isSaveAvailable: false,
      lastId: 2,
      poll: {
        question: '',
        answers: [
          {
            _id: 1,
            value: ''
          },
          {
            _id: 2,
            value: ''
          }
        ]
      }
    }
  },
  components: {
    AnswerRadio
  },
  methods: {
    addAnswer () {
      this.lastId += 1
      const newAnswer = {
        _id: this.lastId,
        value: ''
      }
      this.poll.answers.push(newAnswer)
    },
    deleteAnswer (answerToDelete) {
      this.poll.answers = this.poll.answers.filter(a => a._id !== answerToDelete._id)
    },
    cancel () {
      this.$store.commit('goToRoute', { routeName: 'home' })
    },
    save () {
      if (this.isFormValid()) {
        this.$store.commit('goToRoute', { routeName: 'pollInfo' })
      }
    },
    isFormValid () {
      let isValid = true
      if (this.poll.question.trim().length === 0) {
        isValid = false
        return isValid
      }
      this.poll.answers.forEach(element => {
        if (element.value.trim().length === 0) {
          isValid = false
        }
      })
      return isValid
    }
  },
  watch: {
    poll: {
      deep: true,
      handler () {
        this.isSaveAvailable = this.isFormValid()
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/components/create/_definePoll.scss";
</style>
