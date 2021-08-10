<template>
  <div class="mainBox">
    <div class="toolBox">
      <el-form 
      :model="form" 
      label-width="80px" 
      inline 
      style="min-height:58px;"
      :highlight-current-row="true"
      :ref="dom"
      >
      <!-- 工具栏 type 1-输入框  2- 时间选择器 3-selector -->
        <el-form-item :label="item.value" v-for="(item) in renderTableInfo.toolTags" :key="item">
          <el-date-picker
            size="medium"
            v-if="item.type == '2'"
            v-model="value1"
            type="date"
            placeholder="选择日期"
            format="YYYY - MM - DD">
          </el-date-picker>
          <el-input style="width:150px" placeholder="请输入" size="medium" v-else></el-input>
        </el-form-item>
        <el-form-item label="关键字">
          <el-input style="width:200px" :placeholder="'请输入 '+keywordsDesc" size="medium"></el-input>
        </el-form-item>
        <el-button type="primary" size="medium" style="width:80px;margin-left:20px;">查询</el-button>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      style="width:100%;overflow-x:auto;min-height:500px;"
      size="mini"
      stripe
      border>
      <el-table-column
        type="index"
        fixed
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        v-for="(item,ind) in renderTableInfo.tableTags"
        :key="item.key"
        :prop="item.key"
        :label="item.value"
        :fixed="ind<2?'left':false"
        align="center"
        min-width="150px"
      
        :width="ind===renderTableInfo.tableTags.length-1?'auto':'170'">
      </el-table-column>
      <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)">操作</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top:20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next"
      :total="400">
    </el-pagination>

    <!-- 页面加载 -->
    <transition name="el-fade-in-linear">
      <div class="pageLoadDiv" v-if="pageLoading" >
        <i class="el-icon-loading"></i>
      </div>
    </transition>
  </div>
</template>

<script>
  import {onMounted,ref,reactive, watch, nextTick } from 'vue';
  import {useRoute} from 'vue-router';
  import store from '../store/store';
  import http from "../http/http";
  import {ElLoading} from "element-plus";
  export default {
    name: 'TablePage',
    props: {

    },
    setup(props) {
      let pageLoading = ref(false); //页面加载 蒙层控制
      let refs = '';
     const dom = el => {
       refs= el;
     }

      nextTick(() => {
       console.log(refs);
     })

      let route = useRoute();
      let renderTableInfo = reactive({
          name: "",
          tableTags: [],
          toolTags: [],
          keywordsList: []  // 保存的为 列表项的 key 值
      });
      let keywordsDesc = ref('');
      // 获取列表显示数据
      const queryData = function (id) {
        renderTableInfo.tableTags = [];
        renderTableInfo.toolTags = [];
        keywordsDesc.value = '';
        http.get("/table?"+'_id=' + id).then((res) => {
            renderTableInfo.tableTags = res.data.list[0].tableTags;
            renderTableInfo.toolTags = res.data.list[0].toolTags;
            renderTableInfo.keywordsList = res.data.list[0].keywordsList;

            // TODO  有机会优化一下
            renderTableInfo.keywordsList.forEach(key=>{
              renderTableInfo.tableTags.forEach(tag=>{
                if(key === tag.key) {
                  keywordsDesc.value += tag.value + '/';
                }
              })
            })
            keywordsDesc.value = keywordsDesc.value.slice(0,-1);

            setTimeout(() => {
              pageLoading.value = false;
            }, 500);
        })
      };

      pageLoading.value = true;
      queryData(route.query.id);

      // Store
      let nowTag = store.state.nowTag;
      watch(nowTag,()=>{
        pageLoading.value = true;
        queryData(nowTag.id);
      })

      let value1 = ref('');
      let tableData =  [{
            'perKey_1': '2016-05-02',
            'perKey_2': '王小虎',
            'perKey_3': '上海市普陀区金沙江路'
          }, {
            'perKey_1': '2016-05-04',
            perKey_2: '王小虎',
            perKey_3: '上海市普陀区金沙江路'
          }, 
          {
            'perKey_1': '2016-05-01',
            perKey_2: '王小虎',
            perKey_3: '上海市普陀区金沙江路'
          }, 
          {
            'perKey_1': '2016-05-01',
            perKey_2: '王小虎',
            perKey_3: '上海市普陀区金沙江路'
          }];
        const handleSizeChange = function() {

        };
        const handleCurrentChange = function() {

        };
        const handleEdit = function (ind,row) {
          console.log(ind,row)
        }
        let currentPage = ref(1);

      return {
        form: reactive({}),
        renderTableInfo,
        tableData,
        handleSizeChange,
        handleCurrentChange,
        currentPage,
        nowTag,
        value1,
        handleEdit,
        keywordsDesc,
        dom,
        pageLoading
      }
    }
  }
</script>
<style lang="less" scoped>
  .mainBox {
    position: relative;
    background: none!important;
    background-color: #fff!important;
  }
  .toolBox {
    border-bottom: 1px solid #42bfac;
    // border-radius: 2px;
    padding: 10px 0;
    margin-bottom: 20px;
  }
  .pageLoadDiv {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 100;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.77);
    border-radius: 2px;
    i {
      zoom: 1.5;
      margin-top: 26%;
    }
  }
</style>