import Vue from 'vue';
import Vuex from 'vuex';
import dashboardLayout from './modules/dashboardLayout';
import appointments from './modules/appointments';
import products from './modules/products';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    message: '',
    status: '',
    isNotice: false
  },

  plugins: [createPersistedState()],

  actions: {
    updateLoading(context, status) {
      context.commit('LOADING', status);
    }
  },

  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },

    UPDATEMESSAGE(state, payload) {
      state.message = payload.message;
      state.status = payload.status;
      state.isNotice = !state.isNotice;
    }
  },

  getters: {
    isLoading(state) {
      return state.isLoading;
    },

    message(state) {
      return state.message;
    },

    status(state) {
      return state.status;
    },

    isNotice(state) {
      return state.isNotice;
    }
  },

  modules: {
    dashboardLayout,
    appointments,
    products
  }
});
