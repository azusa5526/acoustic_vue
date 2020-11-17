import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.js';

// Vue-loading-overlay
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

// Swiper
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper';
import 'swiper/swiper-bundle.css';

// Axios
import axios from 'axios';
import VueAxios from 'vue-axios';

// filters
import currencyFilter from './filters/currency';
import persentageFilter from './filters/persentage';

Vue.use(VueAwesomeSwiper);
Vue.use(VueAxios, axios);
Vue.component('Loading', Loading); // 全域啟用，元件內不用一一載入
Vue.filter('currency', currencyFilter);
Vue.filter('persentage', persentageFilter);
axios.defaults.withCredentials = true;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');

// 導航守衛
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

// 路徑切換回到頂部
router.afterEach(() => {
  window.scrollTo(0, 0);
});
