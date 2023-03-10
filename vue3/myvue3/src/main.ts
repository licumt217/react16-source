import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Cookies from 'js-cookie'


import 'normalize.css/normalize.css' // a modern alternative to CSS resets


import Element from 'element-plus'
import './assets/styles/element-theme/index.scss'

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/base.scss' // ruoyi css
import permission from './directive/permission'


import App from './App.vue'
import router from './router'


import './assets/icons' // icon
import './permission' // permission control
import { getDicts } from '@/api/system/dict/data';
import { getConfigKey } from '@/api/system/config';
import {
    parseTime,
    resetForm,
    addDateRange,
    selectDictLabel,
    download,
    handleTree,
    fillBlankContent
} from '@/utils/tools'

import Pagination from '@/components/Pagination/Pagination.vue';




import ParkRemoteSelect from '@/components/ParkRemoteSelect'
import ElCurrencyInput from '@/components/ElCurrencyInput'

import VueClipboard from 'vue-clipboard2'


const app = createApp(App)

// 全局方法挂载
app.config.globalProperties.getDicts = getDicts;
app.config.globalProperties.getConfigKey = getConfigKey;
app.config.globalProperties.parseTime = parseTime;
app.config.globalProperties.resetForm = resetForm;
app.config.globalProperties.addDateRange = addDateRange;
app.config.globalProperties.selectDictLabel = selectDictLabel;
app.config.globalProperties.selectDictLabel = selectDictLabel;
app.config.globalProperties.download = download;
app.config.globalProperties.handleTree = handleTree;
app.config.globalProperties.msgSuccess = function (msg: string) {
    this.$message({ showClose: true, message: msg, type: "success" });
};
app.config.globalProperties.msgError = function (msg: string) {
    this.$message({ showClose: true, message: msg, type: "error" });
};
app.config.globalProperties.msgInfo = function (msg: string) {
    this.$message.info(msg);
};

// 全局组件挂载
app.component('Pagination', Pagination)
app.component('ParkRemoteSelect', ParkRemoteSelect)

app.use(permission)
app.use(VueClipboard)
app.use(Viewer)
app.use(ElCurrencyInput)
Vue.filter('fillBlankContent', fillBlankContent)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

app.use(Element, {
    size: Cookies.get('size') || 'medium' // set element-ui default size
})


app.use(createPinia())
app.use(router)

app.mount('#app')


