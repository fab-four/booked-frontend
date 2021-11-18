<template>
  <v-container
    fill-height
    fluid
  >
    <v-row
      v-if="error"
      justify="center"
    >
      <v-col sm="6">
        <app-alert
          :text="error.message"
          :type="'error'"
          @close-alert="onDismissed"
        />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col
        cols="10"
        sm="6"
        md="4"
      >
        <v-card flat>
          <v-card-title class="font-weight-black text-h4 justify-center">
            Register
          </v-card-title>
          <v-form
            v-model="formValid"
            @submit.prevent="onSubmit"
          >
            <v-text-field
              v-model="firstName"
              prepend-inner-icon="mdi-account"
              name="firstName"
              label="First Name"
              :rules="[rules.required]"
            />
            <v-text-field
              v-model="lastName"
              prepend-inner-icon="mdi-account"
              name="lastName"
              label="Last Name"
            />
            <v-text-field
              id="email"
              v-model="email"
              prepend-inner-icon="mdi-email"
              name="email"
              label="Email"
              :rules="[rules.required, rules.email]"
            />
            <v-text-field
              id="password"
              v-model="password"
              prepend-inner-icon="mdi-lock"
              name="password"
              label="Password"
              type="password"
              :rules="[rules.required]"
            />
            <v-text-field
              id="confirmPassword"
              v-model="confirmPassword"
              prepend-inner-icon="mdi-lock"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              :rules="[comparePasswords]"
            />
            <v-radio-group
              v-model="sex"
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
            </v-radio-group>
            <v-checkbox :rules="[v => !!v || 'You must agree to continue!']">
              <template v-slot:label>
                <div>I agree to the <a href="">Terms and Conditions</a></div>
              </template>
            </v-checkbox>
            <v-card-actions>
              <v-btn
                color="primary"
                large
                block
                type="submit"
                :disabled="!formValid || loading"
                :loading="loading"
              >
                Sign Up
                <template v-slot:loader>
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
      formValid: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      sex: '',
      rules: {
        required: value => !!value || 'Required',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid e-mail.';
        },
      },
      loading: false,
    };
  },
  computed: {
    ...mapGetters(['error']),
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? 'Passwords do not match'
        : true;
    },
  },
  created() {
    this.clearError();
  },
  methods: {
    ...mapActions(['clearError']),
    onSubmit() {
      // console.log('submitted');
      this.userSignUp({
        email: this.email,
        password: this.password,
        personalDetails: {
          firstName: this.firstName,
          lastName: this.lastName,
          sex: this.sex,
        },
      });
    },
    onDismissed() {
      // console.log('Dismissed alert');
      this.clearError();
    },
    userSignUp(credentials) {
      this.loading = true;
      const path = '/auth/signUp';
      this.$store.dispatch('authenticate', {path, credentials}).then((response) => {
        console.log(response);
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped>
  @import '../assets/styles.css';
</style>
