import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

import auth from './modules/auth'
import error from './modules/error'
import poll from './modules/poll'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
    fingerPrint: null
  },
  getters: {
    isUserLoggedIn: state => state.user != null,
    getFingerPrint: state => state.fingerPrint
  },
  mutations: {
    setUserInfo (state, payload) {
      state.user = payload
    },
    goToRoute (_, payload) {
      router.push({ name: payload.routeName, params: payload.parameters })
    },
    setFingerPrint (state, id) {
      state.fingerPrint = id
    }
  },
  actions: {
  },
  modules: {
    auth,
    error,
    poll
  }
})
