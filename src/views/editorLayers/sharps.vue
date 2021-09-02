<template>
  <div class="sharps" @mousedown="mousedownFn" @mouseup="mouseupFn" @mousemove="mounsemoveFn" @dragover="dragoverFn" >
    <slot></slot>
  </div>
</template>

<script>
import {reactive} from 'vue'
export default {
  name:'sharps',
  setup(props) {


    const throttle = function(fn,delay,param) {
      let doneFn = null;
      return function() {
        if(!doneFn) {  //不存在则开启一个定时任务
          doneFn = setTimeout(() => {
            fn(param);
            doneFn = null;
          }, delay);
        }
      }
    };
    
    const mousedownFn = function(e)  {
      console.log(e.target.tagName)
      if(e.target.tagName.toLowerCase() == 'button') {
      }
      
    };

    const mounsemoveFn = throttle((e)=>{
      console.log('没错我再移动',e)
    },100,{name:'suezp'})
    
    const mouseupFn = function(e) {
      console.log(e.target.tagName)
    };
    
    const dragoverFn = function(e) {
      e.preventDefault();
      e.stopPropagation();  // 阻止冒泡
      e.dataTransfer.dropEffect = 'copy';
    }

    return {
      mousedownFn,
      mouseupFn,
      mounsemoveFn,
      dragoverFn
    }
  },

}
</script>

<style lang="less" scoped>
  .sharps {
    height: 100%;
    background: rgba(135, 207, 235, 0.568);
  }
</style>