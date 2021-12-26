import Vue from "vue";
import store from "../store";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Task from "../views/Task";
import Registration from "../views/Registration";
import Login from "../views/Login";

import Test2 from "../views/Test2";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      store.getters.CHECK_USER ? next() : next("/login");
    },
  },
  {
    path: "/task",
    name: "Task",
    component: Task,
    beforeEnter: (to, from, next) => {
      store.getters.CHECK_USER ? next() : next("/login");
    },
  },
  {
    path: "/test2",
    name: "Test2",
    component: Test2,
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
