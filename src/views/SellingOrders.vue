<template>
  <v-container>
    <v-row v-if="user.seller.sold.length">
      <template v-for="(item, i) in user.seller.sold">
        <v-col
          :key="i"
          cols="4"
        >
          <ItemCard
            :id="item.bookId"
            width="350"
            height="300"
          />
        </v-col>
        <v-col
          :key="i"
          cols="8"
        >
          <p>
            Buyer : {{ item.buyerId }}
          </p>
          <p>
            Quantity : {{ item.quantity }}
          </p>
          <p>
            Price: {{ item.price }}
          </p>
          <p>
            Date: {{ formattedDate(item.date) }}
          </p>
        </v-col>
      </template>
    </v-row>
    <v-row
      v-else
      justify="center"
    >
      <v-col
        cols="4"
      >
        <h3>No orders yet</h3>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import ItemCard from '@/components/ItemCard';
import { formattedDate } from '@/utils/helpers';

// import CollectionCard from '@/components/CollectionCard';
// import Loading from '@/components/Loading';

export default {
  name: 'SellingOrders',
  components: {
    ItemCard,
    // CollectionCard,
    // Loading,
  },
  data: () => ({
    formattedDate,
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
  },
};
</script>

<style scoped></style>
