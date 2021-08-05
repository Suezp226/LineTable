<template>
  <div class="header">
    <span class="routerName">{{routerName}}</span>
    <el-tag
      v-for="item in navList"
      :key="item.path"
      style="margin-right:10px;cursor:pointer;"
      effect="dark"
      :type="nowTag.name == item.name?'success':''"
      closable
      @close="deleteTableName(item)"
      @click="goPage(item)">
      {{item.name}}
    </el-tag>
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
  import store from "../store/store"
  export default {
    name: 'HeaderNav',
    props: {

    },
    setup(props,{emit}) {

      // 路由面包屑 处理
      const route = useRoute();
      const router = useRouter();
      let routerName = ref('')
      routerName.value = router.currentRoute.value.meta.desc;
      watch(() => route.path,() => {
        routerName.value = router.currentRoute.value.meta.desc;
      });

      // Store 绑定了store 的数据智能通过 commit 进行操作
      let navList = ref(store.state.tableNameList);
      let nowTag = reactive(store.state.nowTag);

      watch(store.state.tableNameList,()=>{
        nowTag = navList.value.length>0?
        navList.value[navList.value.length-1].name:'/';
        store.commit('changeNowTag',nowTag)
      })

      const deleteTableName = function(obj) {
        store.commit('deleteTableName',obj);
        router.go(-1);
      }
      // 点击当前Tag
      const goPage = function(obj) {
        router.push(obj.path);
        store.commit('changeNowTag',obj.name);
      }

      return {
        routerName,
        goPage,
        navList,
        nowTag,
        deleteTableName,
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
      cursor: default;
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