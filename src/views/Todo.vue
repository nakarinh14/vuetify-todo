<template>
  <div>
    <v-container>
      <v-row
        align="center"
        justify="space-around"
      >
        <v-col cols="8">
          <v-text-field
            v-model.trim="newTodo"
            label="Add Todo"
            clearable
            prepend-inner-icon="mdi-clipboard-list-outline"
            @keyup.enter="addTodo"
            solo
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <Card :todoRef="todoRef"></Card>
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
    newTodo: '',
  }),
  created() {
    this.initiateRef();
  },
  methods: {
    initiateRef() {
      const { uid } = this.$store.getters['auth/user'];
      this.$store.dispatch('todo/setRef', firebase.database().ref(`/todo/${uid}`));
      this.todoRef.on('value', (snapshot) => {
        this.$store.dispatch('todo/setTodo', snapshot.val());
      });
    },
    addTodo() {
      if (this.newTodo) {
        this.todoRef.push({
          text: this.newTodo,
          isDone: false,
          date: null,
          view: false,
        });
      }
      this.newTodo = '';
    },
  },
  computed: {
    ...mapGetters({
      todos: 'todo/todos',
      todoRef: 'todo/ref',
    }),
  },
};

</script>
