<template>
  <v-row dense>
    <v-col cols="12">
      <v-text-field
        v-model="address.streetAddress"
        label="Address Line"
        outlined
      />
    </v-col>
    <v-col :cols="cols">
      <v-select
        v-model="address.country"
        :items="countryOptions || []"
        outlined
        label="Country"
        :prefix="flag"
        no-data-text="No countries available"
        @change="delete address.state"
      />
    </v-col>
    <v-col :cols="cols">
      <v-select
        v-model="address.state"
        :items="stateOptions || []"
        outlined
        label="State"
        :disabled="!address.country"
        no-data-text="No states available"
      />
    </v-col>
    <v-col :cols="cols">
      <v-select
        v-model="address.city"
        :items="cityOptions || []"
        outlined
        label="City"
        :disabled="!address.state"
        no-data-text="No cities available"
      />
    </v-col>
    <v-col :cols="cols">
      <v-text-field
        v-model="address.pincode"
        label="Pincode"
        outlined
      />
    </v-col>
  </v-row>
</template>

<script>
import { getCountries, getStates, getCities, getFlag } from '@/utils/helpers';
export default {
  name: 'AddressComponent',
  props: {
    address: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data: () => ({
    countryOptions: [],
    flag: '',
  }),
  computed: {
    cols() {
      let cols = 12;
      switch (this.$vuetify.breakpoint.name) {
      case 'xl':
      case 'lg':
      case 'md':
      case 'sm':
        cols = 6;
      }
      return cols;
    },
  },
  async mounted() {
    this.countryOptions = await getCountries();
    if (this.$refs.form)
      this.$refs.form.validate();
  },
  asyncComputed: {
    async stateOptions() {
      if (this.address.country)
        return await getStates(this.address.country);
      return [];
    },
    async cityOptions() {
      if (this.address.country && this.address.state)
        return await getCities(this.address.country, this.address.state);
      return [];
    },
    async flag() {
      if (this.address.country)
        return await getFlag(this.address.country);
      return '';
    },
  },
};
</script>

<style scoped>
</style>