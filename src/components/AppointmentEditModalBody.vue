<template>
  <div class="card mb-3">
    <div class="card-header d-flex justify-content-between align-items-center py-3">
      <div class="appointmentTitle">{{ appointment.time }} {{ appointment.name }}</div>
      <div class="appointmentEdit" v-if="appointment.isConfirmed === 'unchecked'">
        <button
          class="btn btn-sm btn-primary"
          type="button"
          @click="uploadAppointment(appointment.id, 'confirm')"
        >
          確認
        </button>
        <button
          class="btn btn-sm btn-danger"
          data-dismiss="modal"
          type="button"
          @click="uploadAppointment(appointment.id, 'reject')"
        >
          拒絕
        </button>
      </div>
    </div>
    <table class="table mb-0">
      <tbody>
        <tr>
          <th width="75px" class="border-right text-center p-2">型號</th>
          <td class="p-2 pl-5">{{ appointment.title }}</td>
        </tr>
        <tr>
          <th width="75px" class="border-right text-center p-2">日期</th>
          <td class="p-2 pl-5">{{ appointment.date }}</td>
        </tr>
        <tr>
          <th width="75px" class="border-right text-center p-2">時間</th>
          <td class="p-2 pl-5">{{ appointment.time }}</td>
        </tr>
        <tr>
          <th width="75px" class="border-right text-center p-2">狀態</th>
          <td v-if="appointment.isConfirmed === 'unchecked'" class="p-2 pl-5 text-info">
            預約處理中
          </td>
          <td v-if="appointment.isConfirmed === 'confirm'" class="p-2 pl-5 text-success">
            預約成功
          </td>
          <td v-if="appointment.isConfirmed === 'reject'" class="p-2 pl-5 text-danger">預約失敗</td>
        </tr>
        <tr>
          <th width="75px" class="border-right text-center p-2">訊息</th>
          <td v-if="appointment.isConfirmed === 'unchecked'">
            <select class="form-control" id="messageSelect" name="訊息選擇" v-model="tempMessage">
              <option value="" selected="selected">--- 請選擇 ---</option>
              <option value="預約完成，期待您的到來">預約完成，期待您的到來</option>
              <option value="預約失敗，器材或空間不足">預約失敗，器材或空間不足</option>
              <option value="預約失敗，該時段預約已滿">預約失敗，該時段預約已滿</option>
            </select>
          </td>
          <td v-else class="p-2 pl-5">
            {{ appointment.message }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AppointmentEditModalBody',
  props: ['appointment'],

  data() {
    return {
      tempMessage: ''
    };
  },

  methods: {
    ...mapActions(['getAllAppointments']),

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
            vm.getAllAppointments();
          } else {
            console.log('fail upload');
          }
        });
    }
  },

  created() {
    console.log(this.appointment);
  }
};
</script>
