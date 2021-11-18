<template>
  <v-alert
    :type="type"
    dismissible
    :value="text.length && true"
    @input="onClose"
  >
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    type: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
  methods: {
    onClose() {
      this.$emit('close-alert');
    },
  },
};
</script>
