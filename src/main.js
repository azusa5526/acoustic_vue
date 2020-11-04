import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './assets/js/srollNav';

// Swiper
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';
Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
