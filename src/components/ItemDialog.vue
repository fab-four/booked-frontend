<template>
  <v-card flat>
    <v-row
      v-if="item"
      no-gutters
    >
      <v-img
        :src="getImage(item)"
        class="ma-0"
        gradient="to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.7)"
        height="500"
      >
        <template #placeholder>
          <Loading />
        </template>

        <Overlay
          :item="item.volumeInfo"
        />
      </v-img>
    </v-row>

    <v-row
      v-if="item && item.volumeInfo.categories"
      no-gutters
      justify="center"
    >
      <v-chip
        v-for="(category, i) in item.volumeInfo.categories.slice(0, 5)"
        :key="i"
        class="ma-1"
        color="primary"
        dark
      >
        {{ category }}
      </v-chip>
    </v-row>
    <v-row
      v-if="item"
      class="px-2 mx-0"
    >
      <v-card-title
        class="font-weight-bold text-h4 py-3"
      >
        Description
      </v-card-title>

      <v-card-text
        v-if="item.volumeInfo.description"
        class="text-h6"
        v-html="item.volumeInfo.description.slice(0, 500) + (item.volumeInfo.description.length > 500 ? '...' : '')"
      />
      <v-card-text
        v-else
        class="text-h6"
        style="white-space: pre-line;"
      >
        No description available.
      </v-card-text>
      <Ratings :item="item.volumeInfo" />
    </v-row>

    <v-row
      class="justify-space-around pb-2"
      no-gutters
    >
      <!-- <v-btn
        v-if="isAuthenticated"
        fab
        color="red"
        class="white--text mx-auto"
        @click="onClick"
      >
        <v-icon v-if="!isFavorite">
          mdi-heart
        </v-icon>
        <v-icon v-else>
          mdi-heart-off
        </v-icon>
      </v-btn> -->

      <v-btn
        fab
        color="primary"
        class="mx-auto"
        @click="
          $router.push({
            name: 'Item',
            params: { id: item.id || $route.params.id }
          })"
      >
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>
import Ratings from './Ratings';
import Loading from './Loading';
import Overlay from './Overlay';
import { mapActions, mapGetters } from 'vuex';
import { getItem } from '@/utils/helpers';
// import { cloneDeep } from 'lodash';

export default {
  name: 'ItemDialog',
  components: {
    Ratings,
    Loading,
    Overlay,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    item: {},
  }),
  computed: {
    ...mapGetters(['getImage']),
    // isFavorite() {
    //   return (this.user.favorites[this.item.type] || []).includes(
    //     this.item.id,
    //   );
    // },
    // userData() {
    //   return cloneDeep(this.user);
    // },
  },
  asyncComputed: {
    async item() {
      return getItem(this.id);
    },
  },
  methods: {
    ...mapActions(['updateUserData', 'removeFromFavorites']),
    // remove item from user favorites if there, otherwise add the item to user favorites
    onClick() {
      if (this.isFavorite) {
        this.$emit('close-dialog');
        this.userData.favorites[this.item.type].splice(
          this.userData.favorites[this.item.type].indexOf(this.item.id),
          1,
        );
        this.removeFromFavorites({ type: this.item.type, id: this.item.id });
      } else {
        if (!this.userData.favorites[this.item.type]) {
          this.userData.favorites[this.item.type] = [];
        }
        this.userData.favorites[this.item.type].push(this.item.id);
      }
      // console.log(this.userData.favorites);
      this.updateUserData({
        userData: this.userData,
        loading: false,
      });
    },
  },
};
</script>

<style scoped>
  * {
    word-break: break-word;
  }
  span {
    display: block;
  }
  /* img {
    background-size: cover;
  } */
</style>
