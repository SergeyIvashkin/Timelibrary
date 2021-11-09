<template>
  <div>
    <div class="block">
      <v-col>
        <h1>Login</h1>
      </v-col>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-col>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
        <!--  -->
        <v-col>
          <v-text-field
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show ? 'text' : 'password'"
            label="Password"
            counter
            @click:append="show = !show"
            v-model="password"
          ></v-text-field>
        </v-col>
        <!--  -->

        <v-col>
          <v-btn
            class="mr-4"
            @click.prevent="submit"
            elevation="2"
            outlined
            type="submit"
            :disabled="!valid"
          >
            Login
          </v-btn>
        </v-col>
      </v-form>
      <v-col>
        Need Registration?
        <router-link to="/registration"> Enter Here </router-link>
      </v-col>
      <v-col class="red--text">{{ submitStatus }}</v-col>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data: () => ({
    valid: true,
    show: false,
    email: "",
    password: "",
    submitStatus: "",
    passwordRules: [
      (value) => !!value || "Required.",
      (v) => v.length >= 5 || "Name must be more than 5 characters",
      // () => `The email and password you entered don't match`,
    ],

    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
  }),
  methods: {
    ...mapActions(["LOGIN_USER"]),
    async submit() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password,
        };
        try {
          await this.LOGIN_USER(user);
          this.$router.push("/");
        } catch (error) {
          this.submitStatus = error.message;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.block {
  margin: auto;
  max-width: 450px;
}
.col-12 {
  padding: 0;
}
</style>
