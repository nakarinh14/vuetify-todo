<template>
  <v-menu
    bottom
    min-width="200px"
    rounded
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-btn
        icon
        v-on="on"
      >
        <v-avatar>
          <v-icon dark>
            mdi-account-circle
          </v-icon>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-list-item-content class="justify-center">
        <div class="mx-auto text-center">
          <p class="caption mt-1">
            {{ userProfile.email }}
          </p>
          <v-divider class="my-3"></v-divider>
          <v-btn
            depressed
            rounded
            text
            @click="onClickLogout"
          >
            LOGOUT
          </v-btn>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AvatarProfile',
  methods: {
    onClickLogout() {
      this.$router.push({ name: 'Login' });
    },
  },
  computed: {
    ...mapGetters({
      userProfile: 'auth/user',
    }),
  },
};
</script>

<style scoped>

</style>
