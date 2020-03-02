<template>
  <div>
    center
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <van-button plain type="primary">朴素按钮</van-button>
    <van-button plain type="info">朴素按钮</van-button>

    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">1111</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">2222</div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Vue from 'vue'
import { Button } from 'vant'

Vue.use(Button)
export default {
  // 路由的钩子函数
  beforeRouteEnter (to, from, next) {
    // ...
    // console.log('拦截')
    if (localStorage.getItem('token')) {
      next()
    } else {
      // console.log('重定向到login页面')
      next('/login')
    }
  },

  beforeRouteUpdate (to, from, next) {
    // console.log('beforeRouteUpdate', '/detail/111---->/detail/222')
  },

  beforeRouteLeave (to, from, next) {
    // ...
    next()
  }
}
</script>
