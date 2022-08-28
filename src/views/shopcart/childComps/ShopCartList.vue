<template>
  <div class="cart-list">
    <scroll class="content">
      <ShopCartListItem v-for="(item, index) in cartList" :product="item" :key="index"/>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/components/common/scroll/Scroll';
import ShopCartListItem from './ShopCartListItem';

import { mapGetters } from 'vuex';

export default {
  components: {
    Scroll,
    ShopCartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  }
}
</script>

<style scoped>
  .cart-list {
    /* 因为这里是cart组件中的内容滚动区，而非整个cart组件，所以这里就是滚动区的内容高度 */
    height: calc(100vh - 44px - 49px - 40px);
}
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>