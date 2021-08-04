<template>
  <div class="header">
    <span class="routerName" @click="goPage">{{routerName}}</span>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/page1' }">活动管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/page2' }" >活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
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
      width: 80px;
      margin-right: 20px;
      cursor: pointer;
      font-weight: 600;
    }
  }
</style>