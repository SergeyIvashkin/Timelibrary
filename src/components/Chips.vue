<template>
  <div class="row">
    <div
      @click="addSelected(selection)"
      v-for="selection in TAGS"
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
          DELETE_TAG(selection.title);
          selection.use = false;
        "
      >
        {{ selection.title }}
      </v-chip>
    </div>
    <div>{{ GET_TAGS_USED }}</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Chips",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["TAGS", "GET_TAGS_USED"]),
  },

  methods: {
    ...mapActions(["USE_TAGS", "DELETE_TAG"]),
    addSelected(selection) {
      if (!this.GET_TAGS_USED.includes(selection.title)) {
        this.GET_TAGS_USED.push(selection.title);
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