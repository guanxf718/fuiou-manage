import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import service from './service'; //项目接口
import './worker/registerServiceWorker';
import './plugins/element.js';
import './assets/styles/index.scss';

Vue.config.productionTip = false;
Vue.prototype.$service = service;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')