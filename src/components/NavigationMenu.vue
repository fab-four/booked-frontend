<template>
  <v-card
    flat
    class="fill-height"
  >
    <v-list v-if="isAuthenticated">
      <v-list-item>
        <v-list-item-content class="text-center">
          <v-list-item-title class="text-h6">
            {{ user.personalDetails.firstName + ' ' + user.personalDetails.lastName }}
          </v-list-item-title>
          <v-list-item-subtitle class="subtitle-1">
            {{ user.email }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    
    <v-divider />
    
    <v-list
      nav
      dense
    >
      <template v-for="item in items">
        <v-list-item
          :key="item.title"
          :to="{name: item.name}"
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

      <v-list-item
        v-if="isAuthenticated"
        @click="onSignout"
      >
        <v-list-item-action>
          <v-icon light>
            mdi-logout
          </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title> 
            Sign Out 
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  computed: mapGetters(['user', 'isAuthenticated']),
  methods: {
    ...mapActions(['userSignOut']),
    onSignout() {
      this.userSignOut();
    },
  },
};
</script>

<style scoped>
  .v-list-item {
    flex: 0;
  }
</style>
