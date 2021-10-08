<template>
  <header
    class="flex font-lato transform transition fixed w-60"
    style="min-width: 7rem;"
  >
    <section
      class="text-center bg-yellow-500 text-black p-4 pt-16 mb-10 h-screen border-r-8 border-black flex flex-col"
      :class="{ 'hidden': !isMenuOpen }"
    >
      <div v-for="menu in menuContent" :key="menu" class="text-2xl mb-4">
        <router-link :to="`${menu.to}`" class="border-black" :class="[isCurrentPage(menu.to) ? 'border-b-4' : '']">{{ menu.name }}</router-link>
      </div>
      <div class="mt-auto mb-4"><img class="w-full" src="../assets/images/logo.svg" alt=""/></div>
      <div class="" href="">Copyright © Rachel &#129419</div>
    </section>
    <div class="transition absolute" :class="{'opacity-50': !isMenuOpen && !isLogoHover}" 
    :style="{ right: logoPosition, left: logoPositionLeft }"
    @mouseover="isLogoHover = true" @mouseleave="isLogoHover = false">
      <router-link to="/"><img class="mb-4 mt-4 w-28" src="../assets/images/logo.svg" alt=""/></router-link>
      <img
        @click="openMenu"
        class="icon cursor-pointer transform transition"
        :class="{ 'rotate-180': !isMenuOpen }"
        src="../assets/images/arrow.svg"
        alt=""
      />
    </div>
  </header>
</template>

<script>
export default {
  name: "SideBarr",
  emits: ["ismenuopen"],
  data() {
    return {
      isMenuOpen: true,
      isLogoHover: false,
      currentPath:'',
      menuContent: [
        { name: "Learn from map", to: "/map" },
        { name: "Africa News", to: "/news" },
        { name: "lights to Africa", to: "/" },
        { name: "Books about Africa", to: "/" },
        { name: "Game time!", to: "/" },
      ],
    };
  },
  methods: {
    openMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      this.$emit("ismenuopen", this.isMenuOpen);
    },
    isCurrentPage(to){
      return this.currentPath === to
    }
  },
  watch: {
    routerName: {
      handler() {
        this.currentPath = this.$router.currentRoute._rawValue.path;
      },
      deep: true,
    },
  },
  computed: {
      logoPosition(){
      return this.isMenuOpen ? '-7rem' : '';
    },
    logoPositionLeft(){
      return this.isMenuOpen ? '' : '0';
    },
    routerName(){
      return this.$router;
    }
  }
};
</script>
<style lang="css" scoped>
.icon {
  width: 30px;
}
</style>
