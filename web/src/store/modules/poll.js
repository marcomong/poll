// import router from '@/router'
import PollService from '@/services/PollService'

const state = {
  question: null,
  answers: [],
  code: null,
  statistics: [],
  votes: null
}

const getters = {
  getPoll: state => state
}

const mutations = {
  setPoll (state, payload) {
    state.answers = payload.answers
    state.question = payload.question
    state.code = payload.code
    state.statistics = payload.statistics == null ? [] : payload.statistics
    state.votes = payload.votes
  },
  setAnswer (state, answerId) {
    let tmpAnswers = state.answers.map((a) => {
      a.selected = a.id === answerId
      return a
    })
    state.answers = tmpAnswers
  }
}

const actions = {
  create ({ commit }, payload) {
    PollService.create(payload)
      .then((res) => {
        if (res.data.success) {
          commit('setPoll', res.data.body)
          commit('goToRoute', { routeName: 'pollInfo' })
        } else {
          console.log('error')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  retrievePoll ({ commit }, code) {
    PollService.retrievePoll(code)
      .then((res) => {
        if (res.data.success) {
          commit('setPoll', res.data.body)
        } else {
          console.log('error')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  answerPoll ({ commit, state, rootState }, answers) {
    let body = {
      code: state.code,
      fingerPrint: rootState.fingerPrint,
      answers: answers
    }
    PollService.answerPoll(body)
      .then((res) => {
        commit('goToRoute', { routeName: 'statistics', parameters: { code: this.code } })
      })
      .catch((err) => {
        console.log(err)
      })
  },
  retrievePollStatistics ({ commit }, code) {
    PollService.retrievePollStatistics(code)
      .then((res) => {
        if (res.data.success) {
          commit('setPoll', res.data.body)
        } else {
          console.log('error')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
