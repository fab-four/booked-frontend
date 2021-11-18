<template>
  <v-row
    no-gutters
    class="d-flex fill-height align-content-end white--text"
  >
    <v-col
      cols="12"
      class="title px-2 text-h5 text-lg-h4"
    >
      {{ item.name || item.title }}
    </v-col>

    <v-col
      cols="12"
      class="px-2 subtitle-1"
    >
      <span v-if="item.first_publish_date">
        {{ item.first_publish_date }}
      </span>
      <span v-if="item.first_air_date">
        ({{ item.first_air_date.split('-')[0] }})
      </span>
      <span v-if="item.release_date">
        ({{ item.release_date.split('-')[0] }})
      </span>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Overlay',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped>
  * {
    word-break: break-word;
  }
  .title,
  .subtitle-1 {
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
