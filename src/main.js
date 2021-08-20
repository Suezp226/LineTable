import { createApp, defineComponent } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import NutUI from "@nutui/nutui";
import "@nutui/nutui/dist/style.css";

const app = createApp(App);
app.use(router);
// 将自动设置 Day.js 的国际化设置为 'zh-cn'
app.use(ElementPlus, { locale });
app.use(store);
app.use(NutUI);
app.mount('#app');
