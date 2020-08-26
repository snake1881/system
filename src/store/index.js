import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    routes: [],
    currentUser: localStorage.getItem("user")
      ? localStorage.getItem("user")
      : ""
  },
  mutations: {
    INIT_CURRENTHR(state, user) {
      state.currentUser = user;
      localStorage.setItem("user", user);
    },
    initRoutes(state, data) {
      state.routes = data;
    }
  },
  actions: {},
  modules: {}
});
