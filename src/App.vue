<template>
  <div id="app">
    <header-nav></header-nav>
    <div class="contentBox">
      <menu-nav></menu-nav>
      <router-view class="routerBox" ></router-view>
    </div>
  </div>
</template>

<script>
import HeaderNav from './components/HeaderNav.vue'
import MenuNav from './components/MenuNav.vue'
export default {
  name: 'App',
  components: {HeaderNav, MenuNav},
  setup(props) {
    return {}
  }
}

</script>

<style lang="less">
* {
  list-style: none;
}
html {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}
body {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.contentBox {
  flex:1;
  display: flex;
  .routerBox {
    flex: 1;
    padding: 10px;
    box-sizing: border-box;
  }
}
</style>
