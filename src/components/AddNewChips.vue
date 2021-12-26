<template>
  <div class="d-flex flex-column row">
    <div>
      <v-chip @click="visible = !visible" link outlined class="mt-5 mr-3" close>
        Add New
      </v-chip>
    </div>
    <v-row v-show="visible" class="align-center mt-3">
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="message"
          label="New tag"
          clearable
        ></v-text-field>
      </v-col>
      <v-btn elevation="2" @click="newTag" outlined>SEND</v-btn>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddNewChips",
  data() {
    return {
      message: "ggg",
      visible: true,
    };
  },
  methods: {
    ...mapActions(["ADD_NEW_TAG"]),
    newTag() {
      if (!this.message) return;
      this.ADD_NEW_TAG(this.message);
      this.message = "";
    },
  },
};
</script>


<style lang="scss" scoped>
</style>