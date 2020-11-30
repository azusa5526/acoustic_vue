<template>
  <div class="">
    <div class="content">
      <div class="contaier-fluid d-flex">
        <DashboardSidebar></DashboardSidebar>

        <div class="main vh-100 bg-secondary">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardSidebar from '@/components/DashboardSidebar';

export default {
  name: 'Dashboard',
  components: {
    DashboardSidebar
  },

  data() {
    return {};
  },
  
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;
  }
};
</script>
