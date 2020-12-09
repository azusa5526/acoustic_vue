<template>
  <div>
    <p>
      {{ date.split('-').slice(1).join('-') }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'CalenderText',
  components: {},
  props: ['date'],

  data() {
    return {
      haveAppointment: false
    };
  },

  methods: {
    checkAppointments() {}
  },

  computed: {
    ...mapGetters(['allAppointments'])
  },

  created() {
    this.checkAppointments();
  }
};
</script>
