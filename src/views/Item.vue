<template>
  <v-container
    fluid
    class="px-0 py-0"
  >
    <v-card
      v-if="item && item.key"
      flat
    >
      <v-row
        no-gutters
        justify="center"
      >
        <v-col
          cols="12"
          md="10"
          lg="4"
        >
          <v-img
            :src="getImage((item && item.covers) ? item.covers[0] : '')"
            class="ma-0"
            max-height="90vh"
            gradient="to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.7)"
          >
            <template v-slot:placeholder>
              <Loading />
            </template>

            <Overlay :item="item" />
          </v-img>
        </v-col>

        <v-col
          cols="12"
          md="10"
          lg="8"
        >
          <div v-if="item && item.description">
            <v-card-title class="font-weight-bold text-h4">
              Description
            </v-card-title>
            <v-card-text
              class="text-h6"
              style="white-space: pre-line;"
            >
              {{ item.description }}
            </v-card-text>
          </div>

          <!-- <Ratings :item="item" /> -->
        </v-col>
      </v-row>

      <!-- <v-row
        no-gutters
        justify="center"
      >
        <v-col
          cols="12"
          md="10"
          lg="6"
        >
          <div class="font-weight-bold text-h4 my-3 mx-3">
            More Info
          </div>
          <div class="my-3 mx-5">
            <div
              v-if="item.original_language"
              class="my-5"
            >
              <div class="text-h5 font-weight-bold">
                Language
              </div>
              <div class="subtitle-1 mx-2">
                {{ item.original_language }}
              </div>
            </div>

            <div
              v-if="item.genres && item.genres.length"
              class="my-5"
            >
              <div class="text-h5 font-weight-bold">
                Genres
              </div>
              <div class="subtitle-1 mx-2">
                {{ item.genres.map(e => e.name).join(', ') }}
              </div>
            </div>

            <div
              v-if="
                item.credits && item.credits.cast && item.credits.cast.length
              "
              class="my-5"
            >
              <div class="text-h5 font-weight-bold">
                Cast
              </div>
              <v-row class="px-2">
                <v-col
                  v-for="member in item.credits.cast.filter(
                    member => member.profile_path
                  )"
                  :key="member.id"
                >
                  <v-row no-gutters>
                    <v-col
                      cols="12"
                      class="pa-1 d-flex justify-center"
                    >
                      <img
                        :src="getProfilePath(member.profile_path)"
                        width="70px"
                        height="100px"
                        style="cursor: pointer;"
                        @click.stop="getActor(member.id)"
                      >
                    </v-col>

                    <v-col>
                      <div class="text-center">
                        <strong>{{ member.name }}</strong>
                      </div>
                      <div
                        v-if="member.character"
                        class="text-center"
                      >
                        as
                      </div>
                      <div
                        v-if="member.character"
                        class="text-center"
                      >
                        <i>"{{ member.character }}"</i>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>

            <div justify="center">
              <v-dialog
                v-model="dialog"
                :width="dialogWidth"
              >
                <v-btn
                  fab
                  fixed
                  right
                  bottom
                  dark
                  color="primary"
                  @click="dialog = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <ProfileDialog
                  :actor="actor"
                  @close-dialog="dialog = false"
                />
              </v-dialog>
            </div>

            <div
              v-if="item.created_by && item.created_by.length"
              class="my-5"
            >
              <div class="text-h5 font-weight-bold">
                Creator(s)
              </div>
              <div class="subtitle-1 mx-2">
                {{ item.created_by.map(e => e.name).join(', ') }}
              </div>
            </div>

            <div
              v-if="item.origin_country && item.origin_country.length"
              class="my-5"
            >
              <div class="text-h5 font-weight-bold">
                Country
              </div>
              <div class="subtitle-1 mx-2">
                {{ item.origin_country.join(', ') }}
              </div>
            </div>

            <div
              v-if="
                item.production_companies && item.production_companies.length
              "
              class="my-5"
            >
              <div class="text-h5 font-weight-bold">
                Production Companies
              </div>
              <div class="subtitle-1 mx-2">
                {{ item.production_companies.map(e => e.name).join(', ') }}
              </div>
            </div>
          </div>
        </v-col>

        <v-col
          cols="12"
          md="10"
          lg="6"
        >
          <div class="font-weight-bold text-h4 my-3 mx-3">
            Reviews
          </div>
          <div
            v-if="
              item.reviews &&
                item.reviews.results &&
                item.reviews.results.length"
          >
            <div
              v-for="review in item.reviews.results"
              :key="review.id"
              class="my-3 mx-5"
            >
              <div>
                <span class="font-weight-bold text-h6">{{
                  review.author
                }}</span>
                wrote
              </div>
              <div class="mx-2">
                {{
                  review.content.length > 200
                    ? review.content.slice(0, 200) + '...'
                    : review.content
                }}
              </div>
            </div>
          </div>
          <div v-else>
            <span
              class="font-weight-bold text-h6 my-3 mx-5"
            >No reviews available</span>
          </div>
        </v-col>
      </v-row> -->

      <!-- <v-row
        v-if="item.seasons && item.seasons.length"
        no-gutters
        justify="center"
      >
        <v-col
          cols="12"
          md="10"
        >
          <div class="font-weight-bold text-h4 my-3 mx-3">
            Seasons
          </div>

          <div class="my-3 mx-5">
            <v-expansion-panels
              tile
              popout
              color="primary"
            >
              <v-expansion-panel
                v-for="i in item.number_of_seasons"
                :key="'season' + i"
                class="rounded"
                @click="getSeason(i)"
              >
                <v-expansion-panel-header class="text-h5">
                  Season {{ i }}
                  <template v-slot:actions>
                    <v-icon x-large>
                      $expand
                    </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-container fluid>
                    <v-row class="justify-space-around">
                      <ItemCard
                        v-for="(episode, j) in season.episodes"
                        :key="j"
                        :item="episode"
                        width="300"
                        height="200"
                      />
                    </v-row>
                  </v-container>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </v-col>
      </v-row> -->

      <!-- <v-row
        v-if="
          item.similar && item.similar.results && item.similar.results.length
        "
        no-gutters
        justify="center"
      >
        <v-col
          cols="12"
          md="10"
        >
          <v-expansion-panels flat>
            <v-expansion-panel>
              <v-expansion-panel-header
                class="font-weight-bold text-h4 my-3 ml-n3"
              >
                Similar
                <template v-slot:actions>
                  <v-icon x-large>
                    $expand
                  </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="px-3">
                <v-container fluid>
                  <v-row class="justify-space-around">
                    <ItemCard
                      v-for="sitem in item.similar.results"
                      :key="sitem.id"
                      :item="sitem"
                      width="200"
                      height="300"
                    />
                  </v-row>
                </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row> -->
    </v-card>
  </v-container>
