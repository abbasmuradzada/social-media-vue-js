import Vue from 'vue'
import Vuex from 'vuex'
import globalService from '../services/globalservice'

Vue.use(Vuex)

const userToken = localStorage.getItem("userToken")
const userId = localStorage.getItem("userId")
const userRole = localStorage.getItem("userRole")

export default new Vuex.Store({
  state: {
    userToken,
    userId,
    userRole
  },
  getters: {
    userToken: state => state.userToken,
    userId: state => state.userId,
    userRole: state => state.userRole,
    isAuthenticated: state => {
      return !!state.userToken
    }
  },
  mutations: {
    setUserToken(state, token) {
      state.userToken = token
      localStorage.setItem("userToken", token)
    },
    setUserId(state, token) {
      state.userId = token
      localStorage.setItem("userId", token)
    },
    setUserRole(state, token) {
      state.userRole = token
      localStorage.setItem("userRole", token)
    },
  },
  actions: {
    userToken({ commit }, status) {
      commit('setUserToken', status)
    },
    userId({ commit }, status) {
      commit('setUserId', status)
    },
    userRole({ commit }, status) {
      commit('setUserRole', status)
    },
    login({commit}, credentials) {
      return new Promise((resolve, reject) => {
        globalService.login(credentials)
          .then((data) => {
            commit('setUserToken', data.token)
            commit('setUserId', data._id)
            commit('setUserRole', data.role)              
            resolve(data)
          })
          .catch((err) => {
            reject(err);
          })
      })
    },
    register({commit}, credentials) {
      return new Promise((resolve, reject) => {
        globalService.register(credentials)
          .then((data) => {
            commit('setUserToken', data.token)
            commit('setUserId', data._id)
            commit('setUserRole', data.role)              
            resolve(data)
          })
          .catch((err) => {
            reject(err);
          })
      })
    },
  },
  modules: {
  }
})
