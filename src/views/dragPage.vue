<template>
  <el-container class="mainBox">
    <el-header class="toolBox">
      ToolBox
    </el-header>
    <el-container>
      <el-aside class="flex-left" @dragstart="dragstartFn" @dragend="dragendFn">
        <ul class="flexBox">
          <li draggable="true" v-for="(item,index) in materials" :key="index" :data-index="index" :style="item.style" class="inside-flex-child" >1</li>
        </ul>
      </el-aside>
      <el-main class="flex-center" @dragover="dragoverFn">center</el-main>
      <el-aside class="flex-right">right</el-aside>
    </el-container>

  </el-container>
</template>

<script>
import { reactive, ref, onMounted, watch, getCurrentInstance  } from 'vue';
import http from '../http/http';
export default {
  name: "page1",
  props: {

  },
  setup(props) {

    let materials = reactive([
      {
        name:'button',
        desc: '1',
        style: {
          backgroundColor:'pink'
        }
      },
      {
        name:'button',
        desc: '2',
        style: {
          backgroundColor:'skyblue'
        }
      },
    ]);

    const dragstartFn = function(e) {
      console.log('我拖了怎么滴。',e.target.dataset.index)
    }

    const dragoverFn = function(e) {
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.dropEffect = 'copy';
    }

    const dragendFn = function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('拖拽结束',e)
    }

    return {
      dragstartFn,
      dragoverFn,
      dragendFn,
      materials
    }
  }

}
</script>
<style lang="less" scoped>
.mainBox {
  .toolBox {
    height: 100px;
    background: rgba(135, 207, 235, 0.301);
  }
  .flexBox {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
  }
  .flex-left {
    width: 180px;
    background: rgba(255, 255, 255, 0.225);
    .inside-flex-child {
      display: inline-block;
      border: 1px solid pink;
      height: 70px;
      width: 70px;
      margin: 5px;
      text-align: center;
      line-height: 70px;
      cursor: pointer;
    }
  }
  .flex-center {
    background: rgba(255, 255, 255, 0.425);
  }
  .flex-right {
    width: 180px;
    background: rgba(255, 255, 255, 0.225);
  }

}
</style>