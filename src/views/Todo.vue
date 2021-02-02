<template>
  <div>
    <v-container>
      <v-row
        align="center"
        justify="space-around"
      >
        <v-col cols="8">
          <v-text-field
            v-model="newTodo"
            label="Add Todo"
            @keyup.enter="addTodo"
            solo
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <Card todoRef="todoRef"></Card>
  </div>

</template>

<script>
import firebase from 'firebase/app';
import 'firebase/database';

import { mapGetters } from 'vuex';
import Card from '@/components/Card.vue';

export default {
  name: 'Todo',
  components: { Card },
  data: () => ({
    todoRef: null,
    newTodo: '',
  }),
  created() {
    // const user = this.$store.getters['auth/user'];
    // this.initiateRef();
  },
  methods: {
    initiateRef() {
      const { uid } = this.$store.getters['auth/user'];
      this.todoRef = firebase.database().ref(`/todo/${uid}`);
      this.todoRef.on('value', (snapshot) => {
        this.$store.dispatch('todo/setTodo', snapshot.val());
      });
    },
    addTodo() {
      if (this.newTodo) {
        const newData = {
          text: this.newTodo,
          isDone: false,
          desc: '',
          date: null,
          view: false,
        };
        this.todoRef.set([...this.$store.getters['todo/todos'], newData]);
      }
      this.newTodo = '';
    },
  },
  computed: {
    ...mapGetters({
      todos: 'todo/todos',
    }),
  },
};

</script>

<style scoped>

</style>
