<template>
  <div class="mainBox">
    <div class="title">平平无奇的 介绍</div>
  </div>
</template>

<script>
import { reactive, ref, onMounted, watch, getCurrentInstance } from "vue";
import store from "../store/store";
import http from "../http/http";
export default {
  name: "page1",
  props: {},
  setup(props) {
    return {};
  },
};
</script>
<style lang="less" scoped>
.mainBox {
  .title {
    color: #fff;
  }
}
</style>