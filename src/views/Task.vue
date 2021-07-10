<template>
  <div class="main">
    <div class="d-flex justify-start state">
      <h1>Tasks</h1>
    </div>
    <div class="d-flex justify-end">
      <div
        @click="active = title"
        v-for="title in state"
        :key="title"
        class="mr-1 mb-3"
      >
        <v-chip outlined link :class="{ active: title === active }">
          {{ title }}
        </v-chip>
      </div>
    </div>

    <v-card
      class="mb-5 pa-3"
      max-width="444"
      v-for="task in filterTask"
      :key="task.id"
      :class="{ completed: task.completed }"
      :disabled="(completedCard = task.completed)"
    >
      <div class="card_top pb-5">
        <span class="title">{{ task.whatWatch }}</span>
        <span class="ml-3"> Total Time: {{ task.time }} </span>
        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-close </v-icon>
        </v-btn>
      </div>

      <v-list-item-title class="pb-5 text-h5 mb-1 d-flex align-center">
        <v-checkbox
          @change="onChangeSelectedTask"
          :value="task.title"
          v-model="selected"
          color="secondary"
        ></v-checkbox>
        {{ task.title }}
      </v-list-item-title>
      <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
      <div class="d-flex justify justify-start">
        <div v-for="el in task.tagUsed" :key="el" class="mr-1">
          <v-chip> {{ el }} </v-chip>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Task",
  data() {
    return {
      completedCard: false,
      selected: [],
      active: "Active",
      state: ["Active", "Completed", "All"],
    };
  },
  computed: {
    ...mapGetters(["TASKS", "TASK_COPMLETED", "TASK_NO_COMPLETED"]),
    filterTask() {
      if (this.active === "Active") {
        return this.TASK_NO_COMPLETED;
      }
      if (this.active === "Completed") {
        return this.TASK_COPMLETED;
      }
      if (this.active === "All") {
        return this.TASKS;
      }
      return this.TASKS;
    },
  },
  methods: {
    ...mapActions(["TASK_COMPLETED"]),
    onChangeSelectedTask() {
      this.TASK_COMPLETED(this.selected);
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  max-width: 444px;
  margin: auto;
}
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
.active {
  color: #7979de;
  border: 2px solid #7979de;
}
.completed {
  text-decoration: line-through;
  color: #909399 !important;
}
</style>
