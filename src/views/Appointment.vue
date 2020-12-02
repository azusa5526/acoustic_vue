<template>
  <div class="d-flex flex-column vh-100">
    <Navbar></Navbar>

    <div class="content">
      <div class="appointment container mb-12">
        <div class="text-center py-6 py-md-8">
          <h2>預約試聽</h2>
        </div>

        <form class="px-0 px-md-12 px-lg-13 mb-11">
          <h4 class="mb-6">預約內容</h4>

          <div class="form-group row no-gutters align-items-center">
            <div class="col-sm-3 col-lg-2">
              <label for="serviceSelect">預約項目</label>
            </div>
            <div class="col-sm-9 col-lg-10">
              <select
                class="form-control"
                id="serviceSelect"
                v-model="tempAppointment.category"
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
          </div>

          <div class="form-group row no-gutters align-items-center">
            <div class="col-sm-3 col-lg-2 pr-0">
              <label for="productName">詳細型號</label>
            </div>
            <div class="col-sm-9 col-lg-10">
              <input
                type="text"
                class="form-control"
                id="productName"
                :disabled="product !== ''"
                v-model="tempAppointment.title"
              />
            </div>
          </div>

          <div class="form-group row no-gutters align-items-center mb-12">
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
          </div>

          <h4 class="mb-6">聯絡資料</h4>

          <div class="form-group row no-gutters align-items-center">
            <div class="col-sm-3 col-lg-2 pr-0">
              <label for="name">預約人姓名</label>
            </div>
            <div class="col-sm-9 col-lg-10">
              <input
                type="text"
                class="form-control"
                v-model="tempAppointment.name"
                id="name"
                aria-describedby="emailHelp"
              />
            </div>
          </div>

          <div class="form-group row no-gutters align-items-center">
            <div class="col-sm-3 col-lg-2 pr-0">
              <label for="email">Email信箱</label>
            </div>
            <div class="col-sm-9 col-lg-10">
              <input
                type="email"
                class="form-control"
                v-model="tempAppointment.email"
                id="email"
                aria-describedby="emailHelp"
              />
            </div>
          </div>

          <div class="form-group row no-gutters align-items-center">
            <div class="col-sm-3 col-lg-2 pr-0">
              <label for="tel">手機號碼</label>
            </div>
            <div class="col-sm-9 col-lg-10">
              <input type="tel" class="form-control" v-model="tempAppointment.phone" id="tel" />
            </div>
          </div>

          <button class="offset-sm-3 offset-lg-2 btn btn-primary px-8" @click="sendAppointment()">
            送出預約申請
          </button>
          <button class="offset-sm-3 offset-lg-2 btn btn-primary px-8" @click="getAppointment()">
            查看申請
          </button>
        </form>
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
          console.log('取得單一產品失敗');
        }
      });
    },

    sendAppointment() {
      const vm = this;
      vm.tempAppointment.id = vm.generateUUID();
      const api = 'http://localhost:3000/appointments/';
      console.log('send');

      vm.$http
        .post(api, vm.tempAppointment, {
          headers: {
            'Content-type': 'application/json'
          }
        })
        .then((response) => {
          // console.log(response);
        });
    },

    getAppointment() {
      const vm = this;
      const id = '42e58b8a-2e35-46af-9543-a0173b0f8d89';
      const api = `http://localhost:3000/appointments/${id}`;

      vm.$http.get(api).then((response) => {
        console.log(response);
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
