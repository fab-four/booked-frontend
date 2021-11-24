<template>
  <!-- eslint-disable vue/no-v-html -->
  <v-container
    fluid
    class="px-0 py-0"
  >
    <v-card
      v-if="item && item.id"
      flat
    >
      <v-row
        no-gutters
        justify="center"
      >
        <v-col
          cols="12"
          sm="10"
          md="10"
          lg="6"
          xl="4"
          :class="[{ 'sticky': ['lg', 'xl'].includes($vuetify.breakpoint.name) }]"
        >
          <div class="d-flex flex-column align-center">
            <v-img
              :src="getImage(item)"
              class="ma-0"
              gradient="to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.7)"
              width="400px"
              height="600px"
            >
              <template #placeholder>
                <Loading />
              </template>

              <Overlay :item="item.volumeInfo" />
            </v-img>
            <Ratings :item="item.volumeInfo" />
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="10"
          md="10"
          lg="6"
          xl="8"
        >
          <div>
            <v-card-title class="font-weight-bold text-h4">
              Description
            </v-card-title>
            <v-card-text
              v-if="item.volumeInfo.description"
              class="text-h6"
              v-html="item.volumeInfo.description"
            />
            <v-card-text
              v-else
              class="text-h6"
            >
              Information not available.
            </v-card-text>
          </div>
          <div>
            <v-card-title class="font-weight-bold text-h4">
              Author(s)
            </v-card-title>
            <v-card-text
              v-if="item.volumeInfo.authors && item.volumeInfo.authors.length"
              class="text-h6"
            >
              <v-list-item
                v-for="(author, i) in item.volumeInfo.authors"
                :key="i"
              >
                <v-list-item-icon>
                  <v-icon color="black">
                    mdi-circle-medium
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-h6">
                    {{ author }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card-text>
            <v-card-text
              v-else
              class="text-h6"
            >
              Information not available.
            </v-card-text>
          </div>
          <div>
            <v-card-title class="font-weight-bold text-h4">
              Publisher
            </v-card-title>
            <v-card-text
              v-if="item.volumeInfo.publisher"
              class="text-h6"
            >
              {{ item.volumeInfo.publisher }}
            </v-card-text>
            <v-card-text
              v-else
              class="text-h6"
            >
              Information not available.
            </v-card-text>
          </div>
          <div>
            <v-card-title class="font-weight-bold text-h4">
              Language
            </v-card-title>
            <v-card-text
              v-if="item.volumeInfo.language"
              class="text-h6"
            >
              {{ languageName(item.volumeInfo.language) }}
            </v-card-text>
            <v-card-text
              v-else
              class="text-h6"
            >
              Information not available.
            </v-card-text>
          </div>
          <div>
            <v-card-title class="font-weight-bold text-h4">
              Categories
            </v-card-title>
            <v-card-text
              v-if="item.volumeInfo.categories && item.volumeInfo.categories.length"
              class="text-h6"
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
            </v-card-text>
            <v-card-text
              v-else
              class="text-h6"
            >
              Information not available.
            </v-card-text>
          </div>
          <div>
            <v-card-title class="font-weight-bold text-h4">
              Pages
            </v-card-title>
            <v-card-text
              v-if="item.volumeInfo.pageCount"
              class="text-h6"
            >
              {{ item.volumeInfo.pageCount }}
            </v-card-text>
            <v-card-text
              v-else
              class="text-h6"
            >
              Information not available.
            </v-card-text>
          </div>
          <div>
            <v-card-title class="font-weight-bold text-h4">
              Dimensions
            </v-card-title>
            <v-card-text
              v-if="item.volumeInfo.dimensions"
              class="text-h6"
            >
              {{ item.volumeInfo.dimensions.height }} x
              {{ item.volumeInfo.dimensions.width }} x
              {{ item.volumeInfo.dimensions.thickness }}
            </v-card-text>
            <v-card-text
              v-else
              class="text-h6"
            >
              Information not available.
            </v-card-text>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { getItem } from '@/utils/helpers';
import Ratings from '@/components/Ratings';
import Loading from '@/components/Loading';
import Overlay from '@/components/Overlay';

export default {
  name: 'Item',
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
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapGetters(['getImage', 'loading']),
    dialogWidth() {
      switch (this.$vuetify.breakpoint.name) {
      case 'xs':
        return this.$vuetify.breakpoint.width;
      default:
        return this.$vuetify.breakpoint.width / 2;
      }
    },
  },
  asyncComputed: {
    async item() {
      return getItem(this.id);
    },
  },
  methods: {
    ...mapActions(['setLoading']),
    languageName(code) {
      return new Intl.DisplayNames(['en'], {type: 'language'}).of(code);
    },
  },
};
</script>

<style scoped>
  * {
    word-break: break-word;
  }
  .sticky {
    position: -webkit-sticky; /* for Safari */
    position: sticky;
    top: 64px;
    align-self: flex-start; /* <-- this is the fix */
  }
  .v-image >>> .v-image__image {
    background-size: 100% 100%;
  }
</style>
