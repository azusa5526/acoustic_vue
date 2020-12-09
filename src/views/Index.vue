<template>
  <div class="index d-flex flex-column vh-100">
    <IndexNavbar></IndexNavbar>

    <div class="content">
      <swiper class="slide mb-12" ref="slideSwiper" :options="slideSwiperOptions">
        <swiper-slide>
          <img src="../assets/img/index_slide_2.png" alt="" />
          <div
            class="slide__title d-flex d-md-block flex-column justify-content-center align-items-center py-7 py-md-5 px-10"
          >
            <h2 class="text-secondary font-weight-light">LS50 Wireless II</h2>
            <h5 class="text-secondary font-weight-light text-center">Every note. Every word. Every detail.</h5>
          </div>
        </swiper-slide>
        <swiper-slide>
          <img src="../assets/img/index_slide_1.png" alt="" />
          <div
            class="slide__title d-flex d-md-block flex-column justify-content-center align-items-center py-7 py-md-5 px-10"
          >
            <h2 class="text-secondary font-weight-light">B&W 700 Series</h2>
            <h5 class="text-secondary font-weight-light text-center">Crafted. Honed. Perfected.</h5>
          </div>
        </swiper-slide>
        <swiper-slide>
          <img src="../assets/img/index_slide_3.png" alt="" />
          <div
            class="slide__title d-flex d-md-block flex-column justify-content-center align-items-center py-7 py-md-5 px-10"
          >
            <h2 class="text-secondary font-weight-light">KEF Q750</h2>
            <h5 class="text-secondary font-weight-light text-center">Ebony and Ivory Rhapsody</h5>
          </div>
        </swiper-slide>
      </swiper>

      <div class="slogan container-fluid d-flex align-items-center px-0 mb-12">
        <div class="container">
          <div class="row mx-0">
            <div class="col-md-10 col-lg-6 offset-md-1 offset-lg-6 bg-glass shadow-lg p-11 p-lg-12">
              <h2 class="mb-8 font-weight-light">Listen and You Will See</h2>
              <h5 class="mb-5">即刻預約試聽<br />感受前所未有「看見」聲音的極上體驗</h5>
              <router-link to="/appointment" class="btn btn-primary btn-lg px-6 w-75"
                >立即預約</router-link
              >
            </div>
          </div>
        </div>
      </div>

      <div class="newProducts container-fluid bg-light mb-12">
        <div class="container">
          <h6 class="text-center font-weight-light py-11 mb-0">NEW PRODUCTS</h6>
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

      <div class="news container mb-12">
        <h6 class="text-center font-weight-light pb-11 mb-0">HOT NEWS</h6>
        <div class="row justify-content-md-between justify-content-center">
          <div class="col-lg-6 pr-lg-6 mb-11 mb-lg-8 cardHover--lineStretch">
            <a href="#">
              <div class="card border-0">
                <img src="../assets/img/news_2.png" alt="" />
                <div class="card-body px-2">
                  <p class="mb-2">LS50 WIRELESS II</p>
                  <h3 class="mb-6">無線極致新標準</h3>
                  <p>
                    擁有卓越的音質表現，更是一組功能齊全的一體式音響系統。透過 AirPlay2、Chromecast
                    等無線連接功能，能輕鬆與家裡的各種音源串流播放。
                  </p>
                </div>
              </div>
            </a>
          </div>
          <div class="col-lg-6 pl-lg-6">
            <div class="row">
              <div class="col-md-6 mb-5">
                <a href="#">
                  <div class="card border-0">
                    <img src="../assets/img/news_1.png" alt="" />
                    <div class="card-body card-body-150 px-2 py-4">
                      <p class="mb-2">AIRPULSE A80</p>
                      <h5 class="mb-4 rowLimit-1">細緻小巧 驚爆能量</h5>
                      <p class="rowLimit-2">
                        AIRPULSE主動式音箱系列產品在推出了A100、A200，
                        A300後，再次精心設計了4.5吋低音的A80,其精心的音學設計，並融和高解析數位音訊處理技術，打造出了讓人沉醉的聲音效果。
                      </p>
                    </div>
                  </div>
                </a>
              </div>
              <div class="col-md-6 mb-5">
                <a href="#">
                  <div class="card border-0">
                    <img src="../assets/img/news_3.png" alt="" />
                    <div class="card-body card-body-150 px-2 py-4">
                      <p class="mb-2">Q750 FLOORSTANDING</p>
                      <h5 class="mb-4 rowLimit-1">全方位音樂享受</h5>
                      <p class="rowLimit-2">
                        搭載 Uni-Q 同軸共點中高音單元、一組低音單元和兩組低音輔助擴散器，Q750
                        專為創造全方位音樂享受而設。
                      </p>
                    </div>
                  </div>
                </a>
              </div>
              <div class="col-md-6 mb-5">
                <a href="#">
                  <div class="card border-0">
                    <img src="../assets/img/news_4.png" alt="" />
                    <div class="card-body card-body-150 px-2 py-4">
                      <p class="mb-2">603 S2 Anniversary</p>
                      <h5 class="mb-4 rowLimit-1">僅為您所熱愛的音樂</h5>
                      <p class="rowLimit-2">
                        精緻為一體的立式音箱，採用經優化的分頻器，以實現更加清澈的音質，其裝飾環造型獨特，彰顯非凡品質。
                      </p>
                    </div>
                  </div>
                </a>
              </div>
              <div class="col-md-6 mb-5">
                <a href="#">
                  <div class="card border-0">
                    <img src="../assets/img/news_2.png" alt="" />
                    <div class="card-body card-body-150 px-2">
                      <p class="mb-2">LS50 WIRELESS II</p>
                      <h5 class="mb-4 rowLimit-1">無線極致新標準</h5>
                      <p class="rowLimit-2">
                        擁有卓越的音質表現，更是一組功能齊全的一體式音響系統。透過
                        AirPlay2、Chromecast 等無線連接功能，能輕鬆與家裡的各種音源串流播放。
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="importantInfo container-fluid d-flex align-items-center">
        <div class="container">
          <div class="row">
            <div class="col-md-10 col-lg-7 offset-md-1 bg-glass text-white shadow-lg py-8 px-md-8">
              <h2 class="font-weight-light mb-6">重要消息</h2>
              <ul>
                <li class="d-flex align-items-center">
                  <div class="text-primary text-white text-center px-4 m-4">Sep<br />31</div>
                  <a class="text-white" href=""
                    >配合雙十連假，客服中心服務時間及線上購物出貨時間進行調整</a
                  >
                </li>
                <li class="d-flex align-items-center">
                  <div class="text-primary text-white text-center px-4 m-4">Sep<br />31</div>
                  <a class="text-white" href=""
                    >配合雙十連假，客服中心服務時間及線上購物出貨時間進行調整</a
                  >
                </li>
                <li class="d-flex align-items-center">
                  <div class="text-primary text-white text-center px-4 m-4">Sep<br />31</div>
                  <a class="text-white" href=""
                    >配合雙十連假，客服中心服務時間及線上購物出貨時間進行調整</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import IndexNavbar from '@/components/IndexNavbar';
import Footer from '@/components/Footer';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

export default {
  name: 'Index',
  components: {
    IndexNavbar,
    Footer,
    Swiper,
    SwiperSlide
  },

  data() {
    return {
      slideSwiperOptions: {
        loop: true,
        autoplay: { delay: 3000 }
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

  methods: {
    getSingleProduct(id) {
      this.$store.dispatch('getSingleProduct', id);
    }
  },

  computed: {
    swiper() {
      return this.$refs.slideSwiper.$swiper;
    },
    swiper2() {
      return this.$refs.newProductsSwiper.$swiper;
    }
  }
};
</script>
