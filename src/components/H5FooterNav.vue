<template>
  <div>
    <nut-fixednav :position="{bottom:'20px' }" @selected="goPageFn" :overlay="false" v-model:visible="visible" :nav-list="navList" />
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import {useRouter} from 'vue-router';
export default {
  setup(props) {
    let visible = ref(false);
    let navList = reactive([
      {
        id: 1,
        text: '介绍',
        path: '/introduct',
        icon: 'https://img11.360buyimg.com/imagetools/jfs/t1/117646/2/11112/1297/5ef83e95E81d77f05/daf8e3b1c81e3c98.png'
      },
      {
        id: 2,
        text: '教程',
        path: '/teachPage',
        icon: 'https://img11.360buyimg.com/imagetools/jfs/t1/117646/2/11112/1297/5ef83e95E81d77f05/daf8e3b1c81e3c98.png'
      },
      {
        id: 3,
        text: '试一试',
        path: '/home',
        icon: 'https://img11.360buyimg.com/imagetools/jfs/t1/117646/2/11112/1297/5ef83e95E81d77f05/daf8e3b1c81e3c98.png'
      },
      {
        id: 4,
        text: '404',
        path: '/404',
        icon: 'https://img11.360buyimg.com/imagetools/jfs/t1/117646/2/11112/1297/5ef83e95E81d77f05/daf8e3b1c81e3c98.png'
      },
    ])

    const router = useRouter();
    const goPageFn = function({item}) {
      router.push({
        path: item.path
      })
    }


    return {
      visible,
      navList,
      goPageFn
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.nut-fixednav__btn) {
  background: #3089e475;
}
</style>