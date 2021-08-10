<template>
  <div class="menu" >
    <div class="titleBox" >
      <div class="imgBox">
        <img src="https://suezp.cn/server/kmProfile.png" alt="头像">
      </div>
      <div class="desc">LINE TABLE</div>
    </div>
    <el-menu
      default-active="/home"
      class="menuBox"
      :uniqueOpened="true"
      active-text-color="#fff"
      :router="true">
      <el-menu-item index="/introduct">
        <template #title>介绍</template>
      </el-menu-item>
      <el-menu-item index="/teachPage">
        <template #title>教程</template>
      </el-menu-item>
      <el-menu-item index="/home">
        <template #title>试一试</template>
      </el-menu-item>
      <el-menu-item index="/404">
        <template #title>404</template>
      </el-menu-item>
    </el-menu>
    <div class="footerDesc">
      <transition name="el-fade-in-linear">
        <div class="author">Authorization Suezp</div>
      </transition>
      <div class="beian">
        <a href="http://www.beian.gov.cn/portal/index.do">闽ICP备19006430号-2</a>
      </div>
    </div>
  </div>
</template>

<script>
  import {onMounted, watch, ref} from 'vue';
  import {useRouter, useRoute} from 'vue-router';
  export default {
    name: 'MenuNav',
    props: {

    },
    setup(props) {
      const router = useRouter();
      const route = useRoute();
      const go = function(url) {
        router.push(url);
      }
      // 当前路由

      function handleOpen(key, keyPath) {
        console.log(key, keyPath);
      }
      function handleClose(key, keyPath) {
        console.log(key, keyPath);
      }

      return {go,handleOpen,handleClose}
    }
  }
</script>

<style lang="less" scoped>
  .menu {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-width: 200px;
    width: 200px;
    text-align: center;
    box-shadow: 2px 10px 5px rgb(0 0 0 / 30%);
    z-index: 11;
    overflow: hidden;
    .titleBox {
      height: 150px;
      padding-top: 15px;
      box-sizing: border-box;
      border-bottom: 2px solid rgba(0, 0, 0, 0.288);
      .imgBox { 
        text-align: center;
        height: 80px;
        width: 80px;
        border-radius: 40px;
        overflow: hidden;
        margin-left: 50%;
        transform: translateX(-50%);
        img {
          height: 100%;
          width: 100%;
        }
        img:hover {
          animation: shaking .7s ease-in-out 0s infinite alternate;
        }
      }
      .desc {
        margin-top: 10px;
        text-align: center;
        font-size: 20px;
        color: #000;
        font-weight: bold;
      }
    }
  }
  .menuBox {
    flex: 1;
  }
  .footerDesc {
    padding: 10px 0;
    font-size: 13px;
    .author {
      text-decoration: underline;
      cursor: pointer;
    }
    .author:hover {
      color: #2c80c5;
    }
    .beian {
      margin-top: 5px;
      a {
        text-decoration: none;
        font-size:12px;
        color:gray;
      }
    }
  }
  @keyframes shaking {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(-15deg);
    }
    100% {
      transform: rotate(15deg);
    }
  }
</style>