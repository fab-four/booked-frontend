<template>
  <v-card flat>
    <v-card-actions>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            @click="toggleAttributes"
          >
            <v-icon>{{ icon }}</v-icon>
          </v-btn>
        </template>
        <span>{{ tooltip }}</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions} from 'vuex';

export default {
  name: 'BuyerAttributes',
  props:{
    icon1: {
      type: String,
      default: '#',
    },
    icon2: {
      type: String,
      default: '#',
    },
    tooltip1: {
      type: String,
      default: '#',
    },
    tooltip2: {
      type: String,
      default: '#',
    },
    rows: {
      type: Array,
      default: () => [],
    },
    item: {
      type: Object,
      default: () => {},
    },
  },
  data : () => ({
    icon: '',
    tooltip: '',
  }),
  watch: {
    rows: {
      handler() {
        const includes = this.rows.includes(this.item.id);
        if (includes) {
          this.icon =  this.icon1;
          this.tooltip =  this.tooltip1;
        } else {
          this.icon =  this.icon2;
          this.tooltip =  this.tooltip2;
        }
        // api call to send store data to DB
      },
      deep: true,
    },
  },
  created () {
    this.initialize();
  },
  methods:{
    ...mapActions(['updateUserData']),

    initialize() {
      let includes = this.rows.includes(this.item.id);
      this.icon =  includes ? this.icon1 : this.icon2;
      this.tooltip =  includes ? this.tooltip1 : this.tooltip2;
    },
    toggleAttributes() {
      let index = this.rows.indexOf(this.item.id);
      if (index == -1) {
        this.rows.push(this.item.id);
      } else {
        this.rows.splice(index, 1);
      }
    },
  },
};
</script>

<style>

</style>