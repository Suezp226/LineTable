<template>
  <div class="H5Conetent" >
    <!-- <nut-navbar  @on-click-back="goBackFn" :title="tableInfo.name" style="margin-bottom:0;height:20px;"></nut-navbar> -->
    <div class="search">
      <input type="search" v-model="keywords" @keydown.enter="searchFn(true)" class="searchInput" :placeholder="'请输入关键字.... '+tableInfo.name">
      <nut-button type="info" @click="searchFn(true)" style="height:30px;">搜索</nut-button>
    </div>
    <div class="listBox">
      <ul class="infiniteUl" id="scroll">
          <nut-infiniteloading
              containerId = 'scroll'
              :use-window='false'
              :has-more="hasMore"
              @load-more="loadMoreFn"
          >
              <li class="infiniteLi" v-for="(item) in tableData" :key="item">
                <div class="itemBox" :style="{width:(index<3?'66%':'')}" v-for="(tag,index) in tableInfo.tableTags" :key="tag.value">
                  <span  class="itemTitle">{{tag.value}}:</span>
                  <span class="itemContent" v-if="index!=0">{{item[tag.key]}}</span>
                  <span class="itemContent" v-else>
                    <span class="tagStyle" >{{item[tag.key]}}</span>
                  </span>
                </div>
                <div class="flowBox">
                  <div style="margin-bottom:12px;">修改时间：</div>
                  <div>{{item.modifyDate?new Date(item.modifyDate).toLocaleDateString():'暂无记录'}}</div>
                </div>
              </li>
          </nut-infiniteloading>
      </ul>
    </div>
  </div>
</template>

<script>
import {ref,reactive,onMounted} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import http from '../http/http'
export default {
  setup(props) {
    const router = useRouter();
    const route = useRoute();

    console.log('route',route.query)

    const goBackFn = function() {
      router.go(-1);
    };

    let tableData = ref([]);
    let hasMore = ref(true);
    let keywords = ref('');
    let pages = reactive({  //分页参数
      page: 1,
      pageSize: 20,
      total: 0
    });
    let tableInfo = reactive({
      name:'',
      _id: '',
      keywordsList: '',
      tableTags: []
    });

    // 搜索
    const searchFn = function (fresh) {
      let param = {
        _id: tableInfo._id,
        keywordsList: tableInfo.keywordsList,
        pages,
        keywords:keywords.value
      }
      console.log(JSON.stringify(param));
      if(fresh) tableData.value = [];
      http.get('/insideTable/getInsideData?'+'param=' + JSON.stringify(param)).then(res=>{
        if(res.data.code == 200) {
          tableData.value = tableData.value.concat(res.data.list);
          console.log(res.data.list)
          for(const key in res.data.pages) {
            pages[key] = res.data.pages[key];
          }
          if(pages.pageSize * pages.page > pages.total) {
            hasMore.value = false;
          }
        }
      })
    }

    // 页面初始化
    const initPageFn = function() {
      http.get("/table?"+'_id=' + route.query.id).then(res=>{
        tableInfo._id = res.data.list[0]._id;
        tableInfo.name = res.data.list[0].name;
        tableInfo.tableTags = res.data.list[0].tableTags;
        tableInfo.keywordsList = res.data.list[0].keywordsList;
        searchFn();
      })
    }

    // 触底 加载
    const loadMoreFn = async function(done) {  
      pages.page++;
      await searchFn();
      done();
    };

    onMounted(() => {
      initPageFn();
    })

    return {
      goBackFn,
      loadMoreFn,
      tableData,
      hasMore,
      keywords,
      tableInfo,
      searchFn,
    }
  }
}
</script>

<style lang="less" scoped>
.H5Conetent {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .search {
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    .searchInput {
      flex: 1;
      height: 30px;
      border-radius: 15px;
      text-decoration: none;
      border: 0;
      outline: none;
      padding: 0 10px;
      margin-right: 10px;
    }
    .searchInput:focus {
      border: none;
    }
  }
  .listBox {
    flex: 1;
    overflow-y: hidden;
    background-color: #fff;
    .infiniteUl {
      height: 100%;
      overflow: auto;
    }
    .infiniteLi {
      position: relative;
      padding: 10px;
      box-sizing: border-box;
      min-height: 120px;
      display: block;
      .itemBox {
        display: flex;
        padding: 5px 0;
        font-size: 15px;
        align-items: center;
        .itemTitle {
          color: #000;
          min-width: 79px;
          max-width: 100px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .itemContent {
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #333;
        }
        .tagStyle {
          background: #409eff;
          padding: 5px;
          color: #fff;
          border-radius: 4px;
          background: #409eff;
          padding: 4px;
          display: inline-block;
          color: #fff;
          border-radius: 5px;
        }
      }
      .flowBox {
        position: absolute;
        right: 10px;
        top: 10px;
        height: 90px;
        border-radius: 5px;
        width: 34%;
        box-sizing: border-box;
        padding: 10px;
        border: 1px solid black;
        div {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .infiniteLi::after {
      position: absolute;
      left: 0;
      bottom: 0;
      border-bottom:0px;
      height: 2px;
      width: 100%;
      content: '';
      background: repeating-linear-gradient(
      -45deg
      , #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
      background-size: 80px;
    }
  }
}
</style>