<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
    >
      <navigation-menu :items="menuItems" />
    </v-navigation-drawer>
    <v-app-bar
      app
      class="indigo darken-4 white--text"
    >
      <v-app-bar-nav-icon
        dark
        class="hidden-sm-and-up"
        @click.stop="drawer = !drawer"
      />
      <v-spacer />

      <v-toolbar-title>
        <router-link
          v-slot="{ href, navigate }"
          to="/"
          custom
        >
          <span
            class="header"
            :href="href"
            @click="navigate"
          >
            {{ appName }}
          </span>
        </router-link>
      </v-toolbar-title>

      <v-progress-linear
        v-if="loading"
        indeterminate
        absolute
        bottom
        height="6"
        color="black"
      />

      <v-spacer />
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          v-for="item in menuItems"
          :key="item.title"
          text
          dark
          :to="item.link"
        >
          <v-icon
            left
            dark
          >
            {{ item.icon }}
          </v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn
          v-if="isAuthenticated"
          text
          dark
          @click="onSignout"
        >
          <v-icon
            left
            dark
          >
            mdi-logout
          </v-icon>
          Sign Out
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
    <!-- <Snackbar text="Failed to logout!" v-model="showSnackbar" /> -->
  </v-app>
</template>

<script>
import NavigationMenu from '@/components/NavigationMenu';
import { mapGetters, mapActions } from 'vuex';
// import Snackbar from '@/components/Snackbar';

export default {
  components: {
    NavigationMenu,
    // Snackbar
  },
  data() {
    return {
      appName: 'Booked',
      drawer: false,
      // showSnackbar: false
    };
  },
  computed: {
    ...mapGetters(['user', 'isAuthenticated', 'loading']),
    ...mapGetters(['loading']),
    menuItems() {
      let menuItems = [
        { icon: 'mdi-account-plus', title: 'Sign Up', link: '/signup' },
        { icon: 'mdi-lock', title: 'Sign In', link: '/signin' },
      ];
      if (this.isAuthenticated) {
        menuItems = [
          { icon: 'mdi-account', title: 'Profile', link: '/profile' },
          // {
          //   icon: 'mdi-heart-multiple',
          //   title: 'Favorites',
          //   link: '/favorites',
          // },
        ];
      }
      return menuItems;
    },
  },
  methods: {
    ...mapActions(['userSignOut']),

    onSignout() {
      this.userSignOut();
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
.header {
  font-family: "Dancing Script", cursive;
  font-weight: 900;
  font-size: 3rem;
  word-break: break-word;
  cursor: pointer;
}
</style>
