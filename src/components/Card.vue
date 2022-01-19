<template>
  <div
    class="flip-widget"
    :class="[$_isMobile() ? 'w-full' : 'w-96']"
    style="height: 600px; margin-right: 30px; margin-bottom: 30px"
  >
    <div
      class="flip-widget-inner"
      :style="flip ? 'transform: rotateY(180deg);' : ''"
      @click="() => (flip = !flip)"
    >
      <div
        class="card flip-widget-front"
        :key="person.name"
        v-if="flip"
        style="background: repeating-linear-gradient(-55deg,#222,#222 10px,#333 10px,#333 20px);"
      >
        <div class="card_upper">
          <div class="ball"></div>
          <div class="ball ml-2"></div>
          <div class="ball ml-2"></div>
        </div>
        <div>
          <img
            :src="require(`../assets/images/people/${person.image}`)"
            style="filter:blur(10px) brightness(0.5)"
          />
        </div>
        <span class="text-white"> {{ person.question }}</span>

        <div class="flex justify-between mt-4">
          <a
            class="box_btn text-xl md:text-2xl font-bold text-white transition-all"
            >Flip the card to find out
            <span class="transition-all arrow">&rarr;</span></a
          >
        </div>
      </div>
      <div class="card flip-widget-back" v-if="!flip">
        <div class="card_upper">
          <div class="ball"></div>
          <div class="ball ml-2"></div>
          <div class="ball ml-2"></div>
        </div>
        <div>
          <img
            :src="require(`../assets/images/people/${person.image}`)"
            alt=""
          />
        </div>
        <h3 class="text-2xl md:text-4xl my-4 text-gray-700 font-bold">
          {{ person.name }}
        </h3>
        <div class="flex flex-wrap">
          <div v-for="(tag, index) in person.tags" :key="tag" class="mr-2">
            <Tag :tagname="tag" :colornum="index" />
          </div>
        </div>
        <span>{{ person.country }}</span>
        <div>{{ person.description }}</div>
        <div class="flex justify-between mt-4">
          <a
            class="box_btn text-xl md:text-2xl font-bold text-gray-700 transition-all"
            :href="person.links"
            target="”_blank”"
            >Visit <span class="transition-all arrow">&rarr;</span></a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Tag from "@/components/Tag";
export default {
  name: "Card",
  components: { Tag },
  props: {
    person: {
      type: Object,
    },
  },
  data() {
    return {
      flip: true,
    };
  },
  computed: {},
};
</script>
<style scoped>
.flip-widget {
  background-color: transparent;
  perspective: 1000px;
}

.flip-widget-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.4s;
  transform-style: preserve-3d;
}

.flip-widget-front,
.flip-widget-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-widget-front {
  transform: rotateY(180deg);
}
</style>
