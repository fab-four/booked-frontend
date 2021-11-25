<template>
  <v-card
    v-if="item && item.id"
    class="my-1"
    :width="width"
    :height="height"
    style="cursor: pointer;"
  >
    <v-img
      :src="getImage(item)"
      gradient="to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.7)"
      :width="width"
      :height="height"
      @click.stop="dialog = true"
    >
      <template #placeholder>
        <Loading />
      </template>

      <div class="d-flex fill-height justify-end flex-column white--text">
        <div
          cols="12"
          class="overlay-text px-2 text-h5"
        >
          {{ item.volumeInfo.title.slice(0, 50) + (item.volumeInfo.title.length > 50 ? '...' : '') }}
        </div>
      </div>
    </v-img>

    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        :width="dialogWidth"
      >
        <ItemDialog
          :id="item.id"
          @close-dialog="dialog = false"
        />
      </v-dialog>
    </v-row>
  </v-card>
</template>

<script>
import ItemDialog from './ItemDialog';
import Loading from './Loading';
import { mapGetters } from 'vuex';
import { getItem } from '@/utils/helpers';

export default {
  name: 'ItemCard',
  components: {
    ItemDialog,
    Loading,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '0',
    },
    height: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      dialog: false,
      item: {},
    };
  },
  computed: {
    ...mapGetters(['getImage']),
    dialogWidth() {
      switch (this.$vuetify.breakpoint.name) {
      case 'xs':
        return this.$vuetify.breakpoint.width;
      case 'sm':
        return this.$vuetify.breakpoint.width / 1.5;
      default:
        return this.$vuetify.breakpoint.width / 2;
      }
    },
  },
  asyncComputed: {
    async item() {
      return await getItem(this.id);
    },
  },
};
</script>

<style scoped>
  .title,
  .subtitle-1 {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .v-image >>> .v-image__image {
    background-size: 100% 100%;
  }

  .overlay-text {
    word-break: break-word;
    text-align: left;
    color: white;
    font-style: oblique;
    font-weight: 600;
  }
</style>
