<template>
  <div class="menu" >
    <ul>
      <li class="menuBtn" @click="go('/home')" >Home</li>
      <li class="menuBtn" @click="go('/page1')" >page1</li>
      <li class="menuBtn" @click="go('/page2')" >page2</li>
    </ul>
  </div>
</template>

<script>
  import {onMounted} from 'vue';
  import {useRouter} from 'vue-router';
  export default {
    name: 'MenuNav',
    props: {

    },
    setup(props) {
      const router = useRouter();
      console.log(useRouter);
      const go = function(url) {
        router.push(url)
      }
      return {go}
    }
  }
</script>

<style lang="less" scoped>
  .menu {
    height: 100%;
    width: 200px;
    border-right: 1px solid black;
    background-color: skyblue;
    text-align: center;
    .menuBtn {
      cursor: pointer;
      display: block;
      border: 1px solid black;
    }
  }
</style>