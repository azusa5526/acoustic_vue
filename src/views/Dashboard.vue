<template>
  <div class="d-flex flex-column vh-100">
    <div class="content">
      <div class="contaier-fluid d-flex">
        <div class="sidebar vh-100 bg-primary d-none d-md-block py-6 py-lg-8 px-md-4 px-lg-6">
          <h4 class="mb-6 font-weight-light">
            <router-link class="text-white border-bottom pb-4" to="/">DASHBOARD</router-link>
          </h4>
          <ul class="nav nav-pills flex-column text-left">
            <li class="nav-item mb-3">
              <a
                class="nav-link text-white py-4"
                :class="{ active: activePage == 'products' }"
                @click="activePage = 'products'"
                href="#"
                >編輯產品</a
              >
            </li>
            <li class="nav-item mb-3">
              <a
                class="nav-link text-white py-4"
                :class="{ active: activePage == 'order' }"
                @click="activePage = 'order'"
                href="#"
                >訂單訊息</a
              >
            </li>
            <li class="nav-item mb-3">
              <a
                class="nav-link text-white py-4"
                :class="{ active: activePage == 'coupon' }"
                @click="activePage = 'coupon'"
                href="#"
                >折價管理</a
              >
            </li>
            <li class="nav-item mb-3">
              <a
                class="nav-link text-white py-4"
                :class="{ active: activePage == 'others' }"
                @click="activePage = 'others'"
                href="#"
                >其餘功能</a
              >
            </li>
            <li class="nav-item mb-3">
              <a class="nav-link text-white py-4" href="#" @click="logout">登出後台</a>
            </li>
          </ul>
        </div>
        <div class="main vh-100"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  components: {},

  data() {
    return {
      activePage: 'products'
    };
  },

  methods: {
    logout() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/logout`;

      vm.$http.post(api).then((response) => {
        if (response.data.success) {
          console.log(response);
          vm.$router.push('/');
        }
      });
    }
  },

  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;
  }
};
</script>
