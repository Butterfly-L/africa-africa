<template>
  <div class="font-bold" :class="tagColor(colornum)">#{{ tagname }}</div>
</template>
<script>
export default {
  name: "Tag",
  props: {
    tagname: {
      type: String,
    },
    colornum: {
      type: Number,
    },
  },
  data() {
    return {
      colorSet: [
        "text-red-600",
        "text-yellow-500",
        "text-green-500",
        "text-blue-500",
      ],
    };
  },
  methods: {
    tagColor(colornum) {
      return this.colorSet[colornum];
    },
  },
};
</script>
