<template>
  <div class="d-flex flex-column vh-100">
    <Navbar></Navbar>
    <div class="content">
      <div class="container-fluid px-6 px-md-8 px-lg-13 mb-10">
        <div class="text-center py-6 py-md-8">
          <h2>所有產品</h2>
        </div>
        <div class="row mb-6">
          <div class="sideFilter col-md-3">
            <ul class="nav nav-pills flex-column text-center">
              <li class="nav-item mb-4">
                <a class="nav-link border active" href="#">所有產品</a>
              </li>
              <li class="nav-item mb-4">
                <a class="nav-link border" href="#">書架型</a>
              </li>
              <li class="nav-item mb-4">
                <a class="nav-link border" href="#">落地型</a>
              </li>
              <li class="nav-item mb-4">
                <a class="nav-link border" href="#">家庭劇院</a>
              </li>
              <li class="nav-item mb-4">
                <a class="nav-link border" href="#">價格</a>
              </li>
            </ul>
          </div>

          <div class="products col-md-9">
            <div class="row">
              <div class="mx-15 mb-4 w-100 border-bottom border-top">
                <div class="dropdown">
                  <button
                    class="btn btn-white px-5 py-3 dropdown-toggle"
                    type="button"
                    id="sortOptionBtn"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    排序依據
                  </button>
                  <div class="dropdown-menu" aria-labelledby="sortOptionBtn">
                    <a class="dropdown-item" href="#">價格低到高</a>
                    <a class="dropdown-item" href="#">價格高到低</a>
                    <a class="dropdown-item" href="#">發售日近到遠</a>
                    <a class="dropdown-item" href="#">發售日遠到近</a>
                  </div>
                </div>
              </div>

              <div class="cardHover--scale col-sm-6 col-xl-4 mb-6">
                <a href="singleProduct.html">
                  <div class="card">
                    <div class="card-img-top">
                      <img src="../assets/img/product_1_1.jpg" alt="" />
                    </div>
                    <div class="card-body card-body-200">
                      <p>2020.09.05 發售</p>
                      <h6>書架型</h6>
                      <h5 class="rowLimit-1">AIRPULSE A80</h5>
                      <p class="rowLimit-2">
                        獨特的號角負載鋁帶高音，4.5吋鋁質振膜低失真中低音單體，為聲音提供有力保證。
                      </p>
                    </div>
                  </div>
                </a>
              </div>
              <div class="cardHover--scale col-sm-6 col-xl-4 mb-6">
                <a href="#">
                  <div class="card">
                    <div class="card-img-top">
                      <img src="../assets/img/product_2_1.jpg" alt="" />
                    </div>
                    <div class="card-body card-body-200">
                      <p>2020.09.05 發售</p>
                      <h6>家庭劇院</h6>
                      <h5 class="rowLimit-1">E255</h5>
                      <p class="rowLimit-2">衛星通道獨立功放+DSP分頻系統，打造爆棚音效。</p>
                    </div>
                  </div>
                </a>
              </div>
              <div class="cardHover--scale col-sm-6 col-xl-4 mb-6">
                <a href="#">
                  <div class="card">
                    <div class="card-img-top">
                      <img src="../assets/img/product_3_1.jpg" alt="" />
                    </div>
                    <div class="card-body card-body-200">
                      <p>2020.09.05 發售</p>
                      <h6>落地型</h6>
                      <h5 class="rowLimit-1">603 S2 Anniversary</h5>
                      <p class="rowLimit-2">
                        精緻為一體的立式音箱，採用經優化的分頻器，以實現更加清澈的音質，其裝飾環造型獨特，彰顯非凡品質。
                      </p>
                    </div>
                  </div>
                </a>
              </div>
              <div class="cardHover--scale col-sm-6 col-xl-4 mb-6">
                <a href="#">
                  <div class="card">
                    <div class="card-img-top">
                      <img src="../assets/img/product_4_1.png" alt="" />
                    </div>
                    <div class="card-body card-body-200">
                      <p>2020.09.05 發售</p>
                      <h6>書架型</h6>
                      <h5 class="rowLimit-1">LS50 WIRELESS II</h5>
                      <p class="rowLimit-2">
                        擁有卓越的音質表現，更是一組功能齊全的一體式音響系統。透過
                        AirPlay2、Chromecast 等無線連接功能，能輕鬆與家裡的各種音源串流播放。
                      </p>
                    </div>
                  </div>
                </a>
              </div>
              <div class="cardHover--scale col-sm-6 col-xl-4 mb-6">
                <a href="#">
                  <div class="card">
                    <div class="card-img-top">
                      <img src="../assets/img/product_5_1.png" alt="" />
                    </div>
                    <div class="card-body card-body-200">
                      <p>2020.09.05 發售</p>
                      <h6>落地型</h6>
                      <h5 class="rowLimit-1">Q750 FLOORSTANDING</h5>
                      <p class="rowLimit-2">
                        搭載 Uni-Q 同軸共點中高音單元、一組低音單元和兩組低音輔助擴散器，Q750
                        專為創造全方位音樂享受而設。
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <nav class="col offset-md-3 d-flex justify-content-center">
            <ul class="pagination">
              <li class="page-item disabled">
                <a class="page-link" href="#" tabindex="-1">Prev</a>
              </li>
              <li class="page-item active"><a class="page-link" href="#">1</a></li>
              <li class="page-item">
                <a class="page-link" href="#">2</a>
              </li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default {
  name: 'Products',
  components: {
    Navbar,
    Footer
  }
};
</script>
