<template>
  <div class="d-flex flex-column vh-100">
    <el-calendar v-model="value" class="m-4">
      <template v-slot:dateCell="{ data }">
        <div>
          <div class="calendar-day">{{ data.day.split('-').slice(2).join('-') }}</div>
          <div v-for="item in appointments" :key="item.id" @click="dateClick(item)">
            <div v-if="item.date.split('-')[0].indexOf(data.day.split('-')[0]) != -1">
              <div
                v-if="
                  item.date.split('-').slice(1)[0].indexOf(data.day.split('-').slice(1)[0]) != -1
                "
              >
                <div
                  v-if="
                    item.date
                      .split('-')
                      .slice(2)[0]
                      .indexOf(data.day.split('-').slice(2).join('-')) != -1
                  "
                  
                >
                  <el-tooltip class="item" effect="dark" :content="item.time" placement="right">
                    <div class="is-selected">{{ item.time }}</div>
                  </el-tooltip>
                </div>
                <div v-else></div>
              </div>
              <div v-else></div>
            </div>
            <div v-else></div>
          </div>
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
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button aria-label="Close" class="close" data-dismiss="modal" type="button">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            即將刪除產品
            <strong class="text-danger"></strong> ( 產品一旦刪除將無法恢復 )
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger" type="button">
              <i class="fas fa-circle-notch fa-spin"></i> 刪除
            </button>
            <button class="btn btn-primary" data-dismiss="modal" type="button">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery';

export default {
  name: 'DashboardAppointment',
  components: {},

  data() {
    return {
      value: new Date(),
      ISOValue: '',
      appointments: [],
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

      vm.$http.get(api).then((response) => {
        if (response.status === 200 || response.status === 201) {
          vm.appointments = response.data;
          vm.appointTest = vm.appointments[0];
        }
      });
    },

    dateClick(appointment) {
      this.tempAppointment = Object.assign({}, appointment);
      console.log('tempAp', this.tempAppointment);
      // $('#delProductModal').modal('show');
    }
  },

  created() {
    this.getAppointments();
  }
};
</script>

<style lang='scss' scoped>
.calendar-day {
  color: #202535;
  line-height: 20px;
  font-size: 14px;
}
.is-selected {
  color: #f8a535;
  font-size: 10px;
  margin-top: 5px;
}

</style>
