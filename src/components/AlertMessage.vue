<template>
  <div class="message-alert">
    <div
      :class="'alert-' + item.status"
      :key="i"
      class="alert alert-dismissible"
      style="border: #EAEAEA 1px solid"
      v-for="(item, i) in messages"
    >
      {{ item.message }}
      <button @click="removeMessage(i)" aria-label="Close" class="close" type="button">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AlertMessage',
  data() {
    return {
      messages: []
    };
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message,
        status,
        timestamp
      });
      this.removeMessageWithTiming(timestamp);
    },
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 4000);
    }
  },

  watch: {
    isNotice: function() {
      this.updateMessage(this.message, this.status);
    }
  },

  computed: {
    ...mapGetters(['message', 'status', 'isNotice'])
  }
};
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  min-width: 250px;
  bottom: 15px;
  right: 20px;
  z-index: 1100;
}

.alert {
  border-radius: 0;
}
</style>
