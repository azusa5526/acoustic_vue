import axios from 'axios';

const state = {
  allAppointments: []
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
        commit('UPDATEMESSAGE', { message: '取得全部預約資料失敗', status: 'danger' }, { root: true });
      }
    });
  }
};

const mutations = {
  ALLAPPOINTMENTS(state, axiosData) {
    state.allAppointments = axiosData;
  }
};

const getters = {
  allAppointments(state) {
    return state.allAppointments;
  },

  filterAppointmentResult: (state) => (date) => {
    return state.allAppointments.some(function (item) {
      return item.date === date;
    });
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
