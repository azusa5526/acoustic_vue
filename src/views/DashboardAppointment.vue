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
            <AppointmentEditModalBody
              v-for="item in tempAppointments"
              :appointment="item"
              :key="item.id"
            ></AppointmentEditModalBody>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import AppointmentEditModalBody from '@/components/AppointmentEditModalBody';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'DashboardAppointment',
  components: {
    AppointmentEditModalBody
  },

  data() {
    return {
      value: new Date(),
      ISOValue: '',
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
    ...mapActions(['getAllAppointments']),

    calendarOnClick(data) {
      this.filterAppointment(data.day);
      if (this.tempAppointments.length !== 0) {
        $('#editAppointmentModal').modal('show');
      }
    },

    filterAppointment(date) {
      const vm = this;

      vm.tempAppointments = vm.allAppointments.filter(function (item) {
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
            vm.getAllAppointments();
          } else {
            console.log('fail upload');
          }
        });
    }
  },

  computed: {
    ...mapGetters(['allAppointments'])
  },

  created() {
    this.getAllAppointments();
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
