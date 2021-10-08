<template>
  <div class="flex">
    <SideBar @ismenuopen="checkMenuOpen" />
    <div class="ml-auto transition w-full" :class="{ 'pl-56': isMenuOpen }">
      <Header :title="title" />
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
      <transition name="fade">
        <Loading v-if="isLoading" />
      </transition>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import Loading from "@/components/Loading";

export default {
  components: {
    Header,
    SideBar,
    Loading,
  },
  data() {
    return {
      isMenuOpen: true,
      title: "",
    };
  },
  methods: {
    checkMenuOpen(value) {
      console.log("isMenuOpen" + value);
      this.isMenuOpen = value;
    },
  },
  watch: {
    routerName: {
      handler() {
        this.title = this.$router.currentRoute._rawValue.name;
      },
      deep: true,
    },
  },
  computed: {
    isLoading() {
      return this.$store.state.isPageLoading;
    },
    routerName() {
      return this.$router;
    },
  },
};
</script>
<style>
@import "assets/styles/common.css";
</style>
