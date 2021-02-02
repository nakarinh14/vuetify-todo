<template>
  <v-app>
<!--    <v-app-bar>-->
<!--      <v-spacer />-->
<!--      <v-app-bar-title>-->
<!--        <h1 class="font-weight-bold display-1">Yet Another Todo-List..</h1>-->
<!--      </v-app-bar-title>-->
<!--      <template v-slot:extension>-->
<!--        <v-tabs-->
<!--          centered-->
<!--          background-color="blue-grey lighten-7"-->
<!--          dark-->
<!--          next-icon="mdi-arrow-right-bold-box-outline"-->
<!--          prev-icon="mdi-arrow-left-bold-box-outline"-->
<!--          show-arrows-->
<!--        >-->
<!--          <v-tab>Tab 1</v-tab>-->
<!--          <v-tab>Tab 2</v-tab>-->
<!--          <v-tab>Tab 3</v-tab>-->
<!--        </v-tabs>-->
<!--      </template>-->
<!--    </v-app-bar>-->

    <v-main
      class="blue-grey lighten-5"
    >
      <v-container fluid >
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
};
</script>
<style scoped>
  .body{
    background-color: grey;
  }
</style>
