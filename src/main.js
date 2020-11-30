import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'jquery';
import 'bootstrap4-toggle/js/bootstrap4-toggle.min.js';
import 'bootstrap4-toggle/css/bootstrap4-toggle.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper';
import 'swiper/swiper-bundle.css';

import axios from 'axios';
import VueAxios from 'vue-axios';

import currencyFilter from './filters/currency';
import persentageFilter from './filters/persentage';

Vue.use(VueAwesomeSwiper);
Vue.use(VueAxios, axios);
Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);
Vue.filter('persentage', persentageFilter);
axios.defaults.withCredentials = true;

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
