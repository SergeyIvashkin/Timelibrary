<template>
  <div class="test2">
    <v-card :loading="feed.loading" class="mx-auto my-12" max-width="374">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <label for="id">ID</label>
      <input type="checkbox" id="id" v-model="feed.id" />
      <v-checkbox v-model="feed.itemShow" label="Checkbox 1"></v-checkbox>
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

        <div v-for="(value, label, idx) in feed.needArr" :key="idx">
          {{ label }}
          <v-text-field
            v-model="feed.needArr[label]"
            :label="feed.needArr[label]"
          ></v-text-field>
        </div>
      </v-card-text>
      <hr />
      <p>Предосмотр</p>
      <div v-for="(value, label, idx) in feed.needArr" :key="idx">
        {{ label }} /
        <a
          :class="{ active: idx === activeIndex }"
          @click.stop.prevent="activeIndex = idx"
          href="#"
          >{{ value }}</a
        >
      </div>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Tonight's availability</v-card-title>

      <v-card-text>
        <v-chip-group
          v-model="feed.selection"
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
    <v-btn @click="addObj" depressed color="primary"> ADD </v-btn>
    <div
      class="block-setting"
      v-for="(item, inx) in feed.setting_list"
      :key="inx"
    >
      <BlockSetting
        v-if="item.show"
        @showBlock="showBlock($event, inx)"
        :options2="feed.options2"
        :needArr="feed.needArr"
        :feed="feed"
      />
    </div>
  </div>
</template>

<script>
// import multiselect from "vue-multiselect";
import BlockSetting from "../components/BlockSetting.vue";

export default {
  name: "Test2",
  components: { BlockSetting },
  data() {
    return {
      activeIndex: -1,
      feed: {
        id: "",
        numParent: 0,
        setting_list: [
          { show: false }, ///tr
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
        options: {
          user_exchanges: [
            {
              currencies_limits: {},
              drawdown_active_tasks: {
                BTC: false,
                USDT: false,
              },
              drawdown_position: {},
              maximum_drawdown: {
                BTC: false,
                USDT: false,
              },
              maximum_drawdown_amount: {},
              selected_base_currencies: {},
            },
          ],
        },
        selectedUsers: [],
        value: {
          title: "Explorer",
          desc: "Discovering new species!",
          // img: "static/posters/creatures.png",
        },
        options2: [
          {
            title: "Space Pirate",
            desc: "Morespacebattles!",
            //   img: "static/posters/fleet.png",
          },
          {
            title: "Merchant",
            desc: "PROFIT!",
            //   img: "static/posters/trading_post.png",
          },
          {
            title: "Explorer",
            desc: "Discoveringnewspecies!",
            //   img: "static/posters/creatures.png",
          },
          {
            title: "Miner",
            desc: "Weneedtogodeeper!",
            //   img: "static/posters/resource_lab.png",
          },
        ],
        testObj: {
          0: [
            {
              title: "Space",
              desc: "Morespacebattles!",
              //   img: "static/posters/fleet.png",
            },
            {
              title: "Pirate",
              desc: "Morespacebattles!",
              //   img: "static/posters/fleet.png",
            },
          ],
          1: [
            {
              title: "two",
              desc: "Morespacebattles!",
              //   img: "static/posters/fleet.png",
            },
          ],
          2: [
            {
              title: "three",
              desc: "Morespacebattles!",
              //   img: "static/posters/fleet.png",
            },
            {
              title: "four",
              desc: "Morespacebattles!",
              //   img: "static/posters/fleet.png",
            },
          ],
        },
        needArr: {
          firstName: "",
          secondName: "",
          lastName: "",
        },
      },
    };
  },
  methods: {
    makeColor(i) {
      this.activeIndex = i;
    },
    addObj() {
      this.$set(this.feed.needArr, "newVal", "some");
    },
    showBlock(v, inx) {
      if (inx + 1 <= this.feed.setting_list.length - 1) {
        this.feed.setting_list[inx + 1].show = v;
      }
      if (v) {
        this.feed.numParent++;
      } else {
        this.feed.numParent--;
      }
    },
    reserve() {
      this.feed.loading = true;

      setTimeout(() => (this.feed.loading = false), 2000);
    },
    add() {
      this.testObj[0].push({
        title: "ewweval",
        desc: "Morespacebattles!",
      });
    },
    customLabel({ title, desc }) {
      return `${title} – ${desc}`;
    },
    saveText() {
      this.saveTetxt = this.text.split("").splice(10, 3, ".....").join("");
    },
  },
  watch: {
    "feed.itemShow"(v) {
      this.showBlock(v, 0);
    },
  },
  computed: {
    readyText() {
      //   let newText = this.text.split("");
      if (this.text.split("").length > 10) {
        this.text.split("").splice(10, 15, ".....");
        this.saveText();
      }
      return this.text.split("").join("");
    },
  },
};
</script>

<style lang="scss" scoped>
.v-text-field {
  padding: 0;
  margin: 0;
}
.multiSel {
  border: 1px solid black;
}
.test2 {
  background-color: #161515;
}
.block-setting {
  text-align: center;
}
.active {
  color: red !important;
}
</style>