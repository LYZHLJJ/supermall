<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <template #center>
        <div>购物车（{{cartLength}}）</div>
      </template>
    </nav-bar>

    <!-- 商品列表 -->
    <ShopCartList/>

    <!-- 底部汇总 -->
    <ShopCartBottomBar></ShopCartBottomBar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar';
import ShopCartList from './childComps/ShopCartList';
import ShopCartBottomBar from './childComps/ShopCartBottomBar';
import Scroll from '@/components/common/scroll/Scroll';

import { mapGetters } from 'vuex';

export default {
  components: {
    NavBar,
    ShopCartList,
    ShopCartBottomBar,
    Scroll
  },
  computed: {
    // 会解构，将getters.js里面的方法转换成计算属性
    ...mapGetters(['cartLength'])
  }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background: var(--color-tint);
    color: white;
    /* font-weight: 700; */
  }
</style>