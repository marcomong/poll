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
  },
  setCodeLocaStorage (_, code) {
    localStorage.setItem('code', code)
  },
  assignCode (state) {
    let code = localStorage.getItem('code')
    state.code = code == null ? '' : code
  }
}

const actions = {
  create ({ commit }, payload) {
    commit('setError')
    PollService.create(payload)
      .then((res) => {
        commit('setPoll', res.data.body)
        commit('setCodeLocaStorage', res.data.body.code)
        commit('goToRoute', { routeName: 'pollInfo' })
      })
      .catch((err) => {
        commit('setError', err)
      })
  },
  retrievePoll ({ commit }, code) {
    commit('setError')
    commit('setPoll', {})
    commit('setCodeLocaStorage', code)
    PollService.retrievePoll(code)
      .then((res) => {
        commit('setPoll', res.data.body)
      })
      .catch((err) => {
        commit('setError', err)
      })
  },
  answerPoll ({ commit, state, rootState }, answers) {
    let body = {
      code: state.code,
      fingerPrint: rootState.fingerPrint,
      answers: answers
    }
    commit('setError')
    commit('setCodeLocaStorage', state.code)

    PollService.answerPoll(body)
      .then((res) => {
        commit('goToRoute', { routeName: 'statistics', parameters: { code: state.code } })
      })
      .catch((err) => {
        commit('setError', err.response.data)
        commit('goToRoute', { routeName: 'statistics', parameters: { code: state.code } })
      })
  },
  retrievePollStatistics ({ commit }, code) {
    commit('setCodeLocaStorage', code)
    PollService.retrievePollStatistics(code)
      .then((res) => {
        commit('setPoll', res.data.body)
      })
      .catch((err) => {
        commit('setError', err)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
