<template>
  <v-container>
    <v-row>
      <template v-for="(item, i) in user.buyer.cart">
        <v-col
          :key="i"
          cols="4"
        >
          <ItemCard
            :id="item"
            width="350"
            height="300"
          />
        </v-col>
        <v-col
          :key="i"
          cols="8"
        >
          <v-btn
            color="red"
            class="white--text mx-5"
            @click="removeFromCart(item)"
          >
            Remove from cart
          </v-btn>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';
import ItemCard from '@/components/ItemCard';
import { formattedDate } from '@/utils/helpers';

// import CollectionCard from '@/components/CollectionCard';
// import Loading from '@/components/Loading';

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
  methods: {
    ...mapActions(['updateUserData']),

    removeFromCart(item) {
      this.user.buyer.cart = this.user.buyer.cart.filter(obj => obj !== item);
      this.updateUserData({
        user: {
          buyer: {
            cart: this.user.buyer.cart,
          },
        },
      });
    },
    
  },
};
</script>

<style scoped></style>
