<template>
  <div class="back-top" @click="backClick">
    <img src="@/assets/img/common/top.png">
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
  .back-top {
    position: fixed;
    right: 10px;
    bottom: 55px;
  }

  .back-top img {
    width: 43px;
    height: 43px;
  }
</style>