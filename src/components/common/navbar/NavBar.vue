<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .nav-bar {
    display: flex;
    line-height: 44px;/* 如果没有内容的化是，这个属性是没有作用的 */
    height: 44px;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);/* 阴影*/
    text-align: center;
  }

  .left, .right {
    width: 60px;
  }

  .center {
    flex: 1;/* 完全占据剩下的位置 */
  }
</style>