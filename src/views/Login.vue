<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title class="pb-0">
      <h1>Login</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Username"
          prepend-icon="mdi-account-circle"
        />
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn @click="signUp" color="success">Register</v-btn>
      <v-btn @click="signIn" color="info" >Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
    showPassword: false,
  }),
  methods: {
    signIn: async () => {
      try {
        await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
        await this.$router.push({ name: 'Todo' });
      } catch (e) {
        console.log(e);
      }
    },
    signUp: async () => {
      try {
        await firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>

</style>
