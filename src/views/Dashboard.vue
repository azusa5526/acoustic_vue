<template>
  <div
    class="dashboard"
    :class="{ mobile: deviceStatus === 'mobile', desktop: deviceStatus === 'desktop' }"
  >
    <div class="mobile-bg" v-if="deviceStatus === 'mobile' && sidebarStatus"></div>
    <div :class="{ sidebarOpened: sidebarStatus }" class="asideContainer transition">
      <DashboardSidebar></DashboardSidebar>
    </div>

    <div class="mainContainer transition" :class="{ sidebarOpened: sidebarStatus }">
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
  }
};
</script>
