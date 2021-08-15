import Vue from "vue";
import Vuex from "vuex";
import globalService from "../services/globalservice";

Vue.use(Vuex);

const userToken = localStorage.getItem("userToken");
const userId = localStorage.getItem("userId");
const userName = localStorage.getItem("userName");
const userRole = localStorage.getItem("userRole");

export default new Vuex.Store({
  state: {
    userToken,
    userId,
    userName,
    userRole,
  },
  getters: {
    userToken: (state) => state.userToken,
    userId: (state) => state.userId,
    userName: (state) => state.userName,
    userRole: (state) => state.userRole,
    isAuthenticated: (state) => {
      return !!state.userToken;
    },
  },
  mutations: {
    setUserToken(state, token) {
      state.userToken = token;
      localStorage.setItem("userToken", token);
    },
    setUserId(state, token) {
      state.userId = token;
      localStorage.setItem("userId", token);
    },
    setUserName(state, token) {
      state.userName = token;
      localStorage.setItem("userName", token);
    },
    setUserRole(state, token) {
      state.userRole = token;
      localStorage.setItem("userRole", token);
    },
  },
  actions: {
    userToken({ commit }, status) {
      commit("setUserToken", status);
    },
    userId({ commit }, status) {
      commit("setUserId", status);
    },
    userName({ commit }, status) {
      commit("setUserName", status);
    },
    userRole({ commit }, status) {
      commit("setUserRole", status);
    },
    login({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        globalService
          .login(credentials)
          .then((data) => {
            commit("setUserToken", data.token);
            commit("setUserId", data._id);
            commit("setUserName", data.userName);
            commit("setUserRole", data.role);
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    register({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        globalService
          .register(credentials)
          .then((data) => {
            commit("setUserToken", data.token);
            commit("setUserId", data._id);
            commit("setUserName", data.userName);
            commit("setUserRole", data.role);
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    logout({ commit }, router) {
      return new Promise((resolve, reject) => {
        globalService
          .logout()
          .then((data) => {
            commit("setUserToken", null);
            commit("setUserId", null);
            commit("setUserName", null);
            commit("setUserRole", null);
            localStorage.clear();
            router.push("/login");
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  modules: {},
});
