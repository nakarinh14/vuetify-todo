<template>
  <div>
    <v-container fluid>
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
    <Card v-if="todos"></Card>
    <v-container
      v-if="todos"
      id="btn-footer"
    >
      <v-row
        align="center"
        justify="space-around"
      >
        <v-col cols="5">
          <div class="text-center">
            <v-badge
              color="green"
              :content="activeLength()"
              dark
              overlap
            >
              <v-btn
                :color="hideActive ? 'grey' : 'primary'"
                large
                @click="toggleHideActive"
              >
                ACTIVE
              </v-btn>
            </v-badge>
            <v-badge
              color="blue"
              :content="completedLength()"
              dark
              overlap
            >
              <v-btn
                :color="hideComplete ? 'grey' : 'green'"
                large
                @click="toggleHideComplete"
              >
                COMPLETED
              </v-btn>
            </v-badge>
          </div>
        </v-col>
      </v-row>
      <v-row
        align="center"
        justify="space-around"
      >
        <v-col cols="5">
          <div class="text-center">
            <v-btn
              large
              color="orange"
              outlined
              @click="onClickRemoveCompleted"
            >
              REMOVE COMPLETED
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <h2
      v-else
      class="text-center grey--text"
    >
      Todo List is Empty.
    </h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Card from '@/components/Card.vue';
import { filterKeyByIsDone } from '@/utils/formatTodo';

export default {
  name: 'Todo',
  components: { Card },
  data: () => ({
    newTodo: '',
  }),
  methods: {
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
    activeLength() {
      return String(filterKeyByIsDone(this.todos, false).length);
    },
    completedLength() {
      return String(filterKeyByIsDone(this.todos, true).length);
    },
    toggleHideComplete() {
      this.configRef.transaction((config) => {
        config.hideComplete = !config.hideComplete;
        return config;
      });
    },
    toggleHideActive() {
      this.configRef.transaction((config) => {
        config.hideActive = !config.hideActive;
        return config;
      });
    },
    onClickRemoveCompleted() {
      this.todoRef.transaction((todo) => {
        Object.keys(todo).forEach((c) => {
          if (todo[c].isDone) {
            todo[c] = null;
          }
        });
        return todo;
      });
    },
  },
  computed: {
    ...mapGetters({
      todos: 'todo/todos',
      todoRef: 'todo/todosRef',
      configRef: 'todo/configRef',
      hideComplete: 'todo/hideComplete',
      hideActive: 'todo/hideActive',
    }),
  },
};

</script>

<style scoped>
#btn-footer {
  margin-top: 30px;
}

#btn-footer span {
  margin-left: 15px;
  margin-right: 15px;
}
</style>
