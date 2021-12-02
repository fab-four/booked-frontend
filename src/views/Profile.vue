<template>
  <v-container
    v-if="user"
    fluid
  >
    <v-row
      justify="center"
      dense
    >
      <v-col
        :cols="outerCols"
      >
        <v-card
          fill-height
          flat
        >
          <v-card-title class="text-h4 font-weight-bold">
            Account Details
          </v-card-title>
          <v-card-text>
            <v-row dense>
              <v-col :cols="cols">
                <v-text-field
                  v-model="user.personalDetails.firstName"
                  label="First Name"
                  outlined
                />
              </v-col>
              <v-col :cols="cols">
                <v-text-field
                  v-model="user.personalDetails.lastName"
                  label="Last Name"
                  outlined
                />
              </v-col>
              <v-col :cols="cols">
                <v-text-field
                  v-model="user.personalDetails.mobile"
                  label="Mobile Number"
                  :rules="[rules.mobileNumber]"
                  outlined
                />
              </v-col>
              <v-col :cols="cols">
                <v-menu
                  v-model="showDatePicker"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      :value="formattedDate(user.personalDetails.dateOfBirth)"
                      label="Date of Birth"
                      outlined
                      v-bind="attrs"
                      readonly
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="user.personalDetails.dateOfBirth"
                    no-title
                    :show-current="false"
                    :max="new Date().toISOString().slice(0, 10)"
                    @change="showDatePicker = false"
                  />
                </v-menu>
              </v-col>
              <v-col :cols="12">
                <v-radio-group
                  v-model="user.personalDetails.sex"
                  row
                  :rules="[v => !!v || 'Item is required']"
                >
                  <v-radio
                    on-icon="mdi-gender-male"
                    label="Male"
                    value="Male"
                  />
                  <v-radio
                    on-icon="mdi-gender-female"
                    label="Female"
                    value="Female"
                  />
                  <v-radio
                    on-icon="mdi-gender-non-binary"
                    label="Other"
                    value="Other"
                  />
                </v-radio-group>
              </v-col>
            </v-row>
            <address-component :address="user.personalDetails.address" />
            <!-- <v-text-field
              v-model="password"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              outlined
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            /> -->
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn
              color="indigo darken-4 white--text"
              :loading="loading"
              :disabled="loading"
              large
              @click="onSave"
            >
              <v-icon
                left
                dark
              >
                mdi-check
              </v-icon>
              Save Changes
              <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon light>mdi-cached</v-icon>
                </span>
              </template>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { formattedDate } from '@/utils/helpers';
import AddressComponent from '@/components/AddressComponent';

export default {
  name: 'Profile',
  components: { AddressComponent },
  data() {
    return {
      rules: {
        mobileNumber: value => {
          const pattern = /(^$)|(^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$)/;
          return pattern.test(value) || 'Invalid Mobile Number';
        },
      },
      showDatePicker: false,
      // showPassword: false,
    };
  },
  computed: {
    ...mapGetters(['user', 'loading']),
    // password() {
    //   return this.user.password;
    // },
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
    outerCols() {
      let cols = 12;
      switch (this.$vuetify.breakpoint.name) {
      case 'xl':
        cols = 6;
        break;
      case 'lg':
        cols = 8;
        break;
      case 'md':
        cols = 10;
      }
      return cols;
    },
  },
  methods: {
    ...mapActions(['updateUserData']),
    formattedDate,
    onSave() {
      this.updateUserData({
        user: {
          personalDetails: this.user.personalDetails,
        }, 
      });
    },
  },
};
</script>

<style scoped>
  @import '../assets/styles.css';
</style>