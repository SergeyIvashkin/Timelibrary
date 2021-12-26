<template>
  <div>
    <v-card
      class="mb-5 pa-3"
      max-width="444"
      :disabled="(completedCard = task.completed)"
    >
      <div class="card_top pb-5">
        <span class="title">{{ task.whatWatch }}</span>
        <span class="ml-3"> Total Time: {{ task.time }} </span>
        <v-spacer></v-spacer>

        <v-btn icon @click="deleteTask">
          <v-icon>mdi-close </v-icon>
        </v-btn>
      </div>

      <v-list-item-title class="pb-5 text-h5 mb-1 d-flex align-center">
        <v-checkbox
          @change="onChangeSelectedTask"
          :value="task.id"
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
      <!-- modal window -->
      <div class="text-right">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              rounded
              outlined
              color="accent"
              small
              v-bind="attrs"
              v-on="on"
            >
              Edit
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="newTitle" label="new Title">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      outlined
                      label="new Description"
                      v-model="newDesc"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="editTask(task.id, task.title, task.description)"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-card>
  </div>
</template>


<script>
import { mapActions } from "vuex";

export default {
  name: "CardTask",
  props: {
    task: {
      type: Object,
    },
  },
  data() {
    return {
      newTitle: this.task.title,
      newDesc: this.task.description,
      selected: [],
      dialog: false,
    };
  },
  methods: {
    ...mapActions(["DELETE_TASK"]),
    async deleteTask() {
      await this.DELETE_TASK(this.task.id);
      this.$store.dispatch("loadTasks");
    },
    editTask(id) {
      this.dialog = false;

      console.log(id);
      let title = (this.task.title = this.newTitle);
      let desc = (this.task.description = this.newDesc);

      this.$emit("editTask", { id, title, desc });
    },
    onChangeSelectedTask() {
      this.$emit("completedTask", this.selected[0]);
    },
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