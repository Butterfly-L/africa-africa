<template>
  <select
    v-model="selected"
    @change="onChange"
    class="form-selected mt-10 block w-full border p-3 rounded"
  >
    <option value="0">Select a country</option>
    <option v-for="country in countries" :key="country" :value="country.ID">
      {{ country.Country }}
    </option>
  </select>
</template>
<script>
export default {
  name: "CountrySelect",
  props: ["countries"],
  data() {
    return {
      selected: 0,
    };
  },
  methods: {
    onChange() {
      const country = this.countries.find((item) => item.ID === this.selected);
      console.log("country" + country);
      this.$emit("get-country", country);
    },
  },
};
</script>
