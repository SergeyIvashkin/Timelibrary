import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
//

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
// Your web app's Firebase configuration

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
    let config = {
      apiKey: "AIzaSyBrB0Vwet-282YF60EsD2ukho5uLXolIaE",
      authDomain: "time-library-bd415.firebaseapp.com",
      databaseURL:
        "https://time-library-bd415-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "time-library-bd415",
      storageBucket: "time-library-bd415.appspot.com",
      messagingSenderId: "264730023696",
      appId: "1:264730023696:web:c457cd91702c0597afb795",
    };
    // Initialize Firebase
    firebase.initializeApp(config);

    // Auth Check
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("LOGGED_USER", user);
        this.$router.push("/");

        // Loading All Tasks
        this.$store.dispatch("loadTasks");
      }
    });
  },
}).$mount("#app");
