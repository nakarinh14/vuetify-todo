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
      <v-btn @click="() => redirectAction(signUp)" color="success">Register</v-btn>
      <v-btn @click="() => redirectAction(signIn)" color="info" >Login</v-btn>
      <v-btn @click="() => redirectAction(signInWithGoogle)">Sign in with Google</v-btn>
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
  created() {
    firebase.auth().signOut();
  },
  methods: {
    async redirectAction(authAction) {
      try {
        await authAction();
        await this.$router.push({ name: 'Todo' });
      } catch (e) {
        this.errorMessage = e.message;
      }
    },
    async signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      await firebase.auth().signInWithPopup(provider);
    },
    async signIn() {
      await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
    },
    async signUp() {
      await firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
    },
  },
};
</script>
