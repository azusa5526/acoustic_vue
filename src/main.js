import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.js';

import 'bootstrap4-toggle/js/bootstrap4-toggle.min.js';
import 'bootstrap4-toggle/css/bootstrap4-toggle.min.css';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper';
import 'swiper/swiper-bundle.css';

import axios from 'axios';
import VueAxios from 'vue-axios';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import currencyFilter from './filters/currency';
import persentageFilter from './filters/persentage';

import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules';

import VueClipboard from 'vue-clipboard2';

Vue.use(VueAwesomeSwiper);
Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.use(VueClipboard);
Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);
Vue.filter('persentage', persentageFilter);
axios.defaults.withCredentials = true;

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
localize('zh_TW', TW);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
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
