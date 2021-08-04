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

    <CardTask
      v-for="task in filterTask"
      :key="task.id"
      :class="{ completed: task.completed }"
      :task="task"
      @completedTask="completedTask"
      @editTask="editTask"
    />
  </div>
</template>

<script>
import CardTask from "../components/CardTask";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Task",
  components: {
    CardTask,
  },
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
      console.log(this.TASKS);
      return this.TASKS;
    },
  },
  methods: {
    ...mapActions(["TASK_COMPLETED", "EDIT_TASK"]),
    completedTask(id) {
      this.TASK_COMPLETED(id);
    },
    editTask(newData) {
      this.EDIT_TASK(newData);
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  max-width: 444px;
  margin: auto;
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
