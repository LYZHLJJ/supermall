<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImages">
      <img :src="item">
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from '@/components/common/swiper';

export default {
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .detail-swiper {
    height: 500px;
    overflow: hidden;
    position: relative;
  } 
</style>