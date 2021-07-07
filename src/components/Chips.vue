<template>
  <div class="row">
    <div
      @click="addSelected(selection)"
      v-for="selection in selections"
      :key="selection.title"
    >
      <v-chip
        link
        outlined
        :class="{ greenBorder: selection.use }"
        class="mt-5 mr-3"
        close
        close-icon="mdi-close-outline"
        @click:close="
          tagsUsed = tagsUsed.filter((el) => el !== selection.title);
          selection.use = false;
        "
      >
        {{ selection.title }}
      </v-chip>
    </div>
    <div>{{ tagsUsed }}</div>
  </div>
</template>

<script>
export default {
  name: "Chips",
  data() {
    return {
      tagsUsed: [],
      selections: [
        {
          title: "Comedy",
          use: false,
        },
        { title: "Western", use: false },
        { title: "Adventure", use: false },
      ],
    };
  },
  methods: {
    // Chips addSelected
    addSelected(selection) {
      if (!this.selected.includes(selection.title)) {
        this.selected.push(selection.title);
        selection.use = true;
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.greenBorder {
  border: green 2px solid !important;
}
</style>