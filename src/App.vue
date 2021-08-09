<template>
  <el-config-provider :locale="locale">
    <div id="app">
      <menu-nav></menu-nav>
      <div class="contentBox">
        <header-nav></header-nav>
        <div class="routerBox" >
          <router-view></router-view>
        </div>
      </div>
    </div>
  </el-config-provider>
</template>

<script>
import HeaderNav from './components/HeaderNav.vue'
import MenuNav from './components/MenuNav.vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// Locale Wrapper 入口
export default {
  name: 'App',
   props: {

  },
  components: {HeaderNav, MenuNav, [ElConfigProvider.name]: ElConfigProvider,},
  setup(props) {
    return {
      locale: zhCn,
    }
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
  overflow: hidden;
  .routerBox {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px;
    box-sizing: border-box;
    background: #f1f4f5;
    .mainBox {
      background: url(https://suezp.cn/server/kmbj.png) no-repeat;
      background-size: cover;
      color: #fff;
    }
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

// table 样式
.el-table .cell,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell,
.el-form--inline .el-form-item__label {
  color: #000;
}
.el-table th.is-leaf {
  background-color: #3ba7ff93;
}

.el-tag {
  border-radius: 0px!important;
}
</style>
