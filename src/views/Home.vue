<template>
  <div>
    <h1 class="mb-5">Home</h1>
    <v-col cols="12" sm="6" md="3" class="pa-0">
      <v-text-field
        :rules="rules"
        @keyup.enter="addNewTask"
        v-model="title"
        label="What we will watch ?"
        placeholder="Placeholder"
        solo
      ></v-text-field>
    </v-col>
    <!--  -->
    <v-col cols="12" md="6" class="pa-0">
      <v-textarea
        v-model="description"
        outlined
        name="input-7-4"
        label="Description "
      ></v-textarea>
    </v-col>
    <!--  -->
    <v-radio-group row v-model="radioVal">
      <v-radio label="Film" value="Film"></v-radio>
      <v-radio label="Serial" value="Serial"></v-radio>
    </v-radio-group>
    <p v-if="errorRadio">Required</p>
    <!--  -->
    <h4 v-if="radioVal === 'Film'">
      Total Film Times:
      <span>{{ filmTime }}</span>
    </h4>
    <h4 v-if="radioVal === 'Serial'">
      Total Film Serial <span> {{ serialTime }}</span>
    </h4>
    <!-- Block Film -->
    <v-col>
      <div v-if="radioVal === 'Film'">
        <v-row>
          <v-col cols="5" sm="3">
            <v-text-field label="Hours" v-model="filmHours"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="5" sm="3">
            <v-text-field label="Minutes" v-model="filmMinutes"></v-text-field>
          </v-col>
        </v-row>
        <!--  Show time -->
        <p>
          {{ filmTime }}
        </p>
      </div>
      <!-- Block Serial -->
      <div v-if="radioVal === 'Serial'">
        <v-row>
          <v-col cols="8" sm="4">
            <v-text-field
              label="How many season?"
              v-model="serialSeason"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8" sm="4">
            <v-text-field
              label="How many series?"
              v-model="serialSeries"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10" sm="6">
            <v-text-field
              label="How long is one series? (minutes)"
              v-model="serialSeriesMinutes"
            ></v-text-field>
          </v-col>
        </v-row>
        <!--  Show time -->
        <p>
          {{ serialTime }}
        </p>
      </div>
      <AddNewChips />
      <Chips />
    </v-col>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Chips from "../components/Chips.vue";
import AddNewChips from "../components/AddNewChips.vue";

export default {
  name: "Home",
  components: { Chips, AddNewChips },
  data() {
    return {
      errorRadio: false,
      isRed: false,
      rules: [(value) => !!value || "Required."],
      title: "",
      description: "",
      radioVal: null,
      // Film
      filmHours: 1,
      filmMinutes: 30,
      // Serial
      serialSeason: 1,
      serialSeries: 11,
      serialSeriesMinutes: 40,
    };
  },

  computed: {
    // FILM Total Time
    filmTime() {
      let min = this.filmHours * 60 + this.filmMinutes * 1;
      return this.getHoursAndMinutes(min);
    },
    // SERIAL Total Time
    serialTime() {
      let min =
        this.serialSeason * this.serialSeries * this.serialSeriesMinutes;
      return this.getHoursAndMinutes(min);
    },
  },
  methods: {
    // COMMON Total Time
    getHoursAndMinutes(minutes) {
      let hours = Math.trunc(minutes / 60);
      let min = minutes % 60;
      return hours + " Hours " + min + " Minutes";
    },
    ...mapActions(["NEW_TASK"]),
    addNewTask() {
      if (this.title === "") {
        return;
      } else if (!this.radioVal) {
        this.errorRadio = true;
        return;
      }

      let newTask = {
        id: Math.random(),
        title: this.title,
        description: this.description,
        whatWatch: this.radioVal,
        completed: false,
        editing: false,
      };
      (this.title = ""), (this.description = "");

      this.NEW_TASK(newTask);
    },
  },
};
</script>

<style lang="scss" scoped>
.error {
  border: 1px red solid;
}
p {
  color: red;
  font-size: 13px;
}
</style>