</template>

<script>
// import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import { getItem } from '@/utils/helpers';
// import ItemCard from '@/components/ItemCard';
// import Ratings from '@/components/Ratings';
import Loading from '@/components/Loading';
import Overlay from '@/components/Overlay';
// import ProfileDialog from '@/components/ProfileDialog';

export default {
  name: 'Item',
  components: {
    // ItemCard,
    // Ratings,
    Loading,
    Overlay,
    // ProfileDialog,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      // item: {},
      // season: {},
      dialog: false,
      // actor: null,
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
  // created() {
  //   this.getItem();
  // },
  methods: {
    ...mapActions(['setLoading']),
    // getSeason(season) {
    //   if (season != this.season.season_number) {
    //     this.season = {};
    //     let url = api_url + this.type + '/' + this.id + '/season/' + season;
    //     this.setLoading(true);
    //     axios
    //       .get(url, {
    //         params: {
    //           api_key,
    //         },
    //       })
    //       .then(response => {
    //         if (response.status == 200) {
    //           // console.log('fetched');
    //           // console.log(response.data);
    //           this.season = response.data;
    //           this.setLoading(false);
    //         }
    //       })
    //       .catch(error => {
    //         console.log(error);
    //         this.setLoading(false);
    //       });
    //   }
    // },

    // getItem() {
    //   // if (true) {
    //   this.item = {};
    //   this.season = {};
    //   let url = api_url + this.type + '/' + this.id;
    //   // console.log(url);
    //   this.setLoading(true);
    //   axios
    //     .get(url, {
    //       params: {
    //         api_key,
    //         append_to_response: 'credits,similar,reviews',
    //       },
    //     })
    //     .then(response => {
    //       if (response.status == 200) {
    //         // console.log('fetched');
    //         // console.log(response.data);
    //         if (response.data.similar && response.data.similar.results) {
    //           response.data.similar.results.map(
    //             obj => (obj['type'] = this.type),
    //           );
    //         }
    //         this.item = response.data;
    //         this.setLoading(false);
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       this.setLoading(false);
    //     });
    //   // }
    // },

    // getActor(id) {
    //   let url = api_url + 'person/' + id;
    //   // console.log(url);
    //   this.setLoading(true);
    //   axios
    //     .get(url, {
    //       params: {
    //         api_key,
    //       },
    //     })
    //     .then(response => {
    //       // console.log(response.data);
    //       if (response.status == 200) {
    //         this.actor = response.data;
    //         this.dialog = true;
    //         this.setLoading(false);
    //       } else {
    //         // console.log('failed');
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       this.setLoading(false);
    //     });
    // },
  },
};
</script>

<style scoped>
  * {
    word-break: break-word;
  }
</style>
