<template>
  <div class="sidebar vh-100 bg-primary d-none d-md-block py-6 py-lg-8 px-md-4 px-lg-5">
    <h4 class="mb-6 font-weight-light">
      <router-link class="text-white border-bottom pb-4" to="/">DASHBOARD</router-link>
    </h4>
    <ul class="nav nav-pills flex-column text-left">
      <li class="nav-item mb-3">
        <router-link class="nav-link text-white py-4" to="/dashboard/products"
          >編輯產品</router-link
        >
      </li>
      <li class="nav-item mb-3">
        <router-link class="nav-link text-white py-4" to="/dashboard/order">訂單訊息</router-link>
      </li>
      <li class="nav-item mb-3">
        <router-link class="nav-link text-white py-4" to="/dashboard/coupon">折價管理</router-link>
      </li>
      <li class="nav-item mb-3">
        <router-link class="nav-link text-white py-4" to="/dashboard/others">其餘功能</router-link>
      </li>
      <li class="nav-item mb-3">
        <a class="nav-link text-white py-4" href="#" @click="logout">登出後台</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DashboardSidebar',
  components: {},

  data() {
    return {};
  },

  methods: {
    logout() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/logout`;

      vm.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.$router.push('/');
        }
      });
    }
  }
};
</script>
