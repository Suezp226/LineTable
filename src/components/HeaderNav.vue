<template>
  <div class="header">
    <span class="routerName" @click="goBack">返回</span>
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
        if(routerName.value != '应用') {
          store.commit('changeNowTag','')
        }
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
        if(store.state.tableNameList.length === 0) {
          router.push('/home');
          return
        }
        router.go(-1);
      }
      // 点击当前Tag
      const goPage = function(obj) {
        router.push(obj.path);
        store.commit('changeNowTag',obj.name);
      }

      // 返回 
      const goBack = function() {
        router.go(-1);
      }

      return {
        routerName,
        goPage,
        navList,
        nowTag,
        deleteTableName,
        goBack
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
      min-width: 60px;
      height: 40px;
      margin-right: 20px;
      cursor: pointer;
      background: #578ed7;
      line-height: 40px;
      text-align: center;
      border-radius: 40px 0;
      color: #fff;
      font-size: 15px;
      padding: 0 8px;
    }
    .routerName:hover {
      animation: jump .8s ease-in-out 0s infinite alternate;
      background-color: #576dd7;
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
  @keyframes jump {
    0% {
      line-height: 42px;
    }
    50% {
      line-height: 38px;
    }
    100% {
      line-height: 40px;
    }
  }
</style>