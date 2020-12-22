import store from '@/store';

const { body } = document;
const WIDTH = 768;

export default {
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler);
  },

  mounted() {
    const isMobile = this.isMobile();
    if (isMobile) {
      store.dispatch('dashboardLayout/toggleDevice', 'mobile');
    }
  },

  methods: {
    isMobile() {
      const rect = body.getBoundingClientRect();
      return rect.width - 1 < WIDTH;
    },

    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile();
        store.dispatch('dashboardLayout/toggleDevice', isMobile ? 'mobile' : 'desktop');
      }
    }
  }
};
