<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  #tab-bar {
     display: flex;/*flex (弹性盒):它决定一个盒子在其它盒子中的分布，以及如何处理可用的空间。使用该模型，可以轻松的创建"自适应"浏览器窗口的流动布局 */
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f6f6f6;
    box-shadow: 0px -1px 1px rgba(100, 100, 100, .1);
    z-index: 9;
  }
</style>