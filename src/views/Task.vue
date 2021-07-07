<template>
  <div>
    <h1>Tasks</h1>
    <v-card
      class="mb-5 pa-3"
      max-width="444"
      v-for="task in TASKS"
      :key="task.id"
    >
      <div class="card_top pb-5">
        <span class="title">{{ task.whatWatch }}</span>
        <span class="ml-3"> Total Time:</span>
        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-close </v-icon>
        </v-btn>
      </div>

      <v-list-item-title class="pb-5 text-h5 mb-1 d-flex align-center">
        <v-checkbox color="secondary"></v-checkbox>
        {{ task.title }}
      </v-list-item-title>
      <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Task",
  computed: {
    ...mapGetters(["TASKS"]),
  },
};
</script>

<style lang="scss" scoped>
.card_top {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.title {
  background: grey;
  padding: 0px 15px;
  color: white;
  font-weight: 300;
}
</style>
