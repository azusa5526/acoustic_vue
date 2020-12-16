<template>
  <div>
    <p :class="{ 'text-danger': haveAppointmentToday }">{{ date.split('-').slice(1).join('-') }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CalenderText',
  components: {},
  props: ['date'],

  data() {
    return {};
  },

  methods: {
    haveAppointmentFunction() {
      const vm = this;
      vm.haveAppointment = vm.allAppointments.some(function (item) {
        return item.date === vm.date;
      });
    }
  },

  computed: {
    ...mapGetters(['allAppointments']),
    haveAppointmentToday() {
      return this.$store.getters.filterAppointmentResult(this.date);
    }
  }
};
</script>
