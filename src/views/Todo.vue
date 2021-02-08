<template>
  <div>
    <v-container fluid>
      <v-row
        align="center"
        justify="end"
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
        <v-col
          cols="2"
        >
          <div class="text-center justify-center">
            <v-btn
              text
              color="primary"
              @click="onclickLogout"
            >
              LOGOUT
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <Card></Card>
    <v-container id="btn-footer">
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
    </v-container>
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
        // eslint-disable-next-line no-param-reassign
        config.hideComplete = !config.hideComplete;
        return config;
      });
    },
    toggleHideActive() {
      this.configRef.transaction((config) => {
        // eslint-disable-next-line no-param-reassign
        config.hideActive = !config.hideActive;
        return config;
      });
    },
    onclickLogout() {
      this.$router.push({ name: 'Login' });
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
