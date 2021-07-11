<template>
  <div>
    <v-col>
      <h1>Registration</h1>
    </v-col>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-col>
        <v-col cols="12" md="4" class="ma-auto">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
        <!--  -->
        <v-col cols="12" md="4" class="ma-auto">
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
        <v-col cols="12" md="4" class="ma-auto">
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
        <v-col cols="12">
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
      </v-col>
    </v-form>
    <div>
      Do tou have account?
      <router-link to="/login"> Enter Here </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Registration",
  data: () => ({
    valid: true,
    show: false,
    show2: false,
    email: "",
    repeatPassword: "",
    password: "",
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
    submit() {
      console.log(this.$refs.form.validate());
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
</style>
