<template>
  <div>
    <div class="block">
      <v-col>
        <h1>Registration</h1>
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
          <v-text-field
            :rules="[passwordConfirmationRule]"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            label="Repeat you password"
            counter
            @click:append="show2 = !show2"
            v-model="repeatPassword"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-btn
            class="mr-4"
            @click.prevent="submit"
            elevation="2"
            outlined
            type="submit"
            :disabled="!valid"
          >
            SEND
          </v-btn>
        </v-col>
      </v-form>
      <v-col>
        Do tou have account?
        <router-link to="/login"> Enter Here </router-link>
      </v-col>
      <v-col class="red--text">{{ submitStatus }}</v-col>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Registration",
  data: () => ({
    valid: true,
    show: false,
    show2: false,
    email: "",
    repeatPassword: "",
    password: "",
    submitStatus: "",
    passwordRules: [
      (value) => !!value || "Required.",
      (v) => v.length >= 5 || "Name must be more than 5 characters",
    ],

    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
  }),
  methods: {
    ...mapActions(["REGISTER_USER"]),
    async submit() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password,
        };
        try {
          await this.REGISTER_USER(user);
          this.$router.push("/");
        } catch (error) {
          this.submitStatus = error.message;
        }
      }
    },
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.repeatPassword || "Password must match";
    },
  },
};
</script>

<style lang="scss" scoped>
.col-12 {
  padding: 0;
}
.block {
  margin: auto;
  max-width: 450px;
}
</style>
