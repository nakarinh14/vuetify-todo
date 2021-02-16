<template>
  <v-app>
    <v-app-bar
      v-if="$store.getters['auth/user']"
      dense
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
