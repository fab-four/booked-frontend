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
      {{ item.publishedDate }}
      <!-- <span v-if="item.first_air_date">
        ({{ item.first_air_date.split('-')[0] }})
      </span>
      <span v-if="item.release_date">
        ({{ item.release_date.split('-')[0] }})
      </span> -->
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
  .overlay-text {
    word-break: break-word;
    text-align: left;
    color: white;
    font-style: oblique;
    font-weight: 600;
  }
</style>
