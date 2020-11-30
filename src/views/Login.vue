<template>
  <div class="d-flex flex-column vh-100">
    <Navbar></Navbar>

    <div class="content">
      <div class="login container mb-12">
        <div class="text-center py-6 py-md-8">
          <h2>管理登入</h2>
        </div>

        <div class="row">
          <form @submit.prevent="login" class="col-md-8 col-lg-6 mx-auto">
            <div class="form-group">
              <label for="exampleInputEmail1">帳戶</label>
              <input
                v-model="user.username"
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="請輸入Email"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">密碼</label>
              <input
                v-model="user.password"
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="請輸入密碼"
              />
            </div>
            <button type="submit" class="btn btn-primary">登入</button>
          </form>
        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default {
  name: 'Login',
  components: {
    Navbar,
    Footer
  },

  data() {
    return {
      user: {
        password: '',
        username: ''
      }
    };
  },

  methods: {
    login() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/admin/signin`;
      this.$store.dispatch('updateLoading', true);

      vm.$http.post(api, vm.user).then((response) => {
        if (response.data.success) {
          this.$store.dispatch('updateLoading', false);
          const token = response.data.token;
          const expired = response.data.expired;
          document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
          vm.$router.push('/dashboard/products');
        } else {
          this.$store.dispatch('updateLoading', false);
          this.$store.commit('UPDATEMESSAGE', {
            message: `登入失敗: ${response.data.error.code}`,
            status: 'danger'
          });
        }
      });
    }
  }
};
</script>
