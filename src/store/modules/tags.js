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
    tagsUsed: [],
  },
  mutations: {
    SET_USE_TAGS(state, payload) {
      state.tagsUsed.pusg(payload);
    },
    SET_DELETE_TAG(state, tag) {
      state.tagsUsed = state.tagsUsed.filter((el) => el !== tag);
    },
  },
  actions: {
    USE_TAGS({ commit, payload }) {
      commit("SET_USE_TAGS", payload);
    },
    DELETE_TAG({ commit }, tag) {
      commit("SET_DELETE_TAG", tag);
    },
  },
  getters: {
    TAGS(state) {
      return state.tags;
    },
    GET_TAGS_USED(state) {
      return state.tagsUsed;
    },
  },
};
