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
                <div class="card-header d-flex justify-content-between align-items-center">
                  <div class="appointmentTitle">{{ item.time }} {{ item.name }}</div>
                  <div class="appointmentEdit" v-if="item.isConfirmed === 'unchecked'">
                    <button
                      class="btn btn-sm btn-primary"
                      type="button"
                      @click="uploadAppointment(item.id, 'confirm')"
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
                <ul class="list-group list-group-flush">
                  <li class="list-group-item py-3">預約型號 {{ item.title }}</li>
                  <li class="list-group-item py-3">手機號碼 {{ item.phone }}</li>
                  <li class="list-group-item py-3">電子信箱 {{ item.email }}</li>
                  <li class="list-group-item py-3">
                    預約狀態
                    <span class="text-success" v-if="item.isConfirmed === 'confirm'">預約成功</span>
                    <span class="text-danger" v-if="item.isConfirmed === 'reject'">婉拒預約</span>
                    <span class="text-info" v-if="item.isConfirmed === 'unchecked'">尚未查看</span>
                  </li>
                </ul>
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
      tempAppointment: {}
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
          isConfirmed: decide
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
