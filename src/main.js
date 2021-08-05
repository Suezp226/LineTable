import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(store);
app.mount('#app');
