<template>
  <div class="mainBox">
    <div class="toolBox">
      <el-form 
      :model="searchForm" 
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
            style="width:180px"
            format="YYYY - MM - DD">
          </el-date-picker>
          <el-input style="width:180px" placeholder="请输入" size="medium" v-else></el-input>
        </el-form-item>
        <el-form-item label="关键字">
          <el-input style="width:200px" :placeholder="'请输入 '+keywordsDesc" size="medium"></el-input>
        </el-form-item>
        <el-button type="primary" size="medium" style="width:80px;margin-left:20px;" @click="search">查询</el-button>
        <el-button type="success" size="medium" style="width:80px;margin-left:20px;" @click="addNewData">新增</el-button>
      </el-form>
    </div>
    <div v-if="tableData.length > 0" style="min-height:500px;">
      <el-table
        :data="tableData"
        style="width:100%;overflow-x:auto;"
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
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else style="min-height:400px;border:1px solid #c0c4cc;padding-top:60px;">
      <el-empty description="还没有数据哦 ~ "></el-empty>
    </div>
    <el-pagination
      v-if="tableData.length > 0"
      style="margin-top:20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next"
      :total="400">
    </el-pagination>

    <!-- 编辑 / 新增弹窗 -->
    <el-dialog title="收货地址" v-model="dialogFormVisible" width="500px">
      <el-form :model="dialogForm" label-position="left">
        <el-form-item :label-width="(tag.value.length * 20>160?160:tag.value.length * 20) + 'px'" :label="tag.value" v-for="tag in renderTableInfo.tableTags" :key="tag.key">
          <el-input v-model="dialogForm[tag.key]" placeholder="请输入..." style="width:90%" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmAddData">确定添加</el-button>
        </span>
      </template>
    </el-dialog>


    <!-- 页面加载  Loading -->
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
  import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'
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
      let tableData =  ref([]); //表格数据
      let nowTableId = ref(); //当前表格的ID
      // 获取列表显示数据
      const queryData = function (id) {
        nowTableId = id;
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


            // 获取列表数据
            http.get('/insideTable/getInsideData?'+'_id=' + id).then(res=>{
              tableData.value = res.data.docs;
            })

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
        if(!nowTag.id) return
        pageLoading.value = true;
        queryData(nowTag.id);
      })

      let value1 = ref('');
      const handleSizeChange = function() {};
      const handleCurrentChange = function() {};
      const handleEdit = function (ind,row) {
          console.log(ind,row)
        }
      let currentPage = ref(1);

      // 新增 弹框 以及参数
      let dialogForm = reactive({});
      let dialogFormVisible = ref(false);

      // 新增 打开弹窗 以及 初始化参数
      const addNewData = function() {
        renderTableInfo.tableTags.forEach(ele=>{
          dialogForm[ele.key] = '';
        })
        dialogFormVisible.value = true;
      }

      // 确定新增
      const confirmAddData = function() {
        dialogForm._id = nowTableId;
        http.post('/insideTable//addInsideData',dialogForm).then(res=>{
          if(res.data.code == 200) {
            ElMessage({
              type: 'success',
              message: res.data.msg
            });
            pageLoading.value = true;
            queryData(nowTableId);
            dialogFormVisible.value = false;
          }
          console.log(res.data);
        })
      }

      // 查询按钮
      const search = function() {
        pageLoading.value = true;
        tableData.value = [];
        http.get('/insideTable/getInsideData?'+'_id=' + nowTableId).then(res=>{
          pageLoading.value = false;
          tableData.value = res.data.docs;
        })
      }

      return {
        searchForm: reactive({}),
        search,
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
        pageLoading,
        dialogFormVisible,
        dialogForm,
        addNewData,
        confirmAddData
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