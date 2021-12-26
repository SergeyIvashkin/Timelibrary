<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <label for="id">ID</label>
    <input type="checkbox" id="id" v-model="id" />
    <v-checkbox
      v-model="setting"
      @change="showBlock()"
      label="Checkbox 1"
    ></v-checkbox>
    <v-card-title>Cafe Badilico</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">4.5 (413)</div>
      </v-row>

      <div class="my-4 text-subtitle-1">$ • Italian, Cafe</div>

      <div v-for="(item, idx) in options2" :key="idx">
        {{ item.title }}
      </div>
    </v-card-text>
    <hr />
    <p>Предосмотр</p>
    <div v-for="(value, label, idx) in needArr" :key="idx">
      {{ label }} / {{ value }}
    </div>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Tonight's availability</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="reserve">
        Reserve
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      setting: false,
      setting_list: [
        { show: false }, ///tr
        { show: false }, ///tr
        { show: false }, ///tr
      ],
      itemShow: false,
      loading: false,
      selection: 1,
      yes: false,
      text: "sfsfdfsdlg,lb,tl,ohyoy,,btldwdwd",
      saveTetxt: "",
      selectedUsers: [],
      value: {
        title: "Explorer",
        desc: "Discovering new species!",
      },
      testObj: {
        0: [
          {
            title: "Space",
            desc: "Morespacebattles!",
          },
          {
            title: "Pirate",
            desc: "Morespacebattles!",
          },
        ],
        1: [
          {
            title: "two",
            desc: "Morespacebattles!",
          },
        ],
        2: [
          {
            title: "three",
            desc: "Morespacebattles!",
          },
          {
            title: "four",
            desc: "Morespacebattles!",
          },
        ],
      },
      set: null,
      num: null,
    };
  },
  props: {
    options2: {
      type: Array,
    },
    needArr: {
      type: Object,
    },
    feed: {
      type: Object,
    },
  },
  watch: {
    numParent(v) {
      console.log("fsfsfsf", v);
      this.getDataPage();
    },
  },
  mounted() {},
  methods: {
    getDataPage() {
      this.set = {
        needArr: this.needArr,
        testObj: this.testObj,
        value: this.value,
        options: this.options,
        text: this.text,
        setting_listtext: this.setting_list,
      };
    },
    showBlock() {
      this.$emit("showBlock", this.setting);
    },
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
  },
  computed: {
    GetDataPage() {
      return {
        needArr: this.needArr,
        testObj: this.testObj,
        value: this.value,
        options: this.options,
        text: this.text,
        setting_listtext: this.setting_list,
      };
    },
    getObjParent() {
      return this.obj;
    },
  },
};
</script>