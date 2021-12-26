<template>
  <div class="buttons">
    <div class="d-none d-md-flex">
      <router-link
        v-for="link in linkMenu"
        :key="link.title"
        :to="`${link.url}`"
        >{{ link.title }}</router-link
      >
      <v-btn
        @click="logOut"
        v-if="CHECK_USER"
        color="primary"
        elevation="2"
        outlined
        >LogOut</v-btn
      >
    </div>
    <div class="d-flex d-sm-flex d-md-none">
      <v-menu bottom origin="center" transition="scale-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="grey" dark v-bind="attrs" v-on="on">
            <v-icon v-bind="attrs" v-on="on"> mdi-menu </v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="link in linkMenu" :key="link.title">
            <router-link :to="`${link.url}`">
              <v-list-item-title>{{ link.title }}</v-list-item-title>
            </router-link>
          </v-list-item>
          <v-list-item v-if="CHECK_USER" @click="logOut"> LogOut </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(["LOG_OUT"]),
    logOut() {
      this.LOG_OUT();
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapGetters(["CHECK_USER"]),
    linkMenu() {
      if (this.CHECK_USER) {
        return [
          { title: "Home", url: "/" },
          { title: "Task", url: "/task" },
          { title: "Test", url: "/test2" },
        ];
      }
      return [
        { title: "Login", url: "/login" },
        { title: "Registration", url: "/registration" },
      ];
    },
  },
};
</script>


<style lang="scss" scoped>
.buttons a {
  margin-right: 11px;
}
</style>