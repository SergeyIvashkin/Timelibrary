import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default {
  state: {
    tags: [
      {
        title: "Comedy",
        use: false,
      },
      { title: "Western", use: false },
      { title: "Adventure", use: false },
    ],
  },
  mutations: {},
  actions: {},
  getters: {
    TAGS(state) {
      return state.tags;
    },
  },
};
