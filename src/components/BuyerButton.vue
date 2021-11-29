<template>
  <v-card flat>
    <v-card-actions class="justify-center">
      <v-btn
        fab
        color="red"
        class="white--text mx-5"
        @click="updateFavorite"
      >
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-icon
              v-if="!favorite"
              v-on="on"
            >
              mdi-heart
            </v-icon>
        
            <v-icon
              v-else
              v-on="on"
            >
              mdi-heart-off
            </v-icon>
          </template>
          <span>{{ favoriteText }}</span>
        </v-tooltip>
      </v-btn>
      <v-btn
        fab
        color="indigo"
        class="white--text mx-5"
        @click="updateMark"
      >
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-icon
              v-if="!toRead && !read"
              v-on="on"
            >
              mdi-bookmark-plus
            </v-icon>
            <v-icon
              v-else-if="!read"
              v-on="on"
            >
              mdi-bookmark-check
            </v-icon>
            <v-icon
              v-else
              v-on="on"
            >
              mdi-bookmark-off
            </v-icon>
          </template>
          <span>{{ markText }}</span>
        </v-tooltip>
      </v-btn>
      <v-btn
        fab
        color="red"
        class="white--text mx-5"
        @click="updateCart"
      >
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-icon
              v-if="!cart"
              v-on="on"
            >
              mdi-cart-plus
            </v-icon>
        
            <v-icon
              v-else
              v-on="on"
            >
              mdi-cart-minus
            </v-icon>
          </template>
          <span>{{ cartText }}</span>
        </v-tooltip>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { getItem } from '@/utils/helpers';

export default {
  name: 'BuyerButton',
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data: () => ({}),
  computed: {
    ...mapGetters(['user']),
    favorite() {
      if (this.item) {
        return !!this.user.buyer.favourites.filter(obj => obj === this.item.id).length;
      }
      return false;
    },
    cart() {
      if (this.item) {
        return !!this.user.buyer.cart.filter(obj => obj === this.item.id).length;
      }
      return false;
    },
    toRead() {
      if (this.item) {
        return !!this.user.buyer.toRead.filter(obj => obj === this.item.id).length;
      }
      return false;
    },
    read() {
      if (this.item) {
        return !!this.user.buyer.read.filter(obj => obj === this.item.id).length;
      }
      return false;
    },
    favoriteText() {
      if (this.favorite)
        return 'Remove from Favorites';
      return 'Add to Favorites';
    },
    cartText() {
      if (this.cart)
        return 'Remove from cart';
      return 'Add to cart';
    },
    markText() {
      if (!this.toRead && !this.read)
        return 'Mark as To Read';
      else if (this.toRead)
        return 'Mark as Read';
      return 'Remove bookmark';
    },
  },
  asyncComputed: {
    async item() {
      return await getItem(this.id);
    },
  },
  methods: {
    ...mapActions(['updateUserData']),
    updateFavorite() {
      if (this.favorite)
        this.user.buyer.favourites = this.user.buyer.favourites.filter(obj => obj !== this.item.id);
      else
        this.user.buyer.favourites.push(this.item.id);
      this.updateUserData({
        user: {
          buyer: {
            favourites: this.user.buyer.favourites,
          },
        },
      });
    },
    updateCart() {
      if (this.cart)
        this.user.buyer.cart = this.user.buyer.cart.filter(obj => obj !== this.item.id);
      else
        this.user.buyer.cart.push(this.item.id);
      this.updateUserData({
        user: {
          buyer: {
            cart: this.user.buyer.cart,
          },
        },
      });
    },
    updateMark() {
      if (this.toRead) {
        this.user.buyer.toRead = this.user.buyer.toRead.filter(obj => obj !== this.item.id);
        this.user.buyer.read.push(this.item.id);
      }
      else if (this.read) {
        this.user.buyer.read = this.user.buyer.read.filter(obj => obj !== this.item.id);
      }
      else {
        this.user.buyer.toRead.push(this.item.id);
      }
      this.updateUserData({
        user: {
          buyer: {
            toRead: this.user.buyer.toRead,
            read: this.user.buyer.read,
          },
        },
      });
    },
  },
};
</script>

<style>

</style>