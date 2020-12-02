<template>
  <div class="d-flex flex-column vh-100">
    <el-calendar class="m-4">
      <template #dateCell="{ data }">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1).join('-') }}
        </p>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'DashboardOrder',
  components: {},

  data() {
    return {
      value: new Date()
    };
  },

  methods: {
    getAppointments() {
      const api = 'http://localhost:3000/appointments/';
      const vm = this;

      vm.$http.get(api).then((response) => {
        if (response.status === 200 || response.status === 201) {
          console.log(response.data);
        }
      });
    }
  },

  created() {
    this.getAppointments();
  }
};
</script>
