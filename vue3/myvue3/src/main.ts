import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import 'normalize.css/normalize.css' // a modern alternative to CSS resets


// import './assets/styles/element-theme/index.scss'

// import 'viewerjs/dist/viewer.css'

// import '@/assets/styles/index.scss' // global css
// import '@/assets/styles/base.scss' // ruoyi css
// import permission from './directive/permission'


import App from './App.vue'
import MyCom from './MyCom.vue'
// import router from '@/router'
// import store from '@/store'


// import './assets/icons' // icon
// import './permission' // permission control
// import { getDicts } from '@/api/system/dict/data';
// import { getConfigKey } from '@/api/system/config';
// import {
//     parseTime,
//     resetForm,
//     addDateRange,
//     selectDictLabel,
//     download,
//     handleTree,
// } from '@/utils/tools'

// import Pagination from '@/components/Pagination/Pagination.vue';




// import ParkRemoteSelect from '@/components/ParkRemoteSelect/Index.vue'

// import VueClipboard from 'vue-clipboard2'


const app = createApp(App)
const pinia = createPinia();
app.use(pinia)

app.config.globalProperties.abc = 'liq'

app.component("MyCom", MyCom)

// // 全局方法挂载
// app.config.globalProperties.getDicts = getDicts;
// app.config.globalProperties.getConfigKey = getConfigKey;
// app.config.globalProperties.parseTime = parseTime;
// app.config.globalProperties.resetForm = resetForm;
// app.config.globalProperties.addDateRange = addDateRange;
// app.config.globalProperties.selectDictLabel = selectDictLabel;
// app.config.globalProperties.selectDictLabel = selectDictLabel;
// app.config.globalProperties.download = download;
// app.config.globalProperties.handleTree = handleTree;
// app.config.globalProperties.msgSuccess = function (msg: string) {
//     this.$message({ showClose: true, message: msg, type: "success" });
// };
// app.config.globalProperties.msgError = function (msg: string) {
//     this.$message({ showClose: true, message: msg, type: "error" });
// };
// app.config.globalProperties.msgInfo = function (msg: string) {
//     this.$message.info(msg);
// };

// // 全局组件挂载
// app.component('Pagination', Pagination)
// app.component('ParkRemoteSelect', ParkRemoteSelect)

// app.use(permission)
// app.use(VueClipboard)

// app.use(router)
// app.use(store)

app.mount('#app')


