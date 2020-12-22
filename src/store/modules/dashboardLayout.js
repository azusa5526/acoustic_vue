
export default {
  namespaced: true,
  state: {
    sidebar: {
      opened: true
    },
    device: 'desktop'
  },

  actions: {
    toggleSidebar(context) {
      context.commit('TOGGLE_SIDEBAR');
    },
    toggleDevice(context, device) {
      context.commit('TOGGLE_DEVICE', device);
    }
  },
  mutations: {
    TOGGLE_SIDEBAR(state) {
      state.sidebar.opened = !state.sidebar.opened;
    },
    TOGGLE_DEVICE(state, device) {
      state.device = device;
    }
  },
  getters: {
    sidebarStatus(state) {
      return state.sidebar.opened;
    },
    deviceStatus(state) {
      return state.device;
    }
  }
};
