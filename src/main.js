import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.js';

// Swiper
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';

// Axios
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAwesomeSwiper);
Vue.use(VueAxios, axios);
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
