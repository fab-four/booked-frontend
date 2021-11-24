<template>
  <div v-if="item.averageRating && item.ratingsCount">
    <v-card-title class="font-weight-bold text-h4">
      Ratings
    </v-card-title>

    <v-card-text>
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