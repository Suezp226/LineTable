<template>
  <div class="mainBox">
    <div class="title">page2</div>
  </div>
</template>

<script>
import { reactive, ref, onMounted, watch, getCurrentInstance  } from 'vue';
import http from '../http/http'
export default {
  name: "page2",
  props: {

  },
  setup(props) {

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