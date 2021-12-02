<template>
  <v-container
    fill-height
    fluid
  >
    <v-row justify="center">
      <v-col :cols="cols">
        <v-card flat>
          <v-card-title class="font-weight-black text-h4 justify-center">
            Register
          </v-card-title>
          <v-form
            v-model="valid"
            @submit.prevent="onSubmit"
          >
            <v-text-field
              id="email"
              v-model="email"
              prepend-inner-icon="mdi-email"
              name="email"
              label="Email"
              :rules="[rules.required, rules.email]"
              outlined
            />
            <v-text-field
              v-model="firstName"
              prepend-inner-icon="mdi-account"
              name="firstName"
              label="First Name"
              :rules="[rules.required]"
              outlined
            />
            <v-text-field
              v-model="lastName"
              prepend-inner-icon="mdi-account"
              name="lastName"
              label="Last Name"
              :rules="[rules.required]"
              outlined
            />
            <v-text-field
              id="password"
              v-model="password"
              prepend-inner-icon="mdi-lock"
              name="password"
              label="Password"
              :rules="[rules.required]"
              :type="showPassword ? 'text' : 'password'"
              outlined
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            />
            <v-text-field
              id="confirmPassword"
              v-model="confirmPassword"
              prepend-inner-icon="mdi-lock"
              name="confirmPassword"
              label="Confirm Password"
              :rules="[comparePasswords]"
              :type="showConfirmPassword ? 'text' : 'password'"
              outlined
              :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showConfirmPassword = !showConfirmPassword"
            />
            <v-radio-group
              v-model="sex"
              row
              :rules="[rules.required]"
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
            <v-checkbox v-model="isSeller">
              <template #label>
                <span>Register as a Seller</span>
              </template>
            </v-checkbox>
            <v-card-actions>
              <v-btn
                color="primary"
                large
                block
                type="submit"
                :disabled="!valid || loading"
                :loading="loading"
              >
                Sign Up
                <template #loader>
                  <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                  </span>
                </template>
              </v-btn>
            </v-card-actions>
          </v-form>

          <!-- <div class="my-6">
            <h2>OR</h2>
            <h3>Continue with...</h3>
          </div>
          <v-row justify="space-around" class="my-6">
            <v-icon color="red" large>mdi-google</v-icon>
            <v-icon color="indigo" large>mdi-facebook</v-icon>
            <v-icon color="black" large>mdi-apple</v-icon>
          </v-row> -->
        </v-card>
        <v-footer class="justify-center text-center my-6">
          Already have an account?{{ '\xa0' }}
          <strong><router-link to="/signin">Sign in</router-link></strong>
        </v-footer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'SignUp',
  data() {
    return {
      valid: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      sex: '',
      isSeller: false,
      rules: {
        required: value => !!value || 'Required',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid e-mail';
        },
      },
      showPassword: false,
      showConfirmPassword: false,
    };
  },
  computed: {
    ...mapGetters(['loading']),
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? 'Passwords do not match'
        : true;
    },
    cols() {
      let cols = 10;
      switch (this.$vuetify.breakpoint.name) {
      case 'xl':
        cols = 3;
        break;
      case 'lg':
        cols = 4;
        break;
      case 'md':
      case 'sm':
        cols = 6;
      }
      return cols;
    },
  },
  methods: {
    ...mapActions(['authenticate']),
    onSubmit() {
      // console.log('submitted');
      this.authenticate({
        path: '/auth/signUp', 
        data: {
          email: this.email,
          password: this.password,
          personalDetails: {
            firstName: this.firstName,
            lastName: this.lastName,
            sex: this.sex,
          },
          isSeller: this.isSeller,
        },
      });
    },
  },
};
</script>

<style scoped>
  @import '../assets/styles.css';
</style>
