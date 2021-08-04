<template>
  <div id="app">
    <menu-nav></menu-nav>
    <div class="contentBox">
      <header-nav></header-nav>
      <div class="routerBox" >
        <router-view></router-view>
      </div>
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
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
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
  width: 100%;
  display: flex;
}
.contentBox {
  flex:1;
  display: flex;
  flex-direction: column;
  .routerBox {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px;
    box-sizing: border-box;
    background: #f1f4f5;
  }
}
.mainBox {
  min-height:100%;
  width: 100%;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 2px 6px rgb(0 0 0 / 35%);
}
// 激活菜单颜色
.is-active {
  background-color: #2c80c5;
}
.is-active:hover {
  background-color: #2c80c5!important;
}
</style>
