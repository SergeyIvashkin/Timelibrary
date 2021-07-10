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
    SET_TASK_COMPLETED(state, listTask) {
      for (const obj of state.tasks) {
        if (listTask.includes(obj.title)) {
          obj.completed = true;
        }
      }
    },
    NEW_TASK(state, objNewTask) {
      state.tasks.push(objNewTask);
    },
  },
  actions: {
    async TASK_COMPLETED({ commit }, listTask) {
      await commit("SET_TASK_COMPLETED", listTask);
    },
    NEW_TASK({ commit }, objNewTask) {
      commit("NEW_TASK", objNewTask);
    },
  },
  getters: {
    TASKS(state) {
      return state.tasks;
    },
    TASK_COPMLETED(state) {
      return state.tasks.filter((el) => el.completed);
    },
    TASK_NO_COMPLETED(state) {
      return state.tasks.filter((el) => el.completed === false);
    },
  },
};
