<template>
  <div class="header">
    <span class="routerName" @click="goPage">{{routerName}}</span>
    <!-- <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/page1' }">应用</el-breadcrumb-item>
    </el-breadcrumb> -->
    <div class="usePowerBox">
      <ul>
        <li>
          <img src="../assets/logo.png" alt="Vue">
        </li>
        <li>
          <img src="../assets/elementPlus.svg" style="margin-top:5px;" alt="ElementPlus">
        </li>
        <li>
          <img src="../assets/axios.svg" alt="Axios">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {onMounted, watch, ref, reactive } from 'vue';
  import {useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';
  export default {
    name: 'HeaderNav',
    props: {

    },
    setup(props) {
      // 路由面包屑 处理
      const route = useRoute();
      const router = useRouter();
      let routerName = ref('')
      routerName.value = router.currentRoute.value.meta.desc;
      watch(() => route.path,() => {
        routerName.value = router.currentRoute.value.meta.desc;
      });

      // 点击展示路由
      const goPage = function() {
        router.push(routerName)
      }


      return {
        routerName,
        goPage
      }
    }
  }
</script>

<style lang="less" scoped>
  .header {
    display: flex;
    align-items: center;
    height: 40px;
    line-height: 40px;
    z-index: 10;
    padding: 0 30px;
    /* text-align: center; */
    box-shadow: 5px 1px 6px rgb(0 0 0 / 35%);
    .routerName {
      display: inline-block;
      min-width: 80px;
      margin-right: 20px;
      cursor: pointer;
      background: #578ed7;
      text-align: center;
      color: #fff;
      padding: 0 10px;
    }
    .usePowerBox {
      flex: 1;
      overflow: hidden;
      ul {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: flex-end;
        li {
          height: 100%;
          min-width: 25px;
          padding: 0 10px;
          text-align: center;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all .2s ease-in-out 0s;
          img {
            height: 25px;
            width: 25px;
          }
        }
        li:hover {
          background: rgb(211, 204, 204);
        }
      }
    }
  }
</style>