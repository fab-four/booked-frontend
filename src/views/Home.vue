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
        @keydown.enter="onUpdate()"
      />
    </v-card-title>

    <v-card-text class="white">
      <CollectionCard
        :collection="collection"
        card-width="200"
        card-height="300"
      />
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
  }),
  computed: mapGetters(['collection', 'loading']),
  created() {
    this.fetchCollection(this.search);
  },
  methods: {
    ...mapActions(['fetchCollection']),
    onUpdate() {
      this.fetchCollection(this.search);
      // console.log(this.$vuetify.breakpoint.name);
    },
  },
};
</script>

<style scoped></style>
