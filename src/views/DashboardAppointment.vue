<template>
  <div class="d-flex flex-column vh-100">
    <el-calendar v-model="value" class="m-4">
      <template v-slot:dateCell="{ data }">
        <div class="div-Calendar" @click="calendarOnClick(data)">
          <CalenderText :date="data.day"></CalenderText>
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
              <span class="text-white" aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="accordion" id="accordionExample">
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
  </div>
</template>

<script>
import $ from 'jquery';
import AppointmentEditModalBody from '@/components/AppointmentEditModalBody';
import CalenderText from '@/components/CalenderText';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'DashboardAppointment',
  components: {
    AppointmentEditModalBody,
    CalenderText
  },

  data() {
    return {
      value: new Date(),
      tempAppointments: []
    };
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
    }
  },

  computed: {
    ...mapGetters(['allAppointments'])
  },

  mounted() {
    document.querySelector('.el-button-group>.el-button:first-child>span').innerText = '上個月';
    document.querySelector('.el-button-group>.el-button:last-child>span').innerText = '下個月';
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
