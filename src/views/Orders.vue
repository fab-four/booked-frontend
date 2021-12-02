<template>
  <v-card flat>
    <v-card-text v-if="orders.length">
      <v-row>
        <v-col
          v-for="(item, i) in orders"
          :key="i"
          :cols="cols"
        >
          <v-card class="ma-3">
            <v-row justify="center">
              <v-col
                cols="auto"
                class="d-flex flex-grow-1 justify-center"
              >
                <ItemCard
                  :id="item.bookId"
                  width="200"
                  height="300"
                />
              </v-col>
              <v-col
                cols="auto"
                class="d-flex flex-column flex-grow-1 align-center justify-center"
              >
                <div class="text-center">
                  <p v-if="user.isSeller">
                    Buyer : {{ item.buyerId }}
                  </p>
                  <p v-else>
                    Seller : {{ item.sellerId }}
                  </p>
                  <p>
                    Quantity : {{ item.quantity }}
                  </p>
                  <p v-if="user.isSeller">
                    Price: {{ item.price }}
                  </p>
                  <p>
                    Date: {{ formattedDate(item.date) }}
                  </p>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text
      v-else
      class="text-center title"
    >
      No orders yet.
    </v-card-text>
  </v-card>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import ItemCard from '@/components/ItemCard';
import { formattedDate } from '@/utils/helpers';


export default {
  name: 'Orders',
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
    orders() {
      if (this.user.isSeller) 
        return this.user.seller.sold;
      return this.user.buyer.bought;
    },
    cols() {
      let cols = 12;
      switch (this.$vuetify.breakpoint.name) {
      case 'xl':
      case 'lg':
        cols = 4;
        break;
      case 'md':
      case 'sm':
        cols = 6;
        break;
      }
      return cols;
    },
  },
};
</script>

<style scoped></style>
