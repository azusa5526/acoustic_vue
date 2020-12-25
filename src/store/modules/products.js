import axios from 'axios';
import router from '@/router';

const state = {
  allProducts: [],
  activedProducts: [],
  filteredProducts: [],
  sortedProducts: [],
  pagedProducts: [],
  pagination: {
    current_page: 1,
    has_next: false,
    has_pre: false,
    total_pages: 1,
    page_size: 12
  },
  filterTag: '',
  maxPrice: '',
  minPrice: '',
  productTitle: ''
};

const actions = {
  getAllAppointments({ commit }) {
    const api = `${process.env.VUE_APP_HEROKU_API_PATH}/appointments`;
    commit('LOADING', true, { root: true });

    axios.get(api).then((response) => {
      if (response.status === 200 || response.status === 201) {
        commit('LOADING', false, { root: true });
        commit('ALLAPPOINTMENTS', response.data);
      } else {
        commit('LOADING', false, { root: true });
        commit(
          'UPDATEMESSAGE',
          { message: '取得全部預約資料失敗', status: 'danger' },
          { root: true }
        );
      }
    });
  },

  getAllProducts({ commit }) {
    const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products/all`;
    commit('LOADING', true, { root: true });

    axios.get(api).then((response) => {
      if (response.data.success) {
        commit('LOADING', false, { root: true });
        commit('ALLPRODUCTS', response.data.products.reverse());
        commit('CATEGORYFILTER');
        commit('SORTPRODUCTS', {});
        commit('PAGINATIONCOUNTER', 1);
      } else {
        commit('LOADING', false, { root: true });
        commit('UPDATEMESSAGE', { message: '取得全部產品失敗', status: 'danger' }, { root: true });
      }
    });
  },

  getActivedProducts({ commit }) {
    const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products/all`;
    commit('LOADING', true, { root: true });

    axios.get(api).then((response) => {
      if (response.data.success) {
        commit('LOADING', false, { root: true });
        commit('ALLPRODUCTS', response.data.products.reverse());
        commit('ACTIVEFILTER');
        commit('CATEGORYFILTER');
        commit('SORTPRODUCTS', {});
        commit('PAGINATIONCOUNTER', 1);
      } else {
        commit('LOADING', false, { root: true });
        commit('UPDATEMESSAGE', { message: '取得全部產品失敗', status: 'danger' }, { root: true });
      }
    });
  },

  getSingleProduct({ commit }, id) {
    const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/product/${id}`;
    commit('LOADING', true, { root: true });

    axios.get(api).then((response) => {
      if (response.data.success) {
        commit('LOADING', false, { root: true });
        router.push(`/products/${response.data.product.id}`);
      } else {
        commit('LOADING', false, { root: true });
        commit('UPDATEMESSAGE', { message: '取得單一產品失敗', status: 'danger' }, { root: true });
      }
    });
  },

  filterProducts({ commit }) {
    commit('CATEGORYFILTER');
    commit('PRICEFILTER');
    commit('TITLEFILTER');
    commit('SORTPRODUCTS', {});
    commit('PAGINATIONCOUNTER', 1);
  },

  sortProducts({ commit }, { sortTarget, isAscending }) {
    commit('SORTPRODUCTS', { sortTarget, isAscending });
    commit('PAGINATIONCOUNTER', 1);
  },

  changePageSize({ commit }, pageSize) {
    commit('CHANGE_PAGESIZE', pageSize);
    commit('PAGINATIONCOUNTER', 1);
  }
};

const mutations = {
  ALLPRODUCTS(state, axiosData) {
    state.allProducts = axiosData;
  },

  ACTIVEFILTER(state) {
    state.activedProducts = state.allProducts.filter(function (item) {
      return item.is_enabled === 1;
    });
  },

  CATEGORYFILTER(state) {
    let tempProducts = [];
    if (router.history.current.name === 'Products') {
      tempProducts = state.activedProducts;
    } else {
      tempProducts = state.allProducts;
    }

    if (state.filterTag === '所有產品') {
      state.filteredProducts = tempProducts;
    } else {
      state.filteredProducts = tempProducts.filter(function (item) {
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

  TITLEFILTER(state) {
    let tempResult = [];
    if (!state.productTitle) {
      return state.filteredProducts;
    }
    tempResult = state.filteredProducts.filter(function (item) {
      return item.title.toLowerCase().indexOf(state.productTitle.toLowerCase()) !== -1;
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

  TITLETAG(state, title) {
    state.productTitle = title.trim();
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
};

const getters = {
  allProducts(state) {
    return state.allProducts;
  },

  activedProducts(state) {
    return state.activedProducts;
  },

  filteredProducts(state) {
    return state.filteredProducts;
  },

  sortedProducts(state) {
    return state.sortedProducts;
  },

  pagination(state) {
    return state.pagination;
  },

  pagedProducts(state) {
    return state.pagedProducts;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
