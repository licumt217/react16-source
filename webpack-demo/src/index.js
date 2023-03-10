/**
 * 
 */
import { createApp } from 'vue';//vue3中没有全局Vue


import 'normalize.css/normalize.css';












import App from './App.vue'
import router from './routers'



createApp(App)
    .use(router)
    .mount("#app");
