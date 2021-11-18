<template>
  <v-container fluid>
    <v-row class="pa-2">
      <template v-for="(item, i) in collection">
        <v-col
          :key="i"
          xs="6"
          sm="4"
          md="3"
          lg="2"
          class="d-flex justify-center"
        >
          <ItemCard
            :item="item"
            :width="cardWidth"
            :height="cardHeight"
          />
        </v-col>
      </template>
    </v-row>
    <!-- <v-row v-else class="text-xl-h1 text-center justify-center grey--text">
      No items found
    </v-row> -->
  </v-container>
</template>

<script>
import ItemCard from '@/components/ItemCard';

export default {
  name: 'CollectionCard',
  components: {
    ItemCard,
  },
  props: {
    collection: {
      type: Array,
      default: () => [],
    },
    cardWidth: {
      type: String,
      default: '0',
    },
    cardHeight: {
      type: String,
      default: '0',
    },
  },
};
</script>
