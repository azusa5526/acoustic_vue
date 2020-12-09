<template>
  <div class="card mb-3 border">
    <validation-observer v-slot="{ invalid }">
      <div
        type="button"
        data-toggle="collapse"
        :data-target="'#demo' + appointment.id"
        aria-expanded="true"
        aria-controls="collapseOne"
        class="btn d-flex justify-content-between align-items-center py-3"
      >
        <div class="appointmentTitle">{{ appointment.time }} {{ appointment.name }}</div>
        <div class="appointmentEdit" v-if="appointment.isConfirmed === 'unchecked'">
          <button
            class="btn btn-sm btn-danger"
            type="button"
            @click="uploadAppointment(appointment.id)"
            :disabled="invalid"
          >
            提交預約回覆
          </button>
        </div>
        <div v-else>
          <p class="text-info m-0">預約已回覆</p>
        </div>
      </div>

      <div :id="['demo' + appointment.id]" aria-labelledby="headingOne" data-parent="#accordionExample" class="collapse table mb-0">
        <table class="w-100">
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
                接受預約
              </td>
              <td v-if="appointment.isConfirmed === 'reject'" class="p-2 pl-5 text-danger">
                婉拒預約
              </td>
            </tr>
            <tr>
              <th width="75px" class="border-right text-center p-2">訊息</th>
              <td v-if="appointment.isConfirmed === 'unchecked'">
                <validation-provider rules="required" v-slot="{ errors }">
                  <select
                    class="form-control"
                    id="messageSelect"
                    name="訊息選擇"
                    v-model="tempMessage"
                  >
                    <option value="預約成功，期待您的到來">接受預約</option>
                    <option value="預約失敗，器材或空間不足">
                      婉拒預約 -> 原由：器材或空間不足
                    </option>
                    <option value="預約失敗，該時段預約已滿">
                      婉拒預約 -> 原由：該時段預約已滿
                    </option>
                  </select>
                  <span class="text-danger">{{ errors[0] }}</span>
                </validation-provider>
              </td>
              <td v-else class="p-2 pl-5">
                {{ appointment.message }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </validation-observer>
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

    uploadAppointment(appointmentID) {
      const vm = this;
      const api = `http://localhost:3000/appointments/${appointmentID}`;
      let decide = '';

      if (this.tempMessage.split('，')[0] === '預約成功') {
        decide = 'confirm';
      } else if (this.tempMessage.split('，')[0] === '預約失敗') {
        decide = 'reject';
      }

      vm.$http
        .patch(api, {
          isConfirmed: decide,
          message: vm.tempMessage
        })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            vm.getAllAppointments();
          } else {
            this.$store.commit('UPDATEMESSAGE', { message: '修改預約失敗', status: 'danger' });
          }
        });
    }
  }
};
</script>
