<template>
  <v-row
    no-gutters
    class="overlay-text d-flex fill-height align-content-end white--text"
  >
    <v-col
      cols="12"
      class="title px-2 text-h5 text-lg-h4"
    >
      {{ item.title }}
    </v-col>
    <v-col
      v-if="item.subtitle"
      cols="12"
      class="px-2 subtitle-1"
    >
      {{ item.subtitle }}
    </v-col>
    <v-col
      v-if="item.publishedDate"
      cols="12"
      class="px-2 subtitle-1"
    >
      {{ formattedDate(item.publishedDate) }}
    </v-col>
  </v-row>
</template>

<script>
import { formattedDate } from '@/utils/helpers';

export default {
  name: 'Overlay',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    formattedDate,
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
  .overlay-text {
    word-break: break-word;
    text-align: left;
    color: white;
    font-style: oblique;
    font-weight: 600;
  }
</style>
