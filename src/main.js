import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.js';

// Bootstrap4 Toggle
import 'bootstrap4-toggle/js/bootstrap4-toggle.min.js';
import 'bootstrap4-toggle/css/bootstrap4-toggle.min.css';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper';
import 'swiper/swiper-bundle.css';

import axios from 'axios';
import VueAxios from 'vue-axios';

// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// filters
import currencyFilter from './filters/currency';
import persentageFilter from './filters/persentage';

// VeeValidate3
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules';

Vue.use(VueAwesomeSwiper);
Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.component('Loading', Loading); // 全域啟用，元件內不用一一載入
Vue.filter('currency', currencyFilter);
Vue.filter('persentage', persentageFilter);
axios.defaults.withCredentials = true;

// VeeValidate3
// 將預設規則一一導入
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

// 設置語系
localize('zh_TW', TW);
// input > provider, form > observer
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
// 動態class設定
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_API_PATH}/api/user/check`;

    axios.post(api).then((response) => {
      if (response.data.success) {
        next();
      } else {
        console.log('Please login');
        next({
          path: '/login'
        });
      }
    });
  } else {
    next();
  }
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});
