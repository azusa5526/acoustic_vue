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
                <a class="nav-link border" @click.prevent="filterProducts(); filterTag = ''" :class="{'active' : filterTag == ''}" href="#">所有產品</a>
              </li>
              <li class="nav-item mb-4">
                <a class="nav-link border" @click.prevent="filterProducts('書架型'); filterTag = '書架型'" :class="{'active' : filterTag == '書架型'}" href="#">書架型</a>
              </li>
              <li class="nav-item mb-4">
                <a class="nav-link border" @click.prevent="filterProducts('落地型'); filterTag = '落地型'" :class="{'active' : filterTag == '落地型'}" href="#">落地型</a>
              </li>
              <li class="nav-item mb-4">
                <a class="nav-link border" @click.prevent="filterProducts('家庭劇院'); filterTag = '家庭劇院'" :class="{'active' : filterTag == '家庭劇院'}" href="#">家庭劇院</a>
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

              <div
                class="cardHover--scale col-sm-6 col-xl-4 mb-6"
                v-for="item in filteredProducts"
                :key="item.id"
              >
                <a href="#" @click="getSingleProduct(item.id)">
                  <div class="card">
                    <div class="card-img-top">
                      <img :src="item.imageUrl" alt="" />
                    </div>
                    <div class="card-body card-body-200">
                      <p>2020.09.05 發售</p>
                      <h6>{{ item.category }}</h6>
                      <h5 class="rowLimit-1">{{ item.title }}</h5>
                      <p class="rowLimit-2">
                        {{ item.description }}
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Products',
  components: {
    Navbar,
    Footer
  },

  data() {
    return {
      products: [],
      filterTag: ''
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

    filterProducts(filter) {
      this.$store.commit('FILTEREDPRODUCTS', filter);
    }
  },

  computed: {
    ...mapGetters(['allProducts', 'filteredProducts'])
  },

  created() {
    this.getAllProducts();
  }
};
</script>
