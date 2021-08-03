<template>
  <div class="menu" >
    <div class="titleBox" >
      <div class="imgBox">
        <img src="https://suezp.cn/server/kmProfile.png" alt="头像">
      </div>
      <div class="desc">TableLine</div>
    </div>
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
    text-align: center;
    .titleBox {
      height: 150px;
      padding-top: 10px;
      border-bottom: 1px solid black;
      .imgBox { 
        text-align: center;
        height: 80px;
        width: 80px;
        border-radius: 40px;
        overflow: hidden;
        margin-left: 50%;
        transform: translateX(-50%);
        img {
          height: 100%;
          width: 100%;
        }
      }
      .desc {
        margin-top: 10px;
        text-align: center;
        font-size: 15px;
        color: #000;
      }
    }
    .menuBtn {
      cursor: pointer;
      line-height: 40px;
      height: 45px;
      display: block;
      border-bottom: 1px solid black;
      transition: all .2s ease-in-out 0s;
    }
    .menuBtn:hover {
      background-color: skyblue;
    }
  }
</style>