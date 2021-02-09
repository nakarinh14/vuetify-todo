<template>
  <v-app>
    <v-app-bar
      v-if="$store.getters['auth/user']"
      color="blue-grey lighten-7"
      dense
      dark
      app
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-app-bar-title>Yet Another Todo List</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        dark
      >
        ADD TODOLIST
      </v-btn>
      <AvatarProfile></AvatarProfile>
      <template v-slot:extension>
        <v-tabs
          centered
          background-color="blue-grey lighten-7"
          dark
          show-arrows
        >
          <v-tab
            v-for="i in 2"
            :key="i"
            :href="'#tab-' + i"
          >
            Item {{ i }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main class="blue-grey lighten-5">
      <v-container fluid >
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import AvatarProfile from '@/components/AvatarProfile.vue';

export default {
  name: 'App',
  components: { AvatarProfile },
};
</script>
