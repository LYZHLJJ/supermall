<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo">
      <span class="title">{{shop.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sell-count">{{shop.sells}}</div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">{{shop.goodsCount}}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item,index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more': item.isBetter}">
              <span>{{item.isBetter ? '高' : '低'}}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <a href="https://www.bilibili.com/video/BV1GJ411x7h7/?spm_id_from=333.788.recommend_more_video.-1&vd_source=e0437c349aca26c7bdf0cdcaf22b3e97">
        <div class="enter-shop" @click="enter">进店逛逛</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style>
  .shop-info {
    padding: 20px 8px;
    border-bottom: 5xp solid #f2f5f8;
  }

  .shop-top {
    line-height: 45px;
    display: flex;
    align-items: center;
  }

  .shop-info img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, .1);
  }

  .shop-info .title {
    margin-left: 10px;
    vertical-align: middle;
  }

  .shop-middle {
    display: flex;
    margin-top: 10px;
    align-items: center;
  }

  .shop-middle-item {
    flex: 1;
  }

  .shop-middle-left {
    display: flex;
    justify-content: space-evenly;
    color: #333;
    text-align: center;
    border-right: 1px solid rgba(0, 0, 0, .1);
  }

  .shop-middle-right table td {
    padding: 5px 0;
  }

  .shop-middle-right .score {
    color: #5ea732;
  }

  .shop-middle-right .score-better {
    color: #f13e3a;
  }

  .shop-middle-right .better span {
    background: #5ea732;
    color: #fff;
    text-align: center;
  }

  .shop-middle-right .better-more span {
    background: #f13e3a;
  }

  .sells-out, .goods-count {
    font-size: 18px;
  }

  .sells-text, .goods-text {
    font-size: 12px;
    margin-top: 10px;
  }

  .shop-middle-right {
    font-size: 13px;
    color: #333;
  }

  .shop-middle-right table {
    width: 120px;
    margin-left: 40px;
  }

  .shop-bottom {
    text-align: center;
    margin-top: 10px;
  }

  .enter-shop {
    background: #f2f5f8;
    font-size: 14px;
    display: inline-block;
    width: 150px;
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
    text-align: center;
  }
</style>