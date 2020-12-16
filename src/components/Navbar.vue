<template>
  <div class="header">
    <nav class="navbar navbar-expand-md navbar-light bg-white shadowBottom">
      <h1 class="mb-0 ml-sm-6 mr-sm-10 py-3 py-sm-4 py-md-5">
        <router-link class="navbar-brand p-0" to="/">acoustic</router-link>
      </h1>

      <div class="d-flex d-md-none">
        <ul class="mb-0 d-flex">
          <li class="nav-item">
            <a class="py-2 px-3" href="#" data-toggle="dropdown" data-flip="false">
              <i class="far fa-user-circle icon"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right mt-2 mr-2 p-5" style="min-width: 300px">
              <validation-observer v-slot="{ invalid }">
                <form @submit.prevent="login" v-on:keyup.enter="login">
                  <validation-provider rules="required" v-slot="{ errors }">
                    <h5 class="mb-5">管理登入</h5>
                    <div class="form-group">
                      <label>帳戶</label>
                      <input
                        v-model="user.username"
                        type="email"
                        class="form-control"
                        name="帳戶"
                        aria-describedby="emailHelp"
                        placeholder="請輸入Email"
                      />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </validation-provider>

                  <validation-provider rules="required" v-slot="{ errors }">
                    <div class="form-group mb-0">
                      <label>密碼</label>
                      <input
                        v-model="user.password"
                        type="password"
                        name="密碼"
                        class="form-control"
                        placeholder="請輸入密碼"
                      />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </validation-provider>

                  <button href="#" :disabled="invalid" class="btn btn-sm btn-primary mt-4 w-100">
                    登入
                  </button>
                </form>
              </validation-observer>
            </div>
          </li>

          <li class="nav-item pl-2">
            <a class="py-2 px-3" href="#" data-toggle="dropdown" data-flip="false">
              <i class="fas fa-search icon"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right mt-2 mr-2 p-5" style="min-width: 300px">
              <validation-observer v-slot="{ invalid }">
                <validation-provider rules="required" v-slot="{ errors }">
                  <h5 class="mb-5">預約查詢</h5>
                  <div class="form-group mb-0">
                    <input
                      v-model="queryString"
                      type="text"
                      name="預約ID"
                      class="form-control"
                      placeholder="請輸入預約ID"
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </div>
                  <button
                    href="#"
                    :disabled="invalid"
                    class="btn btn-sm btn-primary mt-4 w-100"
                    @click="queryAppointment()"
                  >
                    查詢
                  </button>
                </validation-provider>
              </validation-observer>
            </div>
          </li>

          <li class="nav-item">
            <button
              class="navbar-toggler border-0 py-2 px-3"
              type="button"
              data-toggle="collapse"
              data-target="#navbarToggler"
              aria-controls="navbarToggler"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i class="fas fa-bars"></i>
            </button>
          </li>
        </ul>
      </div>

      <div class="collapse navbar-collapse" id="navbarToggler">
        <ul class="navbar-nav mr-auto mt-3 mt-md-0">
          <li class="nav-item px-5">
            <router-link class="nav-link py-md-0" to="/products">所有產品</router-link>
          </li>
          <li class="nav-item px-5">
            <router-link class="nav-link py-md-0" to="/news">最新消息</router-link>
          </li>
          <li class="nav-item px-5">
            <router-link class="nav-link py-md-0" to="/appointment">預約試聽</router-link>
          </li>
        </ul>
      </div>

      <div class="d-none d-md-block mr-6">
        <ul class="mb-0 d-flex">
          <li class="nav-item">
            <a class="py-3 px-4" href="#" data-toggle="dropdown" data-flip="false">
              <i class="far fa-user-circle icon"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right mt-2 mr-2 p-5" style="min-width: 300px">
              <validation-observer v-slot="{ invalid }">
                <form @submit.prevent="login" v-on:keyup.enter="login">
                  <validation-provider rules="required" v-slot="{ errors }">
                    <h5 class="mb-5">管理登入</h5>
                    <div class="form-group">
                      <label>帳戶</label>
                      <input
                        v-model="user.username"
                        type="email"
                        class="form-control"
                        name="帳戶"
                        aria-describedby="emailHelp"
                        placeholder="請輸入Email"
                      />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </validation-provider>

                  <validation-provider rules="required" v-slot="{ errors }">
                    <div class="form-group mb-0">
                      <label>密碼</label>
                      <input
                        v-model="user.password"
                        type="password"
                        name="密碼"
                        class="form-control"
                        placeholder="請輸入密碼"
                      />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </div>
                  </validation-provider>

                  <button href="#" :disabled="invalid" class="btn btn-sm btn-primary mt-4 w-100">
                    登入
                  </button>
                </form>
              </validation-observer>
            </div>
          </li>

          <li class="nav-item pl-2">
            <a class="py-3 px-4" href="#" data-toggle="dropdown" data-flip="false">
              <i class="fas fa-search icon"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right mt-2 mr-2 p-5" style="min-width: 300px">
              <validation-observer v-slot="{ invalid }">
                <validation-provider rules="required" v-slot="{ errors }">
                  <h5 class="mb-5">預約查詢</h5>
                  <div class="form-group mb-0">
                    <input
                      v-model="queryString"
                      type="text"
                      name="預約ID"
                      class="form-control"
                      placeholder="請輸入預約ID"
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </div>
                  <button
                    href="#"
                    :disabled="invalid"
                    class="btn btn-sm btn-primary mt-4 w-100"
                    @click="queryAppointment()"
                  >
                    查詢
                  </button>
                </validation-provider>
              </validation-observer>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  components: {},
  data() {
    return {
      queryString: '',
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
    },

    queryAppointment() {
      const vm = this;
      const api = `${process.env.VUE_APP_HEROKU_API_PATH}/appointments/${vm.queryString}`;
      vm.$store.dispatch('updateLoading', true);

      vm.$http
        .get(api)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            vm.$store.dispatch('updateLoading', false);
            vm.$router.push(`checkAppointment/${vm.queryString}`);
          }
        })
        .catch((error) => {
          vm.$store.dispatch('updateLoading', false);
          vm.queryString = '';
          console.log('error', error);
          this.$store.commit('UPDATEMESSAGE', {
            message: '未查詢到該預約，請確認預約ID號碼',
            status: 'danger'
          });
        });
    }
  }
};
</script>
