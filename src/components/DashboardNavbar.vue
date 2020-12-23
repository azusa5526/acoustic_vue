<template>
  <header class="header">
    <nav
      class="dashboardNavbar navbar navbar-light bg-white shadowBottom fixed-top transition px-4"
      :class="{ sidebarOpened: sidebarStatus }"
    >
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link p-0" @click="toggleSidebar()">
            <svg
              t="1608589074565"
              class="icon"
              :class="{ sidebarOpened: sidebarStatus }"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="40166"
              width="32"
              height="32"
            >
              <path
                d="M853.333333 725.034667v64H170.666667v-64h682.666666z m-149.333333-309.333334l149.333333 106.666667-149.333333 106.666667v-213.333334z m-85.333333 74.666667v64H170.666667v-64h448zM853.333333 256v64H170.666667v-64h682.666666z"
                p-id="40167"
              ></path>
            </svg>
          </a>
        </li>
      </ul>
      <ul class="d-flex mb-0">
        <a href="#" class="mr-md-4" @click="logout()">登出後台</a>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'DashboardNavbar',
  components: {},

  data() {
    return {};
  },

  methods: {
    ...mapActions('dashboardLayout', ['toggleSidebar']),

    logout() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/logout`;

      vm.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.$router.push('/');
          this.$store.commit('UPDATEMESSAGE', { message: '已登出後台系統', status: 'secondary' });
        } else {
          this.$store.commit('UPDATEMESSAGE', { message: '登出後台系統失敗', status: 'danger' });
        }
      });
    }
  },

  computed: {
    ...mapGetters('dashboardLayout', ['sidebarStatus', 'deviceStatus'])
  }
};
</script>
