<template>
  <div class="d-flex flex-column vh-100">
    <Navbar></Navbar>

    <div class="content">
      <div class="appointment container mb-12">
        <div class="text-center py-6 py-md-8">
          <h2>預約試聽</h2>
        </div>

        <validation-observer v-slot="{ invalid }">
          <form
            @submit.prevent="sendAppointment('tempAppointment')"
            class="px-0 px-md-12 px-lg-13 mb-11"
          >
            <h4 class="mb-6">預約內容</h4>

            <validation-provider
              class="form-group row no-gutters align-items-center"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="col-sm-3 col-lg-2 pr-0">
                <label for="serviceSelect">預約項目</label>
              </div>
              <div class="col-sm-9 col-lg-10">
                <select
                  class="form-control"
                  id="serviceSelect"
                  v-model="tempAppointment.category"
                  name="預約項目"
                  :disabled="product !== ''"
                >
                  <option class="d-none">--- 請選擇 ---</option>
                  <option value="書架型" :SELECTED="product.category == '書架型'">
                    書架型音響試聽
                  </option>
                  <option value="落地型" :SELECTED="product.category == '落地型'">
                    落地型音響試聽
                  </option>
                  <option value="家庭劇院" :SELECTED="product.category == '家庭劇院'">
                    家庭劇院音響試聽
                  </option>
                  <option value="其他" :SELECTED="product.category == '其他'">
                    其他器材適用(AMP、SUB)
                  </option>
                </select>
              </div>
              <div class="offset-sm-3 offset-lg-2 col-sm-9 col-lg-10">
                <span class="text-danger">{{ errors[0] }}</span>
              </div>
            </validation-provider>

            <validation-provider
              class="form-group row no-gutters align-items-center"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="col-sm-3 col-lg-2 pr-0">
                <label for="productName">詳細型號</label>
              </div>
              <div class="col-sm-9 col-lg-10">
                <input
                  type="text"
                  class="form-control"
                  id="productName"
                  name="詳細型號"
                  :disabled="product !== ''"
                  v-model="tempAppointment.title"
                />
              </div>
              <div class="offset-sm-3 offset-lg-2 col-sm-9 col-lg-10">
                <span class="text-danger">{{ errors[0] }}</span>
              </div>
            </validation-provider>

            <!-- <div class="form-group row no-gutters align-items-center mb-12">
              <div class="col-sm-3 col-lg-2 pr-0">
                <label for="date">預約時間</label>
              </div>
              <div class="col-sm-9 col-lg-10">
                <el-date-picker v-model="tempAppointment.date" type="date" placeholder="選擇日期">
                </el-date-picker>
                <el-time-select
                  v-model="tempAppointment.time"
                  :picker-options="{
                    start: '13:00',
                    step: '00:30',
                    end: '20:00'
                  }"
                  placeholder="選擇時間"
                >
                </el-time-select>
              </div>
            </div> -->

            <el-form
              :model="tempAppointment"
              :rules="rules"
              ref="tempAppointment"
              class="form-group row no-gutters"
            >
              <div class="col-sm-3 col-lg-2 pr-0">
                <label class="mb-0" for="date">預約時間</label>
              </div>

              <div class="col-sm-9 col-lg-10">
                <el-form-item required>
                  <el-form-item prop="date" class="mb-4">
                    <el-date-picker
                      type="date"
                      placeholder="選擇日期"
                      v-model="tempAppointment.date"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>

                  <el-form-item prop="time">
                    <el-time-select
                      v-model="tempAppointment.time"
                      :picker-options="{
                        start: '13:00',
                        step: '00:30',
                        end: '20:00'
                      }"
                      placeholder="選擇時間"
                      style="width: 100%;"
                    >
                    </el-time-select>
                  </el-form-item>
                </el-form-item>
              </div>
            </el-form>

            <h4 class="mb-6">聯絡資料</h4>

            <validation-provider
              class="form-group row no-gutters align-items-center"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="col-sm-3 col-lg-2 pr-0">
                <label for="name">預約人姓名</label>
              </div>
              <div class="col-sm-9 col-lg-10">
                <input
                  type="text"
                  class="form-control"
                  v-model="tempAppointment.name"
                  id="name"
                  name="預約人姓名"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="offset-sm-3 offset-lg-2 col-sm-9 col-lg-10">
                <span class="text-danger">{{ errors[0] }}</span>
              </div>
            </validation-provider>

            <validation-provider
              class="form-group row no-gutters align-items-center"
              rules="required|email"
              v-slot="{ errors }"
            >
              <div class="col-sm-3 col-lg-2 pr-0">
                <label for="email">Email信箱</label>
              </div>
              <div class="col-sm-9 col-lg-10">
                <input
                  type="email"
                  class="form-control"
                  v-model="tempAppointment.email"
                  id="email"
                  name="Email信箱"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="offset-sm-3 offset-lg-2 col-sm-9 col-lg-10">
                <span class="text-danger">{{ errors[0] }}</span>
              </div>
            </validation-provider>

            <validation-provider
              class="form-group row no-gutters align-items-center"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="col-sm-3 col-lg-2 pr-0">
                <label for="tel">手機號碼</label>
              </div>
              <div class="col-sm-9 col-lg-10">
                <input
                  type="tel"
                  class="form-control"
                  name="手機號碼"
                  v-model="tempAppointment.phone"
                  id="tel"
                />
              </div>
              <div class="offset-sm-3 offset-lg-2 col-sm-9 col-lg-10">
                <span class="text-danger">{{ errors[0] }}</span>
              </div>
            </validation-provider>

            <button
              type="submit"
              :disabled="invalid"
              class="offset-sm-3 offset-lg-2 btn btn-primary px-8"
            >
              送出預約申請
            </button>
          </form>
        </validation-observer>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default {
  name: 'Appointment',
  components: {
    Navbar,
    Footer
  },

  data() {
    return {
      productID: '',
      product: '',
      tempAppointment: {
        id: '',
        category: '',
        title: '',
        date: '',
        time: '',
        name: '',
        email: '',
        phone: ''
      },
      rules: {
        date: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
        time: [{ required: true, message: '请选择时间', trigger: 'change' }]
      }
    };
  },

  methods: {
    getSingleProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/product/${vm.productID}`;
      vm.$store.dispatch('updateLoading', true);

      vm.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.$store.dispatch('updateLoading', false);
          vm.product = response.data.product;
          vm.tempAppointment.category = vm.product.category;
          vm.tempAppointment.title = vm.product.title;
        } else {
          vm.$store.dispatch('updateLoading', false);
          this.$store.commit('UPDATEMESSAGE', { message: '取得單一產品失敗', status: 'danger' });
        }
      });
    },

    sendAppointment(formName) {
      const vm = this;
      vm.tempAppointment.id = vm.generateUUID();
      const api = 'http://localhost:3000/appointments/';

      this.$refs[formName].validate((valid) => {
        if (valid) {
          vm.$http
            .post(api, vm.tempAppointment, {
              headers: {
                'Content-type': 'application/json'
              }
            })
            .then((response) => {
              if (response.status === 200 || response.status === 201) {
                this.$store.commit('UPDATEMESSAGE', { message: '已提交預約', status: 'secondary' });
              } else {
                this.$store.commit('UPDATEMESSAGE', { message: '提交預約失敗', status: 'danger' });
              }
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    getAppointment() {
      const vm = this;
      const id = '42e58b8a-2e35-46af-9543-a0173b0f8d89';
      const api = `http://localhost:3000/appointments/${id}`;

      vm.$http.get(api).then((response) => {
        if (response.status === 200 || response.status === 201) {
        } else {
        }
      });
    },

    generateUUID() {
      let d = Date.now();
      if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now();
      }
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      });
    }
  },

  created() {
    this.productID = this.$route.params.id;
    if (this.productID) {
      this.getSingleProduct();
    }
  }
};
</script>

<style lang='scss' scoped>
/deep/ .el-input__inner {
  border-radius: 0;
}
</style>
