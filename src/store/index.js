import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allProducts: [],
    filteredProducts: [],
    sortedProducts: [],
    pagedProducts: [],
    isLoading: false,
    pagination: {
      current_page: 1,
      has_next: false,
      has_pre: false,
      total_pages: 1,
      page_size: 6
    },
    filterTag: '',
    maxPrice: '',
    minPrice: ''
  },

  actions: {
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },

    getAllProducts(context) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products/all`;
      context.commit('LOADING', true);

      axios.get(api).then((response) => {
        if (response.data.success) {
          context.commit('LOADING', false);
          context.commit('ALLPRODUCTS', response.data.products.reverse());
          context.commit('CATEGORYFILTER');
          context.commit('SORTPRODUCTS', {});
          context.commit('PAGINATIONCOUNTER', 1);
        } else {
          context.commit('LOADING', false);
          console.log('取得全部產品失敗');
        }
      });
    },

    filterProducts(context) {
      context.commit('CATEGORYFILTER');
      context.commit('PRICEFILTER');
      context.commit('SORTPRODUCTS', {});
      context.commit('PAGINATIONCOUNTER', 1);
    },

    sortProducts(context, { sortTarget, isAscending }) {
      context.commit('SORTPRODUCTS', { sortTarget, isAscending });
      context.commit('PAGINATIONCOUNTER', 1);
    },

    changePageSize(context, pageSize) {
      context.commit('CHANGE_PAGESIZE', pageSize);
      context.commit('PAGINATIONCOUNTER', 1);
    }
  },

  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },

    ALLPRODUCTS(state, axiosData) {
      state.allProducts = axiosData;
    },

    CATEGORYFILTER(state) {
      if (state.filterTag === '所有產品') {
        state.filteredProducts = state.allProducts;
      } else {
        state.filteredProducts = state.allProducts.filter(function (item) {
          return item.category.indexOf(state.filterTag) !== -1;
        });
      }
    },

    PRICEFILTER(state) {
      let tempResult = [];
      if (!state.maxPrice && !state.minPrice) {
        return state.filteredProducts;
      }
      tempResult = state.filteredProducts.filter(function (item) {
        return item.price > state.minPrice && item.price <= state.maxPrice;
      });
      state.filteredProducts = tempResult;
    },

    CATEGORYTAG(state, filterTag) {
      state.filterTag = filterTag;
    },

    PRICELIMIT(state, payload) {
      state.minPrice = payload.minPrice;
      state.maxPrice = payload.maxPrice;
    },

    SORTPRODUCTS(state, { sortTarget, isAscending }) {
      if (isAscending) {
        state.sortedProducts = state.filteredProducts.sort(function (a, b) {
          return a[sortTarget] - b[sortTarget];
        });
      } else {
        state.sortedProducts = state.filteredProducts.sort(function (a, b) {
          return b[sortTarget] - a[sortTarget];
        });
      }
    },

    PAGINATIONCOUNTER(state, targetPage) {
      state.pagination.current_page = Number(targetPage);

      state.pagination.total_pages = Number(
        Math.floor(state.filteredProducts.length / state.pagination.page_size) + 1
      );

      if (state.pagination.current_page < state.pagination.total_pages) {
        state.pagination.has_next = true;
      } else {
        state.pagination.has_next = false;
      }

      if (state.pagination.current_page > 1) {
        state.pagination.has_pre = true;
      } else {
        state.pagination.has_pre = false;
      }

      const pageMinIndex =
        state.pagination.current_page * state.pagination.page_size - state.pagination.page_size + 1;
      const pageMaxIndex = state.pagination.current_page * state.pagination.page_size;

      state.pagedProducts = [];
      state.sortedProducts.forEach(function (item, index) {
        const num = index + 1;
        if (num >= pageMinIndex && num <= pageMaxIndex) {
          state.pagedProducts.push(item);
        }
      });
    },

    CHANGE_PAGESIZE(state, pageSize) {
      state.pagination.page_size = pageSize;
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
      return state.sortedProducts;
    },

    isLoading(state) {
      return state.isLoading;
    },

    pagination(state) {
      return state.pagination;
    },

    pagedProducts(state) {
      return state.pagedProducts;
    }
  },

  modules: {}
});
