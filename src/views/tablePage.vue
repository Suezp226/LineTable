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
        <el-form-item :label="item.value" v-for="(item) in renderTableInfo.toolTags" :key="item.key">
          <el-date-picker
            size="medium"
            v-if="item.type == '2'"
            v-model="searchForm[item.key]"
            type="date"
            placeholder="选择日期"
            style="width:180px"
            format="YYYY - MM - DD">
          </el-date-picker>
          <el-input style="width:180px" v-model="searchForm[item.key]" placeholder="请输入" size="medium" v-else></el-input>
        </el-form-item>
        <el-form-item label="关键字">
          <el-input style="width:250px" @input="search" v-model="searchForm.keywords" :placeholder="'输入 '+keywordsDesc+'模糊搜索'" size="medium"></el-input>
        </el-form-item>
        <el-button type="primary" size="medium" style="width:80px;margin-left:20px;" @click="search">查询</el-button>
        <el-button type="success" size="medium" style="width:80px;margin-left:20px;" @click="addNewData">新增</el-button>
      </el-form>
    </div>
    <div v-if="tableData.length > 0 || tableLoading" style="min-height:500px;">
      <el-table
        :data="tableData"
        v-loading="tableLoading"
        style="width:100%;overflow-x:auto;"
        @header-dragend="changeTagWidthFn"
        size="medium"
        empty-text="."
        stripe
        border>
        <el-table-column
          type="index"
          fixed
          label="序号"
          align="center"
          width="50px">
          <template #default="scope">
            <div>{{scope.$index + ((pages.page-1) * pages.pageSize) + 1}}</div>
          </template>
        </el-table-column>
        <el-table-column
          v-for="(item,ind) in renderTableInfo.tableTags"
          :key="item.key"
          :prop="item.key"
          :label="item.value"
          :fixed="ind<2?'left':false"
          align="center"
          min-width="150px"
          :width="(item.width?item.width+'px':ind===renderTableInfo.tableTags.length-1?'auto':'170px')">
        </el-table-column>
        <el-table-column label="操作" align="center" width="150px">
          <template #default="scope">
            <el-button size="mini" type="danger" @click="handleDeleteFn(scope.$index, scope.row)">删除</el-button>
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else style="min-height:400px;padding-top:60px;">
      <el-empty description="还没有数据哦 ~ "></el-empty>
    </div>
    <el-pagination
      v-if="tableData.length > 0"
      style="margin-top:20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pages.page"
      :page-sizes="[10, 12, 15, 20]"
      :page-size="pages.pageSize"
      layout="total, sizes, prev, pager, next"
      :total="pages.total">
    </el-pagination>

    <!-- 编辑 / 新增弹窗 -->
    <el-dialog :title="isEdit?'正在编辑':'新增数据'" v-model="dialogFormVisible" width="500px">
      <el-form :model="dialogForm" label-position="left">
        <el-form-item :label-width="((maxLabelWidth * 20) > 160?160:maxLabelWidth * 20) + 'px'" :label="tag.value" v-for="tag in renderTableInfo.tableTags" :key="tag.key">
          <el-input v-model="dialogForm[tag.key]" placeholder="请输入..." style="width:90%" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button v-if="isEdit" type="primary" @click="confirmEditDataFn">确定修改</el-button>
          <el-button v-else type="primary" @click="confirmAddData">确定添加</el-button>
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
  import {onMounted,ref,reactive, watch, nextTick, toRaw } from 'vue';
  import {useRoute} from 'vue-router';
  import store from '../store/store';
  import http from "../http/http";
  import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'
  export default {
    name: 'TablePage',
    props: {

    },
    setup(props) {
      let pageLoading = ref(false); // 页面加载 蒙层控制
      let tableLoading = ref(false); // table 单独的loading
      let refs = '';
      const dom = el => {
        refs= el;
      }

      nextTick(() => {
        console.log(refs);
      })
      let pages = reactive({  //分页参数
        page: 1,
        pageSize: 10,
        total: 0
      });
      let maxLabelWidth = ref(0);  // 详情列表 的labelwidth
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

      let searchForm = reactive({
        keywords: '',
      });

      // 查询按钮
      const search = function() {
        tableLoading.value = true;
        tableData.value = [];
        let param = {...searchForm};
        param._id = nowTableId;
        param.keywordsList = renderTableInfo.keywordsList;
        param.pages = pages;
        http.get('/insideTable/getInsideData?'+'param=' + JSON.stringify(param)).then(res=>{
          if(res.data.code == 200) {
            tableData.value = res.data.list;
            for(const key in res.data.pages) {
              pages[key] = res.data.pages[key];
            }
          }
          setTimeout(() => {
            tableLoading.value = false;
          }, 300);
        })
      }



      // 初始化页面
      const queryData = function (id) {
        nowTableId = id;
        pageLoading.value = true;
        renderTableInfo.tableTags = [];
        renderTableInfo.toolTags = [];
        keywordsDesc.value = '';
        http.get("/table?"+'_id=' + id).then((res) => {
          let data = res.data.list[0];
          renderTableInfo.tableTags = data.tableTags;
          renderTableInfo.toolTags = data.toolTags;
          renderTableInfo.keywordsList = data.keywordsList;
          renderTableInfo.name = data.name;

          // TODO  有机会优化一下
          renderTableInfo.keywordsList.forEach(key=>{
            renderTableInfo.tableTags.forEach(tag=>{
              if(maxLabelWidth.value < tag.value.length) {
                maxLabelWidth.value = tag.value.length
              }
              if(key === tag.key) {
                keywordsDesc.value += tag.value + '/';
              }
            })
          })

          renderTableInfo.toolTags.forEach(ele=>{
            searchForm[ele.key] = '';
          })
          console.log(searchForm,'searchForm')

          keywordsDesc.value = keywordsDesc.value.slice(0,-1);
          // 获取列表数据
          search();
          setTimeout(() => {
            pageLoading.value = false;
          }, 300);
        })
      };

      queryData(route.query.id);

      // Store
      let nowTag = store.state.nowTag;
      watch(nowTag,()=>{
        if(!nowTag.id) return
        queryData(nowTag.id);
      })

      const handleSizeChange = function(size) {
        pages.pageSize = size;
        search();
      };
      const handleCurrentChange = function(cur) {
        pages.page = cur;
        search();
      };

      // 新增 弹框 以及参数
      let dialogForm = reactive({});
      let dialogFormVisible = ref(false);
      let isEdit = ref(false);

      // 新增 打开弹窗 以及 初始化参数
      const addNewData = function() {
        isEdit.value = false;
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
            search();
            dialogFormVisible.value = false;
          }
          console.log(res.data);
        })
      }

      // 点击列表编辑按钮
      const handleEdit = function (ind,row) {
        isEdit.value = true;
        dialogFormVisible.value = true;
        let obj = {...row}
        delete obj.__v
        // delete obj._id
        for (const key in obj) {
          dialogForm[key] = obj[key];
        }
      }

      // 确定编辑
      const confirmEditDataFn = function() {
        let param = {...dialogForm};
        param.table_id = nowTableId;
        console.log(param);
        http.post('/insideTable/editInsideData',param).then(res=>{
          if(res.data.code == 200) {
            ElMessage.success({
              type: 'success',
              message: '修改成功'
            })
            dialogFormVisible.value = false;
            search();
          }
          console.log(res.data)
        })
      }

      // 点击列表删除
      const handleDeleteFn = function(ind,row) {
        ElMessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showCancelButton: true,
          type: 'warning'
        }).then(() => {
          http.post('/insideTable/deleteInsideData',{table_id:nowTableId,_id:row._id}).then(res=>{
            if(res.data.code == 200) {
              search();
              ElMessage({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              ElMessage({
                type: 'info',
                message: '服务异常，请稍后再试'
              });
            }
          })
        }).catch(() => {  // 点击取消
          // ElMessage({
          //   type: 'info',
          //   message: '服务异常，请稍后再试'
          // });
        });
      }

      // deBounceFn 防抖
      let timer = null;
      const deBounceFn = function(time,doneFn,param) {
        if(timer) {  // 如果之前的timer还存在 就清空之前的timer
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          timer = null;
          doneFn(param);
        }, time);
      }

      // 拖动列表项调整宽度
      const changeTagWidthFn = function(newWidth,oldWidth,column,event) {
        let param = {...renderTableInfo};
        param.tableTags[column.no-1].width = newWidth;
        param._id = nowTableId;
        console.log(param)
        // 操作后 5秒 为操作宽度 则保存
        deBounceFn(3000,()=>{
          http.post("/table/editTable",param).then((res) => {
            if(res.data.code == 200) {
              ElMessage({
                type: 'success',
                message: '已为您保存当前表格项宽度'
              });
            } else {
              ElMessage({
                type: 'warning',
                message: res.data.msg
              });
            }
            console.log('编辑表格',res.data)
          });
        })
      }




      return {
        searchForm,
        search,
        pages,
        renderTableInfo,
        tableData,
        handleSizeChange,
        handleCurrentChange,
        nowTag,
        handleEdit,
        handleDeleteFn,
        keywordsDesc,
        dom,
        pageLoading,
        tableLoading,
        dialogFormVisible,
        dialogForm,
        addNewData,
        confirmAddData,
        confirmEditDataFn,
        maxLabelWidth,
        isEdit,
        changeTagWidthFn
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
    z-index: 2001;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.77);
    border-radius: 2px;
    i {
      zoom: 1.5;
      margin-top: 26%;
    }
  }
</style>