<template>
  <div class="mainBox" >
    <div class="toolBox">
      <el-form 
      :model="form" 
      label-width="80px" 
      inline 
      style="margin-bottom:-20px;"
      :highlight-current-row="true"
      >
        <el-form-item label="活动名称" v-for="item in list" :key="item">
          <el-input style="width:150px" size="medium"></el-input>
        </el-form-item>
        <el-button type="primary" size="medium" style="width:80px;margin-left:20px;">查询</el-button>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%;min-height:500px;"
      size="medium"
      stripe
      border>
      <el-table-column
        prop="date"
        align="center"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="地址">
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
  </div>
</template>

<script>
  import {onMounted,ref,reactive, watch} from 'vue'
  import store from '../store/store'
  export default {
    name: 'TablePage',
    props: {

    },
    setup(props) {
      // Store
      let nowTag = store.state.nowTag;
      let list = ref([]);
      if(nowTag.name == '示例') {
          list.value = [1,2,3,4];
        } else {
          list.value = [1,23];
        }

      
      watch(store.state.nowTag,()=>{
        if(nowTag.name == '示例') {
          list.value = [1,2,3,4];
        } else {
          list.value = [1,2];
        }
      })


      let tableData =  [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }];
        let handleSizeChange = function() {

        };
        let handleCurrentChange = function() {

        };
        let currentPage = ref(1)
      return {
        form: reactive({}),
        tableData,
        handleSizeChange,
        handleCurrentChange,
        currentPage,
        nowTag,
        list
      }
    }
  }
</script>
<style lang="less" scoped>
  .toolBox {
    border: 1px solid #42bfac;
    border-radius: 2px;
    padding: 10px 0;
    margin-bottom: 20px;
  }
</style>