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

    <v-card-text class="white">
      <CollectionCard
        :collection="collection"
        card-width="200"
        card-height="300"
      />
      <div
        v-if="collection"
        class="text-center"
      >
        <v-pagination
          v-model="page"
          :length="Math.ceil(totalItems / 12)"
          :total-visible="10"
          @input="updateCollection('index')"
        />
      </div>
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
  computed: mapGetters(['collection', 'loading', 'totalItems']),
  created() {
    this.fetchCollection({
      query: this.search, 
      index: (this.page - 1) * 12,
    });
  },
  methods: {
    ...mapActions(['fetchCollection']),
    updateCollection(param) {
      if (param === 'query')
        this.page = 1;
      this.fetchCollection({
        query: this.search, 
        index: (this.page - 1) * 12,
      });
      // console.log(this.$vuetify.breakpoint.name);
    },
  },
};
</script>

<style scoped></style>
