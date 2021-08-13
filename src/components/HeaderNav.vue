<template>
  <div class="header">
    <span class="routerName" @click="goBack">返回</span>
    <div class="classTag">
      <el-tag
        v-for="nav in navList"
        :key="nav.path"
        style="margin-right:10px;cursor:pointer;"
        effect="dark"
        :type="nowTag.name == nav.name?'success':''"
        closable
        @close="deleteTableName(nav)"
        @click="goPage(nav)">
        {{nav.name}}
      </el-tag>
    </div>
    <div class="usePowerBox">
      <ul>
        <li>
          <el-tooltip class="item" effect="dark" content="Vue3" placement="bottom">
            <img src="../assets/logo.png" alt="Vue">
          </el-tooltip>
        </li>
        <li>
          <el-tooltip class="item" effect="dark" content="ElementPlus" placement="bottom">
            <img src="../assets/elementPlus.svg" alt="ElementPlus">
          </el-tooltip>
        </li>
        <li>
          <el-tooltip class="item" effect="dark" content="Vite" placement="bottom">
            <img src="../assets/vite.svg" alt="Axios">
          </el-tooltip>
        </li>
        <li>
          <el-tooltip class="item" effect="dark" content="Node" placement="bottom">
            <img src="../assets/node.svg" alt="Axios" style="background-color:#333;">
          </el-tooltip>
        </li>
        <li>
          <el-tooltip class="item" effect="dark" content="MongoDB" placement="bottom">
            <img src="../assets/mongodb.png" alt="Axios">
          </el-tooltip>
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

      // Store 绑定了store 的数据只能通过 commit 进行操作
      let navList = ref(store.state.tableNameList);
      let nowTag = reactive(store.state.nowTag);

      watch(store.state.tableNameList,()=>{
        if(router.currentRoute.value.meta.desc != '应用') return
        nowTag = navList.value.length>0?
        navList.value[navList.value.length-1]:{name:'',id:null};
        store.commit('changeNowTag',{name:nowTag.name,id:nowTag._id})
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
        // TODO 表格默认路由是 tablepage
         router.push({
            path:"/tablePage",
            query: {id:obj._id}
          });
        store.commit('changeNowTag', {name:obj.name,id:obj._id});
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
    padding: 0 15px;
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
    .classTag {
      flex: 1;
      overflow-y: hidden;
      overflow-x: auto;
      display: flex;
      flex-wrap: nowrap;
    }
    .classTag::-webkit-scrollbar {
      height: 6px;
      width: 6px;
      cursor: pointer;
    }
    /* 滚动槽 */
    .classTag::-webkit-scrollbar-track {
      -webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
      border-radius: 3px;
    }
    /* 滚动条滑块 */
    .classTag::-webkit-scrollbar-thumb {
      border-radius:10px;
      background:rgba(0,0,0,0.1);
      -webkit-box-shadow:inset006pxrgba(0,0,0,0.5);
    }
    .classTag::-webkit-scrollbar-thumb {
      background:rgba(255,0,0,0.4);
    }
    .usePowerBox {
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