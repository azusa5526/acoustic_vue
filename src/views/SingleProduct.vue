<template>
  <div class="d-flex flex-column vh-100">
    <Navbar></Navbar>

    <div class="content">
      <div class="productMain container mb-12">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb px-0 my-md-5">
            <li class="breadcrumb-item"><router-link to="/index">首頁</router-link></li>
            <li class="breadcrumb-item"><router-link to="/products">所有產品</router-link></li>
            <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
          </ol>
        </nav>

        <div class="row">
          <div class="col-md-7 mb-11 mb-md-0">
            <swiper ref="swiperTop" :options="swiperTopOptions">
              <swiper-slide><img :src="product.imageUrl" alt="" /></swiper-slide>
              <swiper-slide><img :src="product.imageUrl" alt="" /></swiper-slide>
              <swiper-slide><img :src="product.imageUrl" alt="" /></swiper-slide>
            </swiper>
          </div>

          <div class="col-md-5">
            <h3 class="mb-4">{{ product.title }}</h3>
            <p class="productMain__discription font-weight-light mb-10">
              {{ product.description }}
            </p>
            <div class="productMain__price pb-8 mb-6 border-bottom">
              <del class="text-gray">NTD {{ product.origin_price | currency }}</del>
              <h4 class="text-primary">NTD {{ product.price | currency }}</h4>
              <small class="text-gray"
                >{{ (1 - product.price / product.origin_price) | persentage(1) }} OFF</small
              >
            </div>
            <div class="d-flex justify-content-end">
              <router-link
                :to="{ name: 'Appointment', params: { id: productID } }"
                class="btn btn-primary w-50"
                >即刻預約試聽</router-link
              >
            </div>
          </div>
        </div>
      </div>

      <div class="productTabs container mb-12">
        <ul class="row no-gutters mb-6 nav nav-pills text-center">
          <li class="nav-item col-md-4">
            <a class="nav-link border active" href="#">產品介紹</a>
          </li>
          <li class="nav-item col-md-4">
            <a class="nav-link border" href="#">產品特性</a>
          </li>
          <li class="nav-item col-md-4">
            <a class="nav-link border" href="#">注意事項</a>
          </li>
        </ul>

        <div class="row">
          <div class="col-12">
            <div class="productInfo">
              <p>{{ product.content }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="productRecommanded container-fluid bg-light">
        <div class="container">
          <h6 class="text-center font-weight-light py-11 mb-0">RECOMMAND</h6>
          <swiper class="pb-11" ref="newProductsSwiper" :options="newProductsSwiperOptions">
            <swiper-slide>
              <router-link to="/products/-MMMmsOXuZdTvGUrcoHJ">
                <div class="card">
                  <div class="card-img-top card-img-300">
                    <img src="../assets/img/product_5_1.png" alt="" />
                  </div>
                  <div class="card-body card-body-200">
                    <p>2020.09.05 發售</p>
                    <h6>落地型</h6>
                    <h4 class="rowLimit-1">Q750</h4>
                    <p class="rowLimit-2">
                      搭載 Uni-Q 同軸共點中高音單元、一組低音單元和兩組低音輔助擴散器，Q750
                      專為創造全方位音樂享受而設。
                    </p>
                  </div>
                </div>
              </router-link>
            </swiper-slide>
            <swiper-slide>
              <router-link to="/products/-MMHdS2S4_byw10EhjGd">
                <div class="card">
                  <div class="card-img-top card-img-300">
                    <img src="../assets/img/product_4_1.png" alt="" />
                  </div>
                  <div class="card-body card-body-200">
                    <p>2020.09.05 發售</p>
                    <h6>書架型</h6>
                    <h4 class="rowLimit-1">LS50 WIRELESS II</h4>
                    <p class="rowLimit-2">
                      擁有卓越的音質表現，更是一組功能齊全的一體式音響系統。透過AirPlay2、Chromecast
                      等無線連接功能，能輕鬆與家裡的各種音源串流播放。
                    </p>
                  </div>
                </div>
              </router-link>
            </swiper-slide>
            <swiper-slide>
              <router-link to="/products/-MNN4sCxMaa_PYPY9QOD">
                <div class="card">
                  <div class="card-img-top card-img-300">
                    <img src="../assets/img/product_7_1.jpg" alt="" />
                  </div>
                  <div class="card-body card-body-200">
                    <p>2020.09.05 發售</p>
                    <h6>落地型</h6>
                    <h4 class="rowLimit-1">702 Series2</h4>
                    <p class="rowLimit-2">
                      700
                      系列旗艦落地式喇叭，擁有最先進的聲學科技，包含堅固高音單體外殼包覆的碳高音單體。
                    </p>
                  </div>
                </div>
              </router-link>
            </swiper-slide>
            <swiper-slide>
              <router-link to="/products/-MNN5FjW-XgpohLjmFb3">
                <div class="card">
                  <div class="card-img-top card-img-300">
                    <img src="../assets/img/product_8_1.png" alt="" />
                  </div>
                  <div class="card-body card-body-200">
                    <p>2020.09.05 發售</p>
                    <h6>落地型</h6>
                    <h4 class="rowLimit-1">Arden</h4>
                    <p class="rowLimit-2">
                      Tannoy Legacy
                      ARDEN經典15吋雙同軸落地喇叭，採著名HPD設計，音樂是藝術必須感受它美麗外觀，細節和細微處，而沒有音染或失去音樂精華。
                    </p>
                  </div>
                </div>
              </router-link>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

export default {
  name: 'SingleProduct',
  components: {
    Navbar,
    Footer,
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      productID: '',
      product: '',
      swiperTopOptions: {
        spaceBetween: 10
      },
      newProductsSwiperOptions: {
        slidesPerView: '1',
        spaceBetween: 10,
        centeredSlides: true,
        loop: true,
        autoplay: { delay: 3000 },
        breakpoints: {
          576: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 15
          },
          1200: {
            slidesPerView: 3.5,
            spaceBetween: 25
          }
        }
      }
    };
  },

  watch: {
    $route(to, from) {
      this.productID = this.$route.params.productID;
      this.getSingleProduct();
    }
  },

  methods: {
    getSingleProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/product/${vm.productID}`;
      vm.$store.dispatch('updateLoading', true);

      vm.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.$store.dispatch('updateLoading', false);
          vm.product = response.data.product;
        } else {
          vm.$store.dispatch('updateLoading', false);
          this.$store.commit('UPDATEMESSAGE', { message: '取得單一產品失敗', status: 'danger' });
        }
      });
    }
  },

  computed: {
    swiper() {
      return this.$refs.swiperTop.$swiper;
    },
    swiper2() {
      return this.$refs.newProductsSwiper.$swiper;
    }
  },

  created() {
    this.productID = this.$route.params.productID;
    this.getSingleProduct();
  }
};
</script>
