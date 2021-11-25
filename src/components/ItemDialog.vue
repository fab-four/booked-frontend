<template>
  <!-- eslint-disable vue/no-v-html -->
  <v-card
    v-if="item && item.id"
    flat
  >
    <v-row no-gutters>
      <v-col class="d-flex flex-column align-center">
        <v-img
          :src="getImage(item)"
          class="ma-0"
          gradient="to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.7)"
          height="550px"
          width="400px"
        >
          <template #placeholder>
            <Loading />
          </template>

          <Overlay :item="item.volumeInfo" />
        </v-img>
      </v-col>
    </v-row>
    
    <v-row
      v-if="isAuthenticated && user.isSeller"
      justify="center"
      no-gutters
    >
      <add-item-button :id="item.id" />
    </v-row>

    <v-row
      v-if="item.volumeInfo.categories"
      no-gutters
      justify="center"
    >
      <v-chip
        v-for="(category, i) in item.volumeInfo.categories.slice(0, 5)"
        :key="i"
        class="ma-1"
        color="primary"
        dark
        label
      >
        {{ category }}
      </v-chip>
    </v-row>
    
    <v-row class="px-2 mx-0">
      <v-card-title
        class="font-weight-bold text-h4 py-3"
      >
        Description
      </v-card-title>

      <v-card-text
        v-if="item.searchInfo && item.searchInfo.description"
        class="text-h6"
        v-html="item.searchInfo.description"
      />
      <v-card-text
        v-else-if="item.volumeInfo.description"
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
import { mapGetters } from 'vuex';
import { getItem } from '@/utils/helpers';
import AddItemButton from './AddItemButton.vue';

export default {
  name: 'ItemDialog',
  components: {
    Ratings,
    Loading,
    Overlay,
    AddItemButton,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data: () => ({}),
  computed: {
    ...mapGetters(['getImage', 'user', 'isAuthenticated']),
  },
  asyncComputed: {
    async item() {
      return getItem(this.id);
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
  .v-image >>> .v-image__image {
    background-size: 100% 100%;
  }
</style>
