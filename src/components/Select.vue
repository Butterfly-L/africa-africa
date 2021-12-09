<template>
  <select
    v-model="selected"
    @change="onChange"
    class="border-double border-4 border-black mt-4"
  >
    <option value="0">{{ defaultWord }}</option>
    <option v-for="option in options" :key="option" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>
<script>
export default {
  name: "Select",
  props: ["options", "defaultWord"],
  data() {
    return {
      selected: 0,
    };
  },
  methods: {
    onChange() {
      this.$emit("onChange", this.selected);
    },
  },
};
</script>
