<template>
  <div class="mainBox">
    <div class="title">
      平平无奇的 404
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted, watch, getCurrentInstance  } from 'vue';
import http from '../http/http'
export default {
  name: "page1",
  props: {

  },
  setup(props) {

  }

}
</script>
<style lang="less" scoped>
.mainBox {
  .title {
    color: #0b2d64;
  }
}
</style>