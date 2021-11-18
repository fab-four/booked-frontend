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
          <v-card-title class="justify-center">
            <h3 class="text-center">
              Welcome Back! &#x1F607;
            </h3>
          </v-card-title>
          <v-form
            v-model="formValid"
            @submit.prevent="onSubmit"
          >
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

            <v-card-actions>
              <v-btn
                color="primary"
                large
                block
                type="submit"
                :disabled="!formValid || loading"
                :loading="loading"
              >
                Sign In
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                  </span>
                </template>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
        <v-footer class="justify-center text-center my-6">
          Don't have an account yet?{{ '\xa0' }}
          <strong><router-link to="/signup">Sign up</router-link></strong>
        </v-footer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'SignIn',
  data() {
    return {
      formValid: false,
      email: '',
      password: '',
      rules: {
        required: value => !!value || 'Required',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid e-mail.';
        },
      },
    };
  },
  computed: mapGetters(['error', 'loading']),
  created() {
    this.clearError();
  },
  methods: {
    ...mapActions(['clearError']),
    // onSubmit() {
    //   this.userSignIn({
    //     email: this.email,
    //     password: this.password,
    //   });
    // },
    onDismissed() {
      // console.log('Dismissed alert');
      this.clearError();
    },
  },
};
</script>

<style scoped>
  * {
    word-break: break-word;
  }
  @import '../assets/styles.css';
</style>
