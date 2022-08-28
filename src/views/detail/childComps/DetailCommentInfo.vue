<template>
  <div>
    <div class="comment-info" v-if="Object.keys(commentInfo).length !== 0">
      <div class="info-header">
        <div class="header-title">用户评价</div>
        <div class="header-more">
          更多
          <em class="arrow-right"></em>
        </div>
      </div>
      <div class="info-user">
        <img :src="commentInfo.user.avatar">
        <span>{{commentInfo.user.uname}}</span>
      </div>
      <div class="info-detail">
        <p>{{commentInfo.content}}</p>
        <div class="info-other">
          <span>{{formatDate(commentInfo.created, 'yyyy年MM月dd日 hh:mm:ss')}}</span>
          <span>{{commentInfo.style}}</span>
        </div>
        <div class="info-imgs">
          <img :src="item" v-for="(item, index) in commentInfo.images" :key="index">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/common/utils'

export default {
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    formatDate() {
      return formatDate
    }
  }
}
</script>

<style scoped>
  .comment {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }

  .header-title {
    float: left;
  }

  .header-more {
    float: right;
    font-size: 12px;
    margin-right: 10px;
  }

  .info-user {
    padding: 10px 0 5px;
  }

  .info-user img {
    width: 42px;
    border-radius: 50%;
  }

  .info-user span {
    margin-left: 10px;
    font-size: 15px;
    position: relative;
    top: -15px;
  }

  .info-detail {
    padding: 0 5px 15px;
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }

  .info-detail .info-other {
    font-size: 12px;
    color: #999;
  }
</style>