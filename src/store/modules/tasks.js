import Task from "./task_help";
import firebase from "firebase/app";

export default {
  state: {
    tasks: [],
  },
  mutations: {
    LOAD_TASKS(state, payload) {
      state.tasks = payload;
    },
    SET_TASK_COMPLETED(state, task) {
      for (const obj of state.tasks) {
        if (task.includes(obj.id)) {
          obj.completed = true;
        }
      }
    },
    NEW_TASK(state, payload) {
      state.tasks.push(payload);
    },
    SET_EDIT_TASK(state, { id, title, desc }) {
      const task = state.tasks.find((el) => el.id === id);

      task.title = title;
      task.description = desc;
    },
  },
  actions: {
    // Load all Tasks
    async loadTasks({ commit }) {
      try {
        // Get task
        const task = await firebase.database().ref("tasks").once("value");
        const tasks = task.val();
        const tasksArray = [];

        // Get task key (id)
        Object.keys(tasks).forEach((key) => {
          const keyTask = tasks[key];
          tasksArray.push(
            new Task(
              keyTask.title,
              keyTask.description,
              keyTask.whatWatch,
              keyTask.completed,
              keyTask.editing,
              keyTask.tagUsed,
              keyTask.time,
              keyTask.user,
              key
            )
          );
        });
        // Send mutation
        commit("LOAD_TASKS", tasksArray);
      } catch (error) {
        console.log(error.message);
      }
    },
    async TASK_COMPLETED({ commit }, id) {
      console.log(id);
      try {
        await commit("SET_TASK_COMPLETED", id);
        console.log(
          firebase.database().ref("tasks").child(id).child("completed")
        );
        await firebase
          .database()
          .ref("tasks")
          .child(id)
          .child("completed")
          .set(true);
      } catch (error) {
        console.log(error);
      }
    },
    async NEW_TASK({ commit, getters }, payload) {
      console.log(getters);

      try {
        const newTask = new Task(
          payload.title,
          payload.description,
          payload.whatWatch,
          payload.completed,
          payload.editing,
          payload.tagUsed,
          payload.time,
          getters.USER.id
        );
        const task = await firebase.database().ref("tasks").push(newTask);
        commit("NEW_TASK", { ...newTask, id: task.key });
      } catch (error) {
        console.log(error);
      }
    },
    async EDIT_TASK({ commit }, { id, title, desc }) {
      console.log(firebase.database().ref("tasks").child(id));
      try {
        // Update title & descr
        await firebase.database().ref("tasks").child(id).update({
          title,
          desc,
        });
      } catch (error) {
        console.log(error);
      }

      commit("SET_EDIT_TASK", { id, title, desc });
    },
    // Delete Task (button)
    async DELETE_TASK(_, id) {
      try {
        console.log(id);

        await firebase.database().ref("tasks").child(id).remove();
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    TASKS(state, getters) {
      return state.tasks.filter((el) => el.user === getters.USER.id);
    },
    TASK_COPMLETED(state, getters) {
      return getters.TASKS.filter((el) => el.completed);
    },
    TASK_NO_COMPLETED(state, getters) {
      return getters.TASKS.filter((el) => el.completed === false);
    },
  },
};
