<template>
  <div class="header" >
    header
  </div>
</template>

<script>
  import {onMounted} from 'vue'
  export default {
    name: 'HeaderNav',
    props: {

    },
    setup(props) {
      
    }
  }
</script>

<style lange="less" scoped>
  .header {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid black;
    background-color: #42a5f5;
    text-align: center;
  }
</style>