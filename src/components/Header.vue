<template>
  <header
    class="w-full text-center text-5xl font-lobster text-white flex items-end justify-center pb-4"
    :class="[isHome ? 'h-56' : 'h-36']"
  >
    <h1>{{ title }}</h1>
  </header>
</template>

<script>
export default {
  name: "Header",
  emits: ["ismenuopen"],
  props: {
    title: { type: String },
  },
  data() {
    return {
      isMenuOpen: true,
      isLogoHover: false,
      isHome: false,
      // logoPosition: '-7rem',
      menuContent: [
        { name: "Learn from map", to: "map" },
        { name: "Africa Holidays", to: "map" },
        { name: "lights to Africa", to: "map" },
        { name: "Books about Africa", to: "map" },
        { name: "Game time!", to: "map" },
      ],
    };
  },
  methods: {
    openMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      this.$emit("ismenuopen", this.isMenuOpen);
    },
  },
  computed: {
    logoPosition() {
      return this.isMenuOpen ? "-7rem" : "0rem";
    },
    router() {
      return this.$router;
    },
  },
  watch: {
    router: {
      handler() {
        this.isHome = this.$router.currentRoute._rawValue.path === "/";
      },
      deep: true,
    },
  },
};
</script>
<style lang="css" scoped>
header {
  background-image: url(https://images.unsplash.com/photo-1418338249065-dfea5ee97c3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1030&q=80);
  background-size: cover;
  background-position-y: center;
}
</style>
