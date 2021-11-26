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
        color="white"
      />

      <v-spacer />
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          v-for="item in menuItems"
          :key="item.title"
          text
          dark
          :to="{name: item.name}"
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
    <NotificationContainer />
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>

<script>
import NavigationMenu from '@/components/NavigationMenu';
import { mapGetters, mapActions } from 'vuex';
import NotificationContainer from '@/components/NotificationContainer.vue';
export default {
  components: {
    NavigationMenu,
    NotificationContainer,
  },
  data() {
    return {
      appName: 'Booked',
      drawer: false,
    };
  },
  computed: {
    ...mapGetters(['user', 'isAuthenticated', 'loading']),
    ...mapGetters(['loading']),
    menuItems() {
      let menuItems = [
        { icon: 'mdi-account-plus', title: 'Sign Up', name: 'SignUp' },
        { icon: 'mdi-lock', title: 'Sign In', name: 'SignIn' },
      ];
      if (this.isAuthenticated) {
        menuItems = [
          { icon: 'mdi-account', title: 'Profile', name: 'Profile' },
        ];
        if (this.user.isSeller) {
          menuItems.push({ 
            icon: 'mdi-cart', 
            title: 'Catalogue', 
            name: 'Catalogue', 
          });
        }
        else {
          menuItems.push({ 
            icon: 'mdi-bookmark-multiple', 
            title: 'My Books', 
            name: 'Favorites', 
          });
        }
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
