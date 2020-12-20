<template>
  <div class="">
    <div class="asideContainer transition" :class="{ foldSidebar: !sidebarStatus }">
      <DashboardSidebar></DashboardSidebar>
    </div>

    <div class="mainContainer transition" :class="{ expendMain: !sidebarStatus }">
      <DashboardNavbar></DashboardNavbar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardNavbar from '@/components/DashboardNavbar';

export default {
  name: 'Dashboard',
  components: {
    DashboardSidebar,
    DashboardNavbar
  },

  data() {
    return {};
  },

  computed: {
    ...mapGetters('dashboardLayout', ['sidebarStatus'])
  },

  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;
    this.$store.dispatch('changePageSize', 12);
  }
};
</script>
