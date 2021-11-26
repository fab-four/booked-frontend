<template>
  <div
    v-if="notification.msg.length"
    class="notification-bar"
    :class="notificationTypeClass"
  >
    <v-alert
      :type="notification.success ? 'success' : 'error'"
      dismissible
    >
      {{ notification.msg }}
    </v-alert>
  </div>
</template>
    
<script>
import { mapActions } from 'vuex';
export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    timeout: null,
  }),
  computed: {
    notificationTypeClass() {
      return `${this.notification.success ? 'green' : 'red'}`;
    },
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  mounted() {
    this.timeout = setTimeout(() => this.removeNotification(this.notification), 3000);
  },
  methods: {
    ...mapActions(['removeNotification']),
  },
};
</script>    

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
  border-radius: 15px;
}
</style>