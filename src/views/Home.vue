<template>
  <div class="container">
    <div class="flex w-full mb-4 flex-col lg:flex-row">
      <div class="w-full lg:w-4/5 mr-4 mb-4 lg: mb-0">
        <div class="border-b-4 border-yellow-400 flex">
          <img class="mr-2" src="../assets/images/africa.svg" alt="" />
          <h4 class="font-bold">{{ $t("home.title") }}</h4>
        </div>
        <p class="mt-4">{{ $t("home.description") }}</p>
        <div class="flex flex-wrap mt-4">
          <Tag
            v-for="(tag, i) in tags"
            :key="i"
            :tagname="tag"
            :colornum="i"
            class="mr-2"
          />
        </div>
      </div>
      <div class="main-img w-full lg:w-1/5 bg-cover bg-top lg:bg-center"></div>
    </div>
    <div class="main-form border-t-4 border-black text-center">
      <h2>Explore Africa with Us!</h2>
      <Select
        :options="africanCountries"
        :defaultWord="'Select a country'"
        @onChange="selectCountry"
      />
      <p class="mt-4">
        Choose an Africa country that you are interested in, or we will randomly
        push all information!
      </p>
    </div>
  </div>
</template>

<script>
import Tag from "@/components/Tag";
import Select from "@/components/Select";

export default {
  name: "Home",
  components: { Tag, Select },
  data() {
    return {
      africanCountries: [],
      tags: [
        "modernafrica",
        "youdontknowafrica",
        "africanfood",
        "africanculture",
      ],
    };
  },
  methods: {
    selectCountry(value) {
      console.log("value" + value);
      // const country = this.countries.find((item) => item.ID === this.selected);
      // this.$emit("get-country", country);
    },
  },
  mounted() {
    this.africanCountries = this.$store.state.africanCountries.map(
      (country) => {
        return {
          name: country,
          value: country,
        };
      }
    );

    this.$store.commit("setLoading", true);

    this.$nextTick(() => this.$store.commit("setLoading", false));
  },
};
</script>
<style lang="css" scoped>
.main-img {
  background-image: url("https://images.unsplash.com/photo-1594750301491-4023e192171a");
  min-width: 120px;
  min-height: 180px;
}
</style>
