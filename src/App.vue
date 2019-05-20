<template>
  <div id="app">

    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style lang="less">
  .auto-img{
    width: 100%;
    display: block;
  }
  body{
    margin: 0;
  }
  *{
    margin: 0;
    padding: 0;
  }
</style>
