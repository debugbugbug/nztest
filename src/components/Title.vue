<template>
  <div class="detailtitle">
    <img class="imgages" @click="handleClick()" src="../../img/zuojiantou.png" alt />
    <span>
        <slot></slot>
    </span>
  </div>
</template>
<script>
export default {
  methods: {
    handleClick () {
      this.$emit('back')
    }
  }
}
</script>
<style lang="scss" scoped>
.detailtitle {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background: white;
  text-align: center;
  line-height: 40px;
  .imgages {
    position: absolute;
    left: 0;
    top: 10px;
    width: 20px;
    height: 20px;
  }
}
</style>
