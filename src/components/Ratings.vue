<template>
  <div>
    <v-card-title class="font-weight-bold text-h4">
      Ratings
    </v-card-title>

    <v-card-text v-if="item.averageRating && item.ratingsCount">
      <v-rating
        v-model="item.averageRating"
        length="5"
        background-color="grey darken-1"
        color="yellow darken-3"
        small
        readonly
        dense
        half-increments
      />
      {{ item.ratingsCount }} votes
    </v-card-text>
    <v-card-text
      v-else
      class="text-h6"
    >
      Information not available.
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: 'Ratings',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style></style>