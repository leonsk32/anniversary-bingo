<template>
  <v-app style="padding-top: 50px">
    <v-app-bar
            color="deep-purple accent-4"
            dense
            dark
            fixed
    >
      <v-toolbar-title>Anniversary Bingo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu left>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="goToBingo">
            <v-list-item-title>Bingo</v-list-item-title>
          </v-list-item>
          <v-list-item @click="goToAdmin">
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <router-view />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import router from '@/router';

export default Vue.extend({
  name: 'App',

  components: {
  },

  methods: {
    goToBingo: () => router.push('/'),
    goToAdmin: () => router.push('/admin'),
  },
});
</script>
