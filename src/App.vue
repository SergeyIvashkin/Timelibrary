<template>
  <v-app class="main">
    <v-app-bar app color="white" dark>
      <router-link to="/"> Time Library </router-link>
      <v-spacer></v-spacer>
      <ButtonsNav />
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ButtonsNav from "./components/ButtonsNav.vue";
export default {
  name: "App",
  components: { ButtonsNav },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300&display=swap");
a {
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
  letter-spacing: 2px;
  font-size: 20px;
  color: black !important;
}
.main {
  font-family: "Montserrat", sans-serif !important;
}
.v-main {
  padding: 60px 50px !important;
}
</style>