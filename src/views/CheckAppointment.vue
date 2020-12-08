<template>
  <div class="d-flex flex-column vh-100">
    <Navbar></Navbar>

    <div class="content">
      <div class="checkAppointment container mb-12">
        <div class="text-center py-6 py-md-8">
          <h2>預約查詢</h2>
        </div>

        <div class="row justify-content-center">
          <div class="col col-sm-10 col-md-8 col-lg-6">
            <div class="card">
              <div
                class="card-header"
                v-clipboard:copy="appointmentID"
                v-clipboard:success="onCopy"
                v-clipboard:error="onCopyError"
              >
                預約ID<br />{{ appointment.id }} (點擊複製)
              </div>
              <table class="table mb-0">
                <tbody>
                  <tr>
                    <th width="75px" class="border-right text-center">型號</th>
                    <td class="pl-5">{{ appointment.title }}</td>
                  </tr>
                  <tr>
                    <th width="75px" class="border-right text-center">日期</th>
                    <td class="pl-5">{{ appointment.date }}</td>
                  </tr>
                  <tr>
                    <th width="75px" class="border-right text-center">時間</th>
                    <td class="pl-5">{{ appointment.time }}</td>
                  </tr>
                  <tr>
                    <th width="75px" class="border-right text-center">狀態</th>
                    <td v-if="appointment.isConfirmed === 'unchecked'" class="pl-5 text-info">
                      預約處理中
                    </td>
                    <td v-if="appointment.isConfirmed === 'confirm'" class="pl-5 text-success">
                      預約成功
                    </td>
                    <td v-if="appointment.isConfirmed === 'reject'" class="pl-5 text-danger">
                      預約失敗
                    </td>
                  </tr>
                  <tr>
                    <th width="75px" class="border-right text-center">訊息</th>
                    <td v-if="appointment.isConfirmed === 'unchecked'" class="pl-5">
                      距預約日期24小時內若仍無回應，煩請致電詢問，謝謝！
                    </td>
                    <td v-else class="pl-5">{{ appointment.message }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
  name: 'CheckAppointment',
  components: {
    Navbar,
    Footer
  },

  data() {
    return {
      appointmentID: '',
      appointment: {
        id: '',
        category: '',
        title: '',
        date: '',
        time: '',
        name: '',
        email: '',
        phone: '',
        message: '',
        isConfirmed: ''
      }
    };
  },

  methods: {
    getAppointment() {
      const vm = this;
      const api = `http://localhost:3000/appointments/${vm.appointmentID}`;
      vm.$store.dispatch('updateLoading', true);

      vm.$http.get(api).then((response) => {
        if (response.status === 200 || response.status === 201) {
          vm.$store.dispatch('updateLoading', false);
          vm.appointment = response.data;
        } else {
          vm.$store.dispatch('updateLoading', false);
          this.$store.commit('UPDATEMESSAGE', { message: '取得預約資料錯誤', status: 'danger' });
        }
      });
    },

    onCopy(e) {
      this.$store.commit('UPDATEMESSAGE', { message: '已複製ID至剪貼簿', status: 'secondary' });
    },

    onCopyError(e) {
      this.$store.commit('UPDATEMESSAGE', { message: '複製ID失敗', status: 'secondary' });
    }
  },

  created() {
    this.appointmentID = this.$route.params.appointmentID;
    this.getAppointment();
  }
};
</script>
