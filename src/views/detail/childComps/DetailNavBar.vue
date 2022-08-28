<template>
  <div>
    <nav-bar>
      <template #left>
        <div class="back" @click="backClick">
          <img src="@/assets/img/common/back.svg">
        </div>
      </template>
      <template v-slot:center>
        <div v-for="(item, index) in titles" :key="index" class="title">
          <div :class="{active: index === currentIndex}" @click="titleClick(index)">{{item}}</div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar';

export default {
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick', index);
    },
    backClick() {
      this.$router.back()
      // this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .title {
    display: inline-block;
    font-size: 13px;
  }

  .title div {
    padding: 0 10px;
  }

  .active {
    color: var(--color-high-text);
  }

  .back img {
    vertical-align: middle;
  }
</style>