<template>
  <div class="mainBox">
    <div class="title">Home page</div>
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
  </div>
</template>

<script>
import { reactive, ref, onMounted, watch, getCurrentInstance  } from 'vue';
import http from '../http/http'
export default {
  name: "Home",
  props: {

  },
  setup(props) {
    // 获取列表显示数据
    const queryData = function(){
      http.get('https://suezp.cn/server/singlePart?page=1&pageNum=12&name=&phone=&keyWord=').then(res=>{
        console.log(res.data,'res.data')
      })
    };
    queryData();

  }

}
</script>
<style lang="less" scoped>
.mainBox {
  .title {
    color:skyblue;
  }
}
</style>