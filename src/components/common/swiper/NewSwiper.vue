<template>
  <div class="home">
    <div class="box" @mouseout="out" @mouseover="over">
      <img
        v-for="(item, index) in list"
        v-show="listIndex === index"
        :key="index"
        :src="item"
        alt=""
      />
      <p class="left" @click="changePage(prevIndex)">&lt;</p>
      <ul>
        <li
          :class="{ color: index == listIndex }"
          v-for="(item, index) in list"
          @click="changePage(index)"
          :key="index"
        ></li>
      </ul>
      <p class="right" @click="changePage(nextIndex)">&gt;</p>
    </div>
  </div>
</template>
 
<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      list: [
        require("@/assets/img/ac4_Wallpaper1.jpg"),
        require("@/assets/img/ac4_Wallpaper2.jpg"),
        require("@/assets/img/ac4_Wallpaper3.jpg"),
        require("@/assets/img/ac4_Wallpaper4.jpg"),
      ],
      listIndex: 0, //默认显示第几张图片
      timer: null, //定时器
    };
  },
  computed: {
    //上一张
    prevIndex() {
      if (this.listIndex == 0) {
        return this.list.length - 1;
      } else {
        return this.listIndex - 1;
      }
    },
    //下一张
    nextIndex() {
      if (this.listIndex == this.list.length - 1) {
        return 0;
      } else {
        return this.listIndex + 1;
      }
    },
  },
  methods: {
    
    changePage(index) {
      this.listIndex = index;
    },
    //移除
    out() {
      this.setTimer();
    },
    //移入
    over() {
      clearInterval(this.timer);
    },
    //1秒切图
    setTimer() {
      this.timer = setInterval(() => {
        this.listIndex++;
        if (this.listIndex == this.list.length) {
          this.listIndex = 0;
        }
      }, 1000);
    },
  },
  created() {
    //定时器
    this.setTimer();
  },
  mounted() {},
};
</script>
<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .box {
    position: relative;
    width: 500px;
    height: 500px;
    img {
      width: 100%;
      height: 100%;
      z-index: 100;
    }
    p {
      cursor: pointer;
      color: white;
      font-size: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      background: rgba(0, 0, 0, 0.5);
    }
    .left {
      position: absolute;
      top: 50%;
      left: 0;
    }
    .right {
      position: absolute;
      top: 50%;
      right: 0;
    }
    ul {
      list-style: none;
      display: flex;
      justify-content: space-around;
      align-items: center;
      position: absolute;
      width: 150px;
      height: 20px;
      top: 90%;
      right: 35%;
      .color {
        background: red;
        color: red;
      }
      li {
        cursor: pointer;
        width: 10px;
        height: 10px;
        background: white;
        border-radius: 50%;
      }
    }
  }
}
</style>
