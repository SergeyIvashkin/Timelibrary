import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default {
  state: {
    tasks: [
      {
        id: 1,
        title: "Matrix",
        description: "I directed this documentary challengi",
        whatWatch: "Film",
        completed: false,
        editing: false,
      },
      {
        id: 2,
        title: "Game of thrones",
        description: "Best serials",
        whatWatch: "Film",
        completed: false,
        editing: false,
      },
    ],
  },
  mutations: {
    // LOAD_TASKS(state, payload) {
    //   state.tasks = payload;
    // },
    NEW_TASK(state, objNewTask) {
      state.tasks.push(objNewTask);
    },
  },
  actions: {
    NEW_TASK({ commit }, objNewTask) {
      commit("NEW_TASK", objNewTask);
    },
  },
  getters: {
    TASKS(state) {
      return state.tasks;
    },
  },
};
