<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked='isSelectAll' @click="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去计算:({{checkedLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton';

export default {
  components: {
    CheckButton
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {    //全部选中
        this.$store.state.cartList.forEach(item => {
          item.checked = false
        });
      } else {    //部分或者全部不选中
        this.$store.state.cartList.forEach(item => {
          item.checked = true
        });
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show('请选择购买的商品', 2000)
      }
    }
  },
  computed: {
    totalPrice() {
      return '￥' + this.$store.getters.cartList.filter(item => {
        return item.checked
      }).reduce((previousValue, item) => {
        return item.price * item.count + previousValue
      }, 0).toFixed(2)
    },
    checkedLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      // 只要有一个不选中，整个就不选中，所以在前面加!
      // 当一个number为10时，!number为false
      // 当一个number为0时，!number为true
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)

      if (this.$store.state.cartList.length === 0) return false
      return !this.$store.state.cartList.some(item => !item.checked)
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background: #eee;
    position: relative;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  /* .price {
    margin-left: 20px;
  } */

  .calculate {
    background: orange;
    padding: 0 10px;
  }
</style>