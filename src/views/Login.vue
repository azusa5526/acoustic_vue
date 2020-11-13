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
              <label for="exampleInputEmail1">Account</label>
              <input
                v-model="user.username"
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                v-model="user.password"
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
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

      vm.$http.post(api, vm.user).then((response) => {
        if (response.data.success) {
          const token = response.data.token;
          const expired = response.data.expired;
          document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
          vm.$router.push('/dashboard');
        }
      });
    }
  }
};
</script>
