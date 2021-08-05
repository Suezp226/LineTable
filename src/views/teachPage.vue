<template>
  <div class="mainBox">
    <div class="title">
      平平无奇的教程
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted, watch, getCurrentInstance  } from 'vue';
import http from '../http/http'
export default {
  name: "teachPage",
  props: {

  },
  setup(props) {

  }

}
</script>
<style lang="less" scoped>
.mainBox {
  .title {
    color:rgb(9, 18, 22);
  }
}
</style>