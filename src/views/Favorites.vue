<template>
  <v-card
    flat
    tile
    class="indigo darken-3"
  >
    <v-card-text class="white">
      <v-row
        no-gutters
        justify="end"
      >
        <v-col :cols="cols">
          <v-select
            v-model="selectedOption"
            :items="options"
            outlined
            label="Filter"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text
      v-if="collectionIds.length"
      class="white"
    >
      <CollectionCard
        :collection="collectionIds"
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
  name: 'Favorites',
  components: {
    CollectionCard,
    // Loading
  },
  data: () => ({
    selectedOption: 'All',
    options: ['All', 'Favorites', 'To Read', 'Read', 'Bought'],
  }),
  computed: {
    ...mapGetters(['user']),
    cols() {
      let cols = 12;
      switch (this.$vuetify.breakpoint.name) {
      case 'xl':
        cols = 2;
        break;
      case 'lg':
        cols = 3;
        break;
      case 'md':
        cols = 4;
        break;
      case 'sm':
        cols = 6;
      }
      return cols;
    },
    collectionIds() {
      let books;
      switch(this.selectedOption) {
      case 'All':
        books = [
          ...this.user.buyer.favourites,
          ...this.user.buyer.toRead,
          ...this.user.buyer.read,
          ...this.user.buyer.bought.map(obj => obj.bookId),
        ];
        books = [...new Set(books)];
        break;
      
      case 'Favorites':
        books = this.user.buyer.favourites;
        break;
      
      case 'To Read':
        books = this.user.buyer.toRead;
        break;
      
      case 'Read':
        books = this.user.buyer.read;
        break;
      
      case 'Bought':
        books = this.user.buyer.bought.map(obj => obj.bookId);
        break;
      }
      return books.map(obj => { return { id: obj }; });
    },
  },
};
</script>

<style scoped></style>
