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
                <a
                  class="nav-link border"
                  @click.prevent="
                    filterProducts();
                    filterTag = '';
                  "
                  :class="{ active: filterTag == '' }"
                  href="#"
                  >所有產品</a
                >
              </li>
              <li class="nav-item mb-4">
                <a
                  class="nav-link border"
                  @click.prevent="
                    filterProducts('書架型');
                    filterTag = '書架型';
                  "
                  :class="{ active: filterTag == '書架型' }"
                  href="#"
                  >書架型</a
                >
              </li>
              <li class="nav-item mb-4">
                <a
                  class="nav-link border"
                  @click.prevent="
                    filterProducts('落地型');
                    filterTag = '落地型';
                  "
                  :class="{ active: filterTag == '落地型' }"
                  href="#"
                  >落地型</a
                >
              </li>
              <li class="nav-item mb-4">
                <a
                  class="nav-link border"
                  @click.prevent="
                    filterProducts('家庭劇院');
                    filterTag = '家庭劇院';
                  "
                  :class="{ active: filterTag == '家庭劇院' }"
                  href="#"
                  >家庭劇院</a
                >
              </li>
            </ul>
            <hr />
            <div class="">
              <h6>價格範圍</h6>
              <div class="priceFilter d-flex mb-4">
                <input class="" type="text" />
                <span> - </span>
                <input type="text" />
              </div>
              <button class="btn btn-outline-primary w-100">套用價格過濾</button>
            </div>
          </div>

          <div class="products col-md-9">
            <div class="row">
              <div class="mx-15 mb-4 w-100 border-bottom border-top d-flex">
                <div class="dropdown">
                  <button
                    class="btn btn-white px-5 py-3 dropdown-toggle"
                    type="button"
                    id="sortOptionBtn"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {{ sortBy }}
                  </button>
                  <div class="dropdown-menu" aria-labelledby="sortOptionBtn">
                    <a
                      class="dropdown-item"
                      @click.prevent="
                        sortProducts('price', true);
                        sortBy = '價格-低到高';
                      "
                      href="#"
                      >價格-低到高</a
                    >
                    <a
                      class="dropdown-item"
                      @click.prevent="
                        sortProducts('price', false);
                        sortBy = '價格-高到低';
                      "
                      href="#"
                      >價格-高到低</a
                    >
                  </div>
                </div>
                <div class="dropdown">
                  <button
                    class="btn btn-white px-5 py-3 dropdown-toggle"
                    type="button"
                    id="sortOptionBtn"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {{ pageSize }}
                  </button>
                  <div class="dropdown-menu" aria-labelledby="sortOptionBtn">
                    <a
                      class="dropdown-item"
                      @click.prevent="
                        changePageSize(3);
                        pageSize = '3個 每頁';
                      "
                      href="#"
                      >3個 每頁</a
                    >
                    <a
                      class="dropdown-item"
                      @click.prevent="
                        changePageSize(6);
                        pageSize = '6個 每頁';
                      "
                      href="#"
                      >6個 每頁</a
                    >
                    <a
                      class="dropdown-item"
                      @click.prevent="
                        changePageSize(12);
                        pageSize = '12個 每頁';
                      "
                      href="#"
                      >12個 每頁</a
                    >
                  </div>
                </div>
              </div>

              <div
                class="cardHover--scale col-sm-6 col-xl-4 mb-6"
                v-for="item in pagedProducts"
                :key="item.id"
              >
                <a href="#" @click="getSingleProduct(item.id)">
                  <div class="card">
                    <div class="card-img-square">
                      <img :src="item.imageUrl" alt="" />
                    </div>
                    <div class="card-body card-body-200 px-7 text-center">
                      <h6>{{ item.category }}</h6>
                      <h5 class="rowLimit-1">{{ item.title }}</h5>
                      <p class="rowLimit-2">
                        {{ item.description }}
                      </p>
                      <span>NTD {{ item.price | currency }}<small> (含稅)</small></span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <nav class="col offset-md-3 d-flex justify-content-center">
            <Pagination></Pagination>
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
import Pagination from '@/components/Pagination';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Products',
  components: {
    Navbar,
    Footer,
    Pagination
  },

  data() {
    return {
      products: [],
      filterTag: '',
      sortBy: '排序依據',
      pageSize: '每頁產品數'
    };
  },

  methods: {
    ...mapActions(['getAllProducts']),

    getSingleProduct(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/product/${id}`;
      vm.$store.dispatch('updateLoading', true);

      vm.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.$store.dispatch('updateLoading', false);
          vm.$router.push(`/products/${response.data.product.id}`);
        } else {
          vm.$store.dispatch('updateLoading', false);
          console.log('取得單一產品失敗');
        }
      });
    },

    pushFilter(filter) {
      this.$store.commit('PUSHFILTER', filter);
    },

    filterProducts(filter) {
      this.$store.dispatch('filterProducts', filter);
    },

    sortProducts(sortTarget, isAscending) {
      this.$store.dispatch('sortProducts', { sortTarget, isAscending });
    },

    changePageSize(pageSize) {
      this.$store.dispatch('changePageSize', pageSize);
    }
  },

  computed: {
    ...mapGetters(['allProducts', 'pagedProducts'])
  },

  created() {
    this.getAllProducts();
  }
};
</script>
