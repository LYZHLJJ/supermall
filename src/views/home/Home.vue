<template>
  <div id="home">
     <!-- v-slot语法糖：#。v-slot:center => #center -->
    <nav-bar class="home-nav">
      <template v-slot:center><div>首页</div></template>
    </nav-bar>
    <tab-control class="tab-control"
                 :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pullUpLoad="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click="backClick()" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar';
import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView';
import FeatureView from './childComps/FeatureView';
import TabControl from '@/components/content/tabControl/TabControl';
import GoodsList from '@/components/content/goods/GoodsList'
import Scroll from '@/components/common/scroll/Scroll'
import BackTop from '@/components/content/backTop/BackTop';
import { getHomeMultidata, getHomeGoods } from '../../network/home'

export default {
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  activated() {
    // 进入时再刷新，避免出现小问题
    this.$refs.scroll.refresh();
    // 进入时滚动到离开时的位置this.saveY
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    // 保存离开时的位置信息到this.saveY
    this.saveY = this.$refs.scroll.getScrollY()
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);    //（x, y, 毫秒）
    },
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = Math.abs(position.y) > 1000

      // 2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      // 获取tabControl的offsetTop
      // 所有的组件都有一个属性$el：用于获取组件中的元素
      // 监听第二个tabControl
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        console.log(res);
        // this.result = res;    // 用一个变量把数据保存起来，否则方法执行后res无意义，不理解的可以看垃圾回收机制
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp();
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>

/* 加上scoped，表示当前的样式只作用于当前组件 */
  #home {
    /* vh viewport height 视口高度，100vh就是整个视口高度，50vh是50%的高度 */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background: var(--color-tint,#ff5777);/*  之前自定义的颜色的变量 */
    color: white;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .tab-control {
    position: relative;
    z-index: 9;
    /* top: 44px; */
  }

  .content {
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    /* height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px; */
  }
</style>