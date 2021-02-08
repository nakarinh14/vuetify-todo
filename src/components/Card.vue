<template>
  <div>
    <v-container>
      <v-row
        v-for="(todo, idx) in filteredTodos"
        :key="idx"
        align="center"
        justify="space-around"
      >
        <v-col cols="6">
            <v-card
              class="todoCard"
              elevation="1"
              outlined
            >
              <v-hover v-slot="{ hover }">
                <v-card-title class="headline">
                  <v-btn
                    class="no-hover"
                    :ripple="false"
                    :color="calculateProgress(idx) === 100 ? 'green' : 'grey'"
                    @click="() => toggleCheck(idx)"
                    icon
                  >
                    <v-icon
                      large
                      left
                    >
                      mdi-check-circle
                    </v-icon>
                  </v-btn>
                  <span
                    v-if="editing !== idx"
                    @click="startEdit(todo.text, idx)"
                  >
                    {{todo.text}}
                  </span>
                  <v-text-field
                    v-else
                    v-model="editingText"
                    dense
                    outlined
                    @keyup.enter="confirmEdit(idx)"
                    @keyup.esc="cancelEdit"
                  >
                  </v-text-field>
                  <v-spacer></v-spacer>
                  <v-btn
                    :class="{ 'on-hover': hover, 'hide': !hover, 'no-hover':true }"
                    @click="() => removeTodo(idx)"
                    :ripple=false
                    color="red"
                    right
                    icon
                  >
                    <v-icon right>
                      mdi-close
                    </v-icon>
                  </v-btn>
                </v-card-title>
              </v-hover>
              <v-progress-linear
                :value="calculateProgress(idx)"
                :color="progressColor(calculateProgress(idx))"
                height="20"
              >
                <template v-slot:default="{ value }">
                  <strong>{{ Math.ceil(value) }}%</strong>
                </template>
              </v-progress-linear>
              <v-card-actions>
                <RippleIconText
                  :trigger="() => toggleDatePicker(idx)"
                  :display="parseViewDate(todo.date)"
                  :icon-color="todo.date? 'blue' : 'grey'"
                  icon-name="mdi-calendar"
                  :left="true"
                >
                </RippleIconText>
                <v-spacer></v-spacer>
                <v-btn
                  icon
                  @click="toggleExpansion(idx)"
                >
                  <v-icon>{{ todo.view ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-card-actions>
              <Subcard
                :view="todo.view"
                :subtask="todo.subtask"
                :parent="idx"
                :toggle-check="toggleCheck"
                :remove-todo="removeTodo"
                :startEdit="startEdit"
                :confirmEdit="confirmEdit"
                :cancelEdit="cancelEdit"
                :editing="editing"
                v-model="editingText"
              >
              </Subcard>
            </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog
      v-model="modal"
      width="700px"
    >
      <v-date-picker v-model="datePickerView">
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="modal = false"
        >
          Cancel
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="confirmDatePicker"
        >
          OK
        </v-btn>
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import RippleIconText from '@/components/RippleIconText.vue';
import Subcard from '@/components/Subcard.vue';
import { filterTodoByIsDone, filterKeyByIsDone } from '@/utils/formatTodo';

export default {
  name: 'Card',
  components: {
    Subcard,
    RippleIconText,
  },
  data() {
    return {
      datePickerView: null,
      dateTarget: null,
      modal: false,
      editing: null,
      editingText: '',
      showSubtasks: [],
    };
  },
  methods: {
    toggleCheck(parent, child) {
      const ref = this.todoRef.child(parent);
      /* eslint-disable no-param-reassign */
      ref.transaction((todo) => {
        if (todo) {
          const keysArr = todo.subtask ? Object.keys(todo.subtask) : [];
          if (child) {
            todo.subtask[child].isDone = !todo.subtask[child].isDone;
            const doneLength = filterKeyByIsDone(todo.subtask, true).length;
            todo.isDone = keysArr.length > 0 ? doneLength === keysArr.length : false;
          } else {
            todo.isDone = !todo.isDone;
            if (todo.subtask) {
              keysArr.forEach((c) => {
                todo.subtask[c].isDone = todo.isDone;
              });
            }
          }
        }
        return todo;
      });
    },
    toggleExpansion(key) {
      this.todoRef.child(key).transaction((todo) => {
        todo.view = !todo.view;
        return todo;
      });
    },
    toggleDatePicker(key) {
      this.dateTarget = key;
      this.datePickerView = this.todos[key].date;
      this.modal = true;
    },
    removeTodo(parent, child) {
      if (!child) {
        this.todoRef.child(parent).remove();
      } else {
        this.todoRef.child(parent).transaction((todo) => {
          const childIsDone = todo.subtask[child].isDone;
          // Include deletion of child node in length calculation
          const keysArrLength = todo.subtask ? Object.keys(todo.subtask).length - 1 : 0;
          const doneLength = filterKeyByIsDone(todo.subtask, true).length - childIsDone;
          todo.isDone = keysArrLength > 0 ? doneLength === keysArrLength : false;
          todo.subtask[child] = null;
          return todo;
        });
      }
    },
    confirmDatePicker() {
      this.modal = false;
      this.todoRef.update({
        [`${this.dateTarget}/date`]: this.datePickerView,
      });
      this.datePickerView = null;
      this.dateTarget = null;
    },
    parseViewDate(val) {
      return val || 'Set a date';
    },
    calculateProgress(key) {
      let val = 0;
      if (this.todos[key].subtask) {
        const doneLength = filterKeyByIsDone(this.todos[key].subtask, true).length;
        val = Math.ceil((doneLength / Object.keys(this.todos[key].subtask).length) * 100);
      }
      return this.todos[key].subtask ? val : this.todos[key].isDone * 100;
    },
    progressColor(progress) {
      return ['error', 'warning', 'success'][Math.floor(progress / 40)];
    },
    startEdit(text, parent, child) {
      this.editing = child ? `${parent}-${child}` : parent;
      this.editingText = text;
    },
    confirmEdit(parent, child) {
      const key = child ? `${parent}/subtask/${child}` : parent;
      this.todoRef.child(key).update({
        text: this.editingText,
      });
      this.editing = null;
      this.editingText = '';
    },
    cancelEdit() {
      this.editing = null;
      this.editingText = '';
    },
  },
  computed: {
    ...mapGetters({
      todos: 'todo/todos',
      hideComplete: 'todo/hideComplete',
      hideActive: 'todo/hideActive',
      todoRef: 'todo/todosRef',
    }),
    filteredTodos() {
      let tmp = this.todos;
      if (this.hideComplete) {
        tmp = filterTodoByIsDone(tmp, false);
      }
      if (this.hideActive) {
        tmp = filterTodoByIsDone(tmp, true);
      }
      return tmp;
    },
  },
};
</script>

<style lang="scss">
.no-hover::before {
  background-color: transparent !important;
}

.hide {
  opacity: 0;
}

.on-hover {
  opacity: 1;
}
</style>
