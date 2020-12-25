<template>
  <div
    class="dashboard"
    :class="{ mobile: deviceStatus === 'mobile', desktop: deviceStatus === 'desktop' }"
  >
    <div class="mobile-mask" v-if="deviceStatus === 'mobile' && sidebarStatus"></div>
    <div :class="{ sidebarOpened: sidebarStatus }" class="asideContainer transition">
      <DashboardSidebar></DashboardSidebar>
    </div>

    <div class="mainContainer py-4 py-md-5 transition" :class="{ sidebarOpened: sidebarStatus }">
      <DashboardNavbar></DashboardNavbar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardNavbar from '@/components/DashboardNavbar';
import ResizeMixin from '@/mixin/resizeHandler';

export default {
  name: 'Dashboard',
  components: {
    DashboardSidebar,
    DashboardNavbar
  },
  mixins: [ResizeMixin],

  data() {
    return {};
  },

  computed: {
    ...mapGetters('dashboardLayout', ['sidebarStatus', 'deviceStatus'])
  },

  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;
  },

  mounted() {
    const vm = this;
    document.addEventListener('click', (e) => {
      if (vm.sidebarStatus) {
        const maskDom = document.querySelector('.mobile-mask');
        const eDom = e.target;
        if (maskDom === eDom) {
          vm.$store.dispatch('dashboardLayout/toggleSidebar');
        }
      }
    });
  }
};
</script>
