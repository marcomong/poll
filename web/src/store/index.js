import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

import auth from './modules/auth'
import error from './modules/error'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    error: null
  },
  getters: {
    isUserLoggedIn: state => state.user != null
  },
  mutations: {
    setUserInfo (state, payload) {
      state.user = payload
    },
    goToRoute (_, payload) {
      router.push({ name: payload.routeName, params: payload.parameters })
    }
  },
  actions: {
  },
  modules: {
    auth,
    error
  }
})
