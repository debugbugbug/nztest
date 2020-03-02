<template>
    <div>
        <button @click="handle()">登录</button>
    </div>
</template>
<script>
export default {
  methods: {
    handle () {
      // ajax
      localStorage.setItem('token', JSON.stringify({ isLogin: true }))
      this.$router.push('/center')
    }
  }
}
</script>
