<template>
  <!-- 判断object是否有对象 -->
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="new-price">{{goods.newPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span class="discount" v-if="goods.discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .base-info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-title {
    color: #222;
  }

  .info-price {
    margin-top: 10px;
  }

  .info-price .new-price {
    color: var(--color-high-text);
    font-size: 24px;
  }

  .info-price .old-price {
    font-size: 13px;
    text-decoration: line-through;
    margin-left: 5px;
  }

  .info-price .discount {
    color: white;
    border-radius: 10px;
    background: var(--color-high-text);
    padding: 3px 5px;
    position: relative;
    top: -5px;
    left: 5px;
  }

  .info-other {
    display: flex;
    font-size: 12px;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
    color: #ccc;
    padding: 20px 0 10px;
    text-align: center;
  }

  .info-other span {
    flex: 1;
  }

  .info-service {
    display: flex;
    line-height: 60px;
    justify-content: space-between;
  }

  .info-service-item img {
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
  }

  .info-service-item span {
    font-size: 13px;
    color: #333;
  }
</style>