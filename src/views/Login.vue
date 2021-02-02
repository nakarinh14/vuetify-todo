<template>
  <v-card width="550" class="mx-auto mt-5">
    <v-card-title class="pb-0">
      <h3>Login</h3>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Email"
          prepend-icon="mdi-account-circle"
          v-model="email"
        />
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          v-model="password"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
      <span class="error--text">
        {{errorMessage}}
      </span>
    </v-card-text>

    <v-divider></v-divider>
    <v-card-actions>
      <v-btn @click="signUp" color="success">Register</v-btn>
      <v-btn @click="signIn" color="info" >Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
    errorMessage: '',
    showPassword: false,
  }),
  methods: {
    async signIn() {
      try {
        await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
        await this.$router.push({ name: 'Todo' });
      } catch (e) {
        this.errorMessage = e.message;
      }
    },
    async signUp() {
      try {
        await firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
      } catch (e) {
        this.errorMessage = e.message;
      }
    },
  },
};
</script>

<style scoped>

</style>
