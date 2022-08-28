<template>
  <div class="toast" v-show="show">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // message: '',
      // isShow: false
    }
  },
  methods: {
    // show(message, duration) {
    //   this.isShow = true;
    //   this.message = message

    //   setTimeout(() => {
    //     this.isShow = false;
    //     this.message = '';
    //   }, duration)
    // }
  }
}
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;
    background: rgba(0, 0, 0, .6);
    color: #fff;
  }
</style>