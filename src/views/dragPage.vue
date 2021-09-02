<template>
  <el-container class="mainBox">
    <el-header class="toolBox">
      ToolBox
    </el-header>
    <el-container>
      <el-aside class="flex-left" @dragstart="dragstartFn" @dragend="dragendFn">
        <ul class="flexBox">
          <el-button type="primary" draggable="true" v-for="(item,index) in materials" :key="index" :data-index="index" :style="item.Toolstyle" class="inside-flex-child" >{{item.desc}}</el-button>
        </ul>
      </el-aside>
      <el-main class="flex-center" @contextmenu="rightMouseClickFn">
        <sharps>
          <el-button type="primary" v-for="(item,ind) in renderList" :style="item.renderStyle" :key="ind">{{item.name+item.desc}}</el-button>
        </sharps>
      </el-main>
      <el-aside class="flex-right">right</el-aside>
    </el-container>

  </el-container>
</template>

<script>
import { reactive, ref, onMounted, watch, getCurrentInstance, render  } from 'vue';
import sharps from "./editorLayers/sharps.vue"
import http from '../http/http';
export default {
  name: "page1",
  props: {

  },
  components: {
    sharps
  },
  setup(props) {

    let materials = reactive([
      {
        name:'button',
        desc: '1',
        Toolstyle: {
          height: '40px',
          backgroundColor:'pink',
        },
        renderStyle: {
          backgroundColor:'pink',
          height: '50px'
        }
      },
      {
        name:'button',
        desc: '2',
        Toolstyle: {
          height: '40px',
          backgroundColor:'skyblue'
        },
        renderStyle: {
          
        }
      },
    ]);
    let renderList = reactive([]);

    const dragstartFn = function(e) {
      console.log('我拖了怎么滴。',e.target.dataset.index)
    }

    const dragendFn = function(e) {
      e.preventDefault();
      e.stopPropagation();
      renderList.push(materials[e.target.dataset.index]);
      console.log('拖拽结束',e)
    }

    const rightMouseClickFn = function(e) {
      console.log(e.target)
    }

    const over = function() {
      console.log('我在移动啊')
    }

    return {
      dragstartFn,
      dragendFn,
      rightMouseClickFn,
      materials,
      renderList,
      over
    }
  }

}
</script>
<style lang="less" scoped>
.mainBox {
  padding: 10px;
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
      height: auto;
      display: inline-block;
      margin: 5px;
      text-align: center;
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