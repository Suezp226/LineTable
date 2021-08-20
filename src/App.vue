<template>
  <el-config-provider :locale="locale">
    <div id="app">
      <menu-nav v-if="!isMobile" ></menu-nav>
      <div class="contentBox">
        <header-nav v-if="!isMobile"></header-nav>
        <div class="routerBox" >
          <router-view></router-view>
        </div>
        <h-5-footer-nav v-if="isMobile"></h-5-footer-nav>
      </div>
    </div>
  </el-config-provider>
</template>

<script>
import HeaderNav from './components/HeaderNav.vue';
import MenuNav from './components/MenuNav.vue';
import H5FooterNav from './components/H5FooterNav.vue';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import store from './store/store';
import { mapGetters } from 'vuex';
import { computed, ref } from 'vue'
// Locale Wrapper 入口
export default {
  name: 'App',
   props: {

  },
  components: {HeaderNav, MenuNav, H5FooterNav, [ElConfigProvider.name]: ElConfigProvider,},
  setup(props) {
    store.commit('judgeIsMobile',document.documentElement.clientWidth < 500);
    let isMobile = ref(store.state.isMobile);

    console.log(isMobile,'isMobile')
    return {
      locale: zhCn,
      isMobile
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
.el-form--inline .el-form-item {
  margin-bottom: 12px;
}
.el-table th.is-leaf {
  background-color: #3ba7ff93;
}

.el-tag {
  border-radius: 0px!important;
}

// H5 样式
@media screen and (max-width: 540px) {
  .contentBox {
    .routerBox {
      padding: 0;
    }
  }
}
</style>
