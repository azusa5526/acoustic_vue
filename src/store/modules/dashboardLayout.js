const state = {
  sidebar: {
    opened: true
  },
  device: 'desktop'
};

const actions = {
  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR');
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device);
  }
};
const mutations = {
  TOGGLE_SIDEBAR(state) {
    state.sidebar.opened = !state.sidebar.opened;
  },
  TOGGLE_DEVICE(state, device) {
    state.device = device;
  }
};
const getters = {
  sidebarStatus(state) {
    return state.sidebar.opened;
  },
  deviceStatus(state) {
    return state.device;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
