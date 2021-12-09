<template>
  <div class="flex">
    <SideBar @ismenuopen="checkMenuOpen" />
    <div
      class="ml-auto transition w-full"
      :class="{ 'pl-56': isMenuOpen && !isMobile }"
    >
      <Header :title="title" />
      <main :class="[isMobile ? 'p-4 flex-col items-center' : 'p-8']">
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
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
      title: "",
    };
  },
  methods: {
    checkMenuOpen(value) {
      this.isMenuOpen = value;
    },
  },
  watch: {
    router: {
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
    router() {
      return this.$router;
    },
    isMenuOpen() {
      return this.$store.state.isMenuOpen;
    },
    isMobile() {
      return this.$_isMobile();
    },
    mounted(){
      
    }
  },
};
</script>
<style>
@import "assets/styles/common.css";
</style>
