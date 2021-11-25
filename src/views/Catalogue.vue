<template>
  <v-card
    flat
    tile
    class="indigo darken-3"
  >
    <v-card-text
      v-if="catalogue.length"
      class="white"
    >
      <CollectionCard
        :collection="catalogue"
        card-width="200"
        card-height="300"
      />
    </v-card-text>
    <v-card-text
      v-else
      class="text-center white title"
    >
      No items available.
    </v-card-text>
  </v-card>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import CollectionCard from '@/components/CollectionCard';
// import Loading from '@/components/Loading';

export default {
  name: 'Catalogue',
  components: {
    CollectionCard,
    // Loading
  },
  data: () => ({}),
  computed: {
    ...mapGetters(['user']),
    catalogue() {
      return this.user.seller.books.map(obj => { return { id: obj.bookId }; });
    },
  },
};
</script>

<style scoped></style>
