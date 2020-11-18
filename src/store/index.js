import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allProducts: [],
    filteredProducts: [],
    isLoading: false,
    sortTarget: '',
    isAscending: Boolean
  },
  actions: {
    getAllProducts(context) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products/all`;
      context.commit('LOADING', true);

      axios.get(api).then((response) => {
        if (response.data.success) {
          context.commit('LOADING', false);
          context.commit('ALLPRODUCTS', response.data.products.reverse());
          context.commit('FILTEREDPRODUCTS');
        } else {
          context.commit('LOADING', false);
          console.log('取得全部產品失敗');
        }
      });
    },

    updateLoading(context, status) {
      context.commit('LOADING', status);
    }
  },
  mutations: {
    ALLPRODUCTS(state, axiosData) {
      state.allProducts = axiosData;
    },

    FILTEREDPRODUCTS(state, filter) {
      if (!filter) {
        state.filteredProducts = state.allProducts;
      } else {
        state.filteredProducts = state.allProducts.filter(function (item) {
          return item.category.indexOf(filter) !== -1;
        });
      }
    },

    SORTTARGET(state, target) {
      state.sortTarget = target;
    },

    ASCENDING(state, status) {
      state.isAscending = status;
    },

    LOADING(state, status) {
      state.isLoading = status;
    }
  },
  getters: {
    allProducts(state) {
      return state.allProducts;
    },

    filteredProducts(state) {
      return state.filteredProducts;
    },

    sortedProducts(state) {
      if (state.isAscending) {
        return state.filteredProducts.sort(function (a, b) {
          return a[state.sortTarget] - b[state.sortTarget];
        });
      } else {
        return state.filteredProducts.sort(function (a, b) {
          return b[state.sortTarget] - a[state.sortTarget];
        });
      }
    },

    isLoading(state) {
      return state.isLoading;
    }
  },
  modules: {}
});
