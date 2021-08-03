<template>
  <h1>{{ msg }}</h1>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="state.count++">
    count is: {{ state.count }}
  </button>
  <hr>
  <button type="button" @click="num++">
    num is: {{ num }}
  </button>
  <h1>{{string}}</h1>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script>
import { reactive, ref, onMounted, watch } from 'vue'

export default {
  components:{},
  props: {
    user: {
      type: String,
      require: false
    },
    msg: String
  },
  setup(props) {
    const state = reactive({count: 0})
    onMounted(()=>{
      console.log('onMounted');
    })
    const num = ref(10);
    watch(num,(newVal,oldVal)=>{
      console.log('state.count \n old:',oldVal, '\n new:', newVal)
    })
    const string = '我在这啊老哥'
    onMounted(()=>{
      console.log('onMounted2')
    })
    return {
      num, string, state
    }
  }
}

</script>

<style scoped>
a {
  color: #42b983;
}
</style>
