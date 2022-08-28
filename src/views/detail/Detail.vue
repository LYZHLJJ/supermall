<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <!-- 测试数据有没有加进vuex -->
      <!-- <div>{{$store.state.cartList}}</div> -->
      <detail-swiper :topImages="topImages" ref="goods" id="goods"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo"/>
      <detail-param-info :paramInfo="paramInfo" ref="params" id="params"/>
      <detail-comment-info :commentInfo="commentInfo" ref="comment" id="comment"/>
      <div class="recommend" id="recommend">
        <div class="recommend-text">看了又看</div>
        <goods-list :goods="recommends" ref="recommend"/>
      </div>
    </scroll>
    <!-- backTop封装进了mixin.js，所以以后要复用的话只需输入下面这行即可，不用再像home.vue里面那样又要添加data、又要添加method -->
    <back-top @click="backTop" v-show="isShowBackTop"/>
    <toast :message="message" :show="show"></toast>
    <detail-bottom-bar @addCart="addCart"/>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar';
import DetailNavBar from './childComps/DetailNavBar';
import DetailSwiper from './childComps/DetailSwiper';
import DetailBaseInfo from './childComps/DetailBaseInfo';
import DetailShopInfo from './childComps/DetailShopInfo';
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
import DetailParamInfo from './childComps/DetailParamInfo';
import DetailCommentInfo from './childComps/DetailCommentInfo';
import DetailBottomBar from './childComps/DetailBottomBar';
import Scroll from '@/components/common/scroll/Scroll';
import GoodsList from '@/components/content/goods/GoodsList';
import BackTop from '@/components/content/backTop/BackTop';
import Toast from '@/components/common/toast/Toast';
import { getDetail, Goods, Shop, GoodsParam, getRecommend } from '@/network/detail';
// import { debounce } from '@/common/utils';
import { backTopMixin } from '@/common/mixin'
// import { mapActions } from 'vuex';

export default {
  name: 'Detail',
  components: {
    NavBar,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    BackTop,
    Toast
  },
  mixins: [
    backTopMixin
  ],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      currentIndex: 0,
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      // isShowBackTop: false    封装进了mixin
      message: '',
      show: false
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // 2.1.获取顶部的图片轮播数据
      console.log(res);
      const data = res.result;
      // 2.2.获取顶部的图片数据
      this.topImages = data.itemInfo.topImages;
      // 2.3.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 2.4.获取店铺信息
      this.shop = new Shop(data.shopInfo)
      // 2.5.获取商品信息
      this.detailInfo = data.detailInfo
      // 2.6.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 2.7.取出评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    // 3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

    // 4.为topYs设置防抖
    // this.getThemeTopY = debounce(() => {
    //   this.themeTopYs = []
    //   this.themeTopYs.push(0)
    //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    //   // this.themeTopYs.push(Number.MAX_VALUE) // 在数组末尾增加一个无限大的值，为了之后对数组做遍历
    //   console.log(this.themeTopYs)
    // }, 100)
  },
  activated() {
    this.iid = this.$route.params.iid
  },
  methods: {
    // ...mapActions(['addCart']),
    titleClick(index) {
      // 我的方法：scrollToElement
      // switch (index) {
      //   case 0:
      //     this.$refs.scroll.scrollToElement('#goods')
      //     break;
      //   case 1:
      //     this.$refs.scroll.scrollToElement('#params')
      //     break;
      //   case 2:
      //     this.$refs.scroll.scrollToElement('#comment')
      //     break;
      //   case 3:
      //     this.$refs.scroll.scrollToElement('#recommend')
      //     break;
      // }

      // 老师的方法
      // this.themeTopYs = []，让数组的长度始终为4
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      console.log(this.themeTopYs)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    contentScroll(position) {
      // 1.获取y值
      const positionY = -position.y
      // 老师的方法（在我这有点问题）
      // 2.positionY和主题中值进行对比
      // let length = this.themeTopYs.length
      // for (let i = 0; i < length; i++) {
      //   if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
      //       this.currentIndex = i
      //       // console.log(i); // 因为此时打印非常频繁，所以将当前index保存为一个变量，在两个不等的情况下才打印，就不会很频繁
      //       // console.log(this.topYs[i]); // 此处的值是正值
      //       this.$refs.nav.currentIndex = this.currentIndex
      //   }
      // }

      // 我的方法
      if (positionY >= 0 && positionY < this.$refs.params.$el.offsetTop) {
        this.currentIndex = 0
        this.$refs.nav.currentIndex = this.currentIndex
      }
      else if (positionY >= this.$refs.params.$el.offsetTop && positionY < this.$refs.comment.$el.offsetTop) {
        this.currentIndex = 1
        this.$refs.nav.currentIndex = this.currentIndex
      }
      else if (positionY >= this.$refs.comment.$el.offsetTop && positionY < this.$refs.recommend.$el.offsetTop) {
        if (this.$refs.recommend.$el.offsetTop - this.$refs.comment.$el.offsetTop > 100) {
          this.currentIndex = 2
          this.$refs.nav.currentIndex = this.currentIndex
        } else {
          this.currentIndex = 3
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      else if(positionY >= this.$refs.recommend.$el.offsetTop) {
        this.currentIndex = 3
        this.$refs.nav.currentIndex = this.currentIndex
      }

      // 判断BackTop是否显示
      this.isShowBackTop = Math.abs(position.y) > 1000
    },
    addCart() {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // 2.将商品添加到购物车
      // this.$store.commit('addCart', product)    mutations
      // this.$store.dispatch('addCart', product)    //actions
      // 在视频中，方法名是addToCart
      // this.addCart(product).then(res => {
      //   console.log(res);
      // })

      this.$store.dispatch('addCart', product).then(res => {
        this.show = true;
        this.message = res
        
        setTimeout(() => {
          this.show = false;
          this.message = '';
        }, 1500)
      })

      // 插件方式的封装
      // this.addCart(product).then(res => {
      //   this.$toast.show(res, 2000)
      // })
    }
  }
}
</script>

<style scoped>
  #detail {
    /* position: relative;
    z-index: 999;
    background: #fff; */
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    /* z-index: 9; */
  }

  .content {
    overflow: hidden;
    position: relative;
    height: calc(100% - 44px - 49px);

    /* position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 44px; */
  }

  .recommend {
    background: #f2f5f8;
    padding-top: 5px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
  }

  .recommend-text {
    color: orange;
    text-align: center;
    margin: 5px 0;
    font-weight: 700;
  }
</style>