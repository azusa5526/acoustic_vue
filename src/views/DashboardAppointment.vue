<template>
  <div class="d-flex flex-column vh-100">
    <el-calendar v-model="value" class="m-4">
      <template v-slot:dateCell="{ data }">
        <div class="div-Calendar" @click="calendarOnClick(data)">
          <p :class="data.isSelected ? 'is-selected' : ''">
            {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : '' }}
          </p>
        </div>
      </template>
    </el-calendar>

    <div
      aria-hidden="true"
      aria-labelledby="exampleModalLabel"
      class="modal fade"
      id="editAppointmentModal"
      role="dialog"
      tabindex="-1"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>編輯預約</span>
            </h5>
            <button aria-label="Close" class="close" data-dismiss="modal" type="button">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div v-for="item in tempAppointments" :key="item.id" class="mb-5">
              <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center py-3">
                  <div class="appointmentTitle">{{ item.time }} {{ item.name }}</div>
                  <div class="appointmentEdit" v-if="item.isConfirmed === 'unchecked'">
                    <button
                      class="btn btn-sm btn-primary"
                      type="button"
                      @click="uploadAppointment(item.id, 'confirm', )"
                    >
                      確認
                    </button>
                    <button
                      class="btn btn-sm btn-danger"
                      data-dismiss="modal"
                      type="button"
                      @click="uploadAppointment(item.id, 'reject')"
                    >
                      拒絕
                    </button>
                  </div>
                </div>
                <table class="table mb-0">
                  <tbody>
                    <tr>
                      <th width="75px" class="border-right text-center p-2">型號</th>
                      <td class="p-2 pl-5">{{ item.title }}</td>
                    </tr>
                    <tr>
                      <th width="75px" class="border-right text-center p-2">日期</th>
                      <td class="p-2 pl-5">{{ item.date }}</td>
                    </tr>
                    <tr>
                      <th width="75px" class="border-right text-center p-2">時間</th>
                      <td class="p-2 pl-5">{{ item.time }}</td>
                    </tr>
                    <tr>
                      <th width="75px" class="border-right text-center p-2">狀態</th>
                      <td v-if="item.isConfirmed === 'unchecked'" class="p-2 pl-5 text-info">
                        預約處理中
                      </td>
                      <td v-if="item.isConfirmed === 'confirm'" class="p-2 pl-5 text-success">
                        預約成功
                      </td>
                      <td v-if="item.isConfirmed === 'reject'" class="p-2 pl-5 text-danger">
                        預約失敗
                      </td>
                    </tr>
                    <tr>
                      <th width="75px" class="border-right text-center">訊息</th>
                      <td>
                        <select
                          class="form-control"
                          id="messageSelect"
                          name="訊息選擇"
                          v-model="tempMessage"
                          :disabled="item.isConfirmed !== 'unchecked'"
                        >
                          <option value="">--- 請選擇 ---</option>
                          <option value="預約完成，期待您的到來">
                            預約完成，期待您的到來
                          </option>
                          <option value="預約失敗，器材或空間不足">
                            預約失敗，器材或空間不足
                          </option>
                          <option value="預約失敗，該時段預約已滿">
                            預約失敗，該時段預約已滿
                          </option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'DashboardAppointment',
  components: {},

  data() {
    return {
      value: new Date(),
      ISOValue: '',
      appointments: [],
      tempAppointments: [],
      tempAppointment: {},
      tempMessage: ''
    };
  },

  watch: {
    value() {
      this.ISOValue = this.value.toISOString();
    }
  },

  methods: {
    getAppointments() {
      const api = 'http://localhost:3000/appointments/';
      const vm = this;
      this.$store.dispatch('updateLoading', true);

      vm.$http.get(api).then((response) => {
        if (response.status === 200 || response.status === 201) {
          this.$store.dispatch('updateLoading', false);
          vm.appointments = response.data;
          vm.appointTest = vm.appointments[0];
        } else {
          this.$store.dispatch('updateLoading', false);
          this.$store.commit('UPDATEMESSAGE', { message: '取得全部預約失敗', status: 'danger' });
        }
      });
    },

    calendarOnClick(data) {
      // this.tempAppointment = Object.assign({}, appointment);
      // console.log('clickdata', data);
      this.filterAppointment(data.day);
      if (this.tempAppointments.length !== 0) {
        $('#editAppointmentModal').modal('show');
      }
    },

    filterAppointment(date) {
      const vm = this;

      vm.tempAppointments = vm.appointments.filter(function (item) {
        return (
          item.date.split('-').slice(0)[0].indexOf(date.split('-').slice(0)[0]) !== -1 &&
          item.date.split('-').slice(1)[0].indexOf(date.split('-').slice(1)[0]) !== -1 &&
          item.date.split('-').slice(2)[0].indexOf(date.split('-').slice(2)[0]) !== -1
        );
      });
    },

    uploadAppointment(appointmentID, decide) {
      const vm = this;
      const api = `http://localhost:3000/appointments/${appointmentID}`;

      vm.$http
        .patch(api, {
          isConfirmed: decide,
          message: vm.tempMessage
        })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            vm.getAppointments();
          } else {
            console.log('fail upload');
          }
        });
    }
  },

  created() {
    this.getAppointments();
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-calendar-table .el-calendar-day {
  max-height: 70px;
}

.is-selected {
  color: red;
}

.div-Calendar {
  height: 100%;
  box-sizing: border-box;
}
</style>
