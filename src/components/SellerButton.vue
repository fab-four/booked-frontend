<template>
  <v-card flat>
    <v-card-actions class="justify-center">
      <v-btn
        fab
        color="primary"
        @click="dialog = true"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-text
      v-if="sellerInfo.quantity"
      class="subtitle-1 text-center pa-0 ma-0"
    >
      {{ sellerInfo.quantity }} left in stock
    </v-card-text>
    <v-card-text
      v-else
      class="subtitle-1 text-center pa-0 ma-0"
    >
      Not available in stock
    </v-card-text>
    
    <v-dialog
      v-model="dialog"
      persistent
    >
      <v-card>
        <v-card-title>
          Update
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            @submit.prevent="updateSellerInfo"
          >
            <v-text-field
              v-model.number="price"
              label="Price"
              outlined
              dense
              :rules="[rules.positive]"
            />
            <v-text-field
              v-model.number="quantity"
              label="Quantity"
              outlined
              dense
              :rules="[rules.integerOnly]"
            />
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="error"
                text
                class="px-1"
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="success"
                type="submit"
                text
                class="px-1"
                :disabled="!valid"
              >
                Update
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { getItem } from '@/utils/helpers';

export default {
  name: 'SellerButton',
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    dialog: false,
    price: null, 
    quantity: null,
    rules: {
      positive: value => value >= 1 || 'Value should be greater than or equal to 1',
      integerOnly: value => /^[1-9]\d*$/.test(value) || 'Value should be a positive integer',
    },
    valid: false,
  }),
  computed: {
    ...mapGetters(['user']),
    sellerInfo() {
      let info = {};
      if (this.item) {
        let book = this.user.seller.books.filter(obj => obj.bookId === this.item.id);
        if (book.length) {
          info =  {
            price: book[0].price,
            quantity: book[0].quantity,
          };
        }
      }
      return info;
    },
  },
  asyncComputed: {
    async item() {
      return await getItem(this.id);
    },
  },
  watch: {
    sellerInfo: {
      deep: true,
      handler(obj) {
        this.price = obj.price;
        this.quantity = obj.quantity;
      },
    },
  },
  methods: {
    ...mapActions(['updateUserData']),
    updateSellerInfo() {
      this.dialog = false;
      let books = this.user.seller.books.filter(obj => (obj.bookId !== this.item.id));
      books.push({
        bookId: this.item.id,
        price: this.price,
        quantity: this.quantity,
      });
      this.updateUserData({
        user: {
          seller: {
            books,
          },
        },
      });
    },
    close() {
      this.dialog = false;
      this.$refs.form.resetValidation();
      this.price = this.sellerInfo.price;
      this.quantity = this.sellerInfo.quantity;
    },
  },
};
</script>

<style>

</style>