<template>
  <div class="flex flex-wrap justify-around">
    <div
      v-for="(person, index) in peopleData"
      :key="index"
      class="place-self-start"
    >
      <Card :person="person" class="personCard" />
    </div>
    <div v-if="cardNumberIsOdd" :style="cardWidth"></div>
  </div>
</template>
<script>
import Card from "@/components/Card";
import { getPeopleListAPI } from "@/assets/scripts/api";
export default {
  name: "People",
  components: { Card },
  data() {
    return {
      peopleData: [],
      cardWidth: "",
    };
  },
  methods: {
    cardNumberIsOdd() {
      return this.peopleData.length % 2;
    },
    setEmptyCard() {
      this.$nextTick(() => {
        let width = document.querySelector(".personCard").clientWidth;
        this.cardWidth = `width: ${width}px`;
      });
    },
  },
  computed: {},
  async created() {
    const { data } = await getPeopleListAPI();
    const keys = data.values.shift();

    let final = [];
    const results = data.values.forEach((item) => {
      let itemWithKeys = {};

      keys.forEach((key, keyIndex) => {
        item.forEach((i, iIndex) => {
          if (keyIndex === iIndex) {
            if (key === "tags") itemWithKeys[key] = i.split(",");
            else itemWithKeys[key] = i;
          }
        });
      });
      final.push(itemWithKeys);
    });

    this.peopleData = final;

    this.setEmptyCard();

    console.log("env:" + process.env.VUE_APP_GOOGLE_API_KEY);
  },
};
</script>
