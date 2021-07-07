<template>
  <div class="d-flex flex-column row">
    <div>
      <v-chip link outlined class="mt-5 mr-3" close> Add New </v-chip>
    </div>
    <v-row class="align-center mt-3">
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="message"
          label="New tag"
          clearable
        ></v-text-field>
      </v-col>
      <v-btn elevation="2" outlined>SEND</v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "AddNewChips",
  data() {
    return {};
  },
  methods: {},
};
</script>


<style lang="scss" scoped>
</style>