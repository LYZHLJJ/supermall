<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="@/assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    border: 1px solid #aaa;
  }

  .check {
    border-color: var(--color-tint);
    background: var(--color-tint);
  }
</style>