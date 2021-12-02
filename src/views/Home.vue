<template>
  <v-card
    flat
    tile
    class="indigo darken-3"
  >
    <v-card-title>
      <v-text-field
        v-model="search"
        hide-details
        label="Search"
        prepend-inner-icon="mdi-magnify"
        solo
        @keydown.enter="updateCollection('query')"
      />
    </v-card-title>

    <v-card-text
      v-if="collectionIds.length"
      class="white"
    >
      <CollectionCard
        :collection="collectionIds"
        card-width="200"
        card-height="300"
      />
      <div class="text-center">
        <v-pagination
          v-if="!loading || collectionIds.length"
          v-model="page"
          :length="Math.min(Math.ceil(totalItems / 12), 10)"
          @input="updateCollection('pageIndex')"
        />
      </div>
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
import { mapActions, mapGetters } from 'vuex';
import CollectionCard from '@/components/CollectionCard';
// import Loading from '@/components/Loading';

export default {
  name: 'Home',
  components: {
    CollectionCard,
    // Loading
  },
  data: () => ({
    search: '',
    page: 1,
  }),
  computed: {
    ...mapGetters(['collection', 'loading', 'totalItems', 'query', 'pageIndex']),
    collectionIds() {
      return this.collection.map(obj => { return { id: obj.id }; });
    },
  },
  created() {
    this.search = this.query;
    this.page = this.pageIndex;
    this.fetchCollection({
      query: this.search, 
      pageIndex: this.page,
    });
  },
  methods: {
    ...mapActions(['fetchCollection']),
    updateCollection(param) {
      if (param === 'query')
        this.page = 1;
      this.fetchCollection({
        query: this.search, 
        pageIndex: this.page,
      });
    },
  },
};
</script>

<style scoped></style>
