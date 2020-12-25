<template>
  <div class="dashboardAppointment container-fluid">
    <div class="row">
      <div class="col-lg-7 mb-4 mb-lg-0">
        <el-calendar v-model="value">
          <template v-slot:dateCell="{ data }">
            <div class="div-Calendar" @click="filterAppointment(data.day)">
              <CalenderText :date="data.day"></CalenderText>
            </div>
          </template>
        </el-calendar>
      </div>
      <div class="col-lg-5">
        <div class="card border-0">
          <div class="card-header bg-primary text-secondary">編輯列表</div>
          <div class="card-body p-0 pt-3" id="appointmentInfo">
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
import AppointmentEditModalBody from '@/components/AppointmentEditModalBody';
import CalenderText from '@/components/CalenderText';
import { mapGetters } from 'vuex';

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
    filterAppointment(date) {
      const vm = this;
      vm.tempAppointments = vm.allAppointments.filter(function (item) {
        return item.date === date;
      });
    }
  },

  computed: {
    ...mapGetters('appointments', ['allAppointments'])
  },

  mounted() {
    document.querySelector('.el-button-group>.el-button:first-child>span').innerText = '上個月';
    document.querySelector('.el-button-group>.el-button:last-child>span').innerText = '下個月';
  },

  created() {
    this.$store.dispatch('appointments/getAllAppointments');
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-calendar-table .el-calendar-day {
  max-height: 40px;

  @media screen and (min-width: 768px) {
    max-height: 60px;
  }
  @media screen and (min-width: 992px) {
    max-height: 80px;
  }
}

/deep/ .el-calendar__header {
  padding: 0;
  padding-bottom: 12px;
}

/deep/ .el-calendar__body {
  padding: 0;
}

.div-Calendar {
  height: 100%;
  box-sizing: border-box;
}
</style>
