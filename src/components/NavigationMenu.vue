<template>
  <v-list
    class="d-flex flex-column"
    height="100%"
  >
    <!-- <v-list-item>
      <v-list-item-avatar>
        <v-avatar
          color="orange"
          size="96"
        >
          <span class="white--text headline">X</span>
        </v-avatar>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>
          {{
            user.firstName + ' ' + user.lastName
          }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider /> -->
    <template v-for="item in items">
      <v-list-item
        :key="item.title"
        :to="item.link"
      >
        <v-list-item-action>
          <v-icon light>
            {{ item.icon }}
          </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title> {{ item.title }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <!-- <v-list-item
      v-if="isAuthenticated"
      @click="onSignout"
    >
      <v-list-item-action>
        <v-icon light>
          exit_to_app
        </v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title> Sign Out </v-list-item-title>
      </v-list-item-content>
    </v-list-item> -->
  </v-list>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex';
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  // computed: mapGetters(['user', 'isAuthenticated']),
  // methods: {
  //   ...mapActions(['userSignOut']),
  //   onSignout() {
  //     this.userSignOut();
  //   },
  // },
};
</script>

<style scoped>
  .v-list-item {
    flex: 0;
  }
</style>
