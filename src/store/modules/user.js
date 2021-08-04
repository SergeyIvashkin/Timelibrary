/* eslint-disable no-useless-catch */
import firebase from "firebase/app";

import User from "./user_help";

export default {
  state: {
    user: null,
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    // Registration page
    async REGISTER_USER({ commit }, { email, password }) {
      // logic
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      commit("SET_USER", new User(user.user.uid));
    },
    // Login page
    async LOGIN_USER({ commit }, { email, password }) {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      commit("SET_USER", new User(user.user.uid));
    },
    async LOGGED_USER({ commit }, payload) {
      commit("SET_USER", new User(payload.uid));
    },
    LOG_OUT({ commit }) {
      firebase.auth().signOut();
      commit("SET_USER", null);
    },
  },
  getters: {
    // Return user (for get id)
    USER(state) {
      return state.user;
    },
    // Check User (for logged)
    CHECK_USER(state) {
      return state.user !== null;
    },
  },
};
