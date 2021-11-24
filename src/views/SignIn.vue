<template>
  <v-container
    fill-height
    fluid
  >
    <v-row
      v-if="error"
      justify="center"
    >
      <v-col :cols="cols">
        <app-alert
          :text="error.message"
          :type="'error'"
          @close-alert="onDismissed"
        />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col :cols="cols">
        <v-card flat>
          <v-card-title class="justify-center">
            <h3 class="text-center">
              Welcome Back! &#x1F607;
            </h3>
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

            <v-card-actions>
              <v-btn
                color="primary"
                large
                block
                type="submit"
                :disabled="!valid || loading"
                :loading="loading"
              >
                Sign In
                <template #loader>
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
      valid: false,
      email: '',
      password: '',
      rules: {
        required: value => !!value || 'Required',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid e-mail.';
        },
      },
      loading: false,
      showPassword: false,
    };
  },
  computed: {
    ...mapGetters(['error']),
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
  created() {
    this.clearError();
  },
  methods: {
    ...mapActions(['clearError', 'authenticate']),
    onSubmit() {
      this.authenticate({
        path: '/auth/signIn', 
        data: {
          email: this.email,
          password: this.password,
        },
      });
    },
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
