<template>
  <div>
    <v-container>
      <v-row
        v-for="(todo, idx) in todos"
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
              <span>{{ todo.text }}</span>
              <v-spacer></v-spacer>
              <v-btn
                @click="() => removeTodo(idx)"
                :ripple = false
                color="red"
                icon
              >
                <v-icon>
                  mdi-close

                </v-icon>
              </v-btn>
            </v-card-title>
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
            <v-expand-transition>
              <div v-show="todo.view">
                <v-card-text>
                  <v-divider></v-divider>
                  <v-container>
                    <v-row
                      align="center"
                      no-gutters
                    >
                      <v-col
                        cols="12"
                        v-for="(subtask, sub_idx) in todo.subtask"
                        :key="`${idx}_${sub_idx}`"
                      >

                        <v-btn
                          :ripple="false"
                          :color="subtask.isDone ? 'green' : 'grey'"
                          @click="() => toggleCheck(idx, sub_idx)"
                          icon
                        >
                          <v-icon>
                            mdi-check-circle-outline
                          </v-icon>
                        </v-btn>
                        <span>{{ subtask.text }}</span>
                        <v-spacer></v-spacer>
                        <v-btn
                          @click="() => removeTodo(idx, sub_idx)"
                          :ripple = false
                          color="red"
                          icon
                        >
                          <v-icon>
                            mdi-close
                          </v-icon>
                        </v-btn>
                        <v-divider inset></v-divider>
                      </v-col>
                      <v-col cols="12">
                        <RippleIconText
                          id="add-sub"
                          display="Add Subtask"
                          icon-color="blue"
                          icon-name="mdi-tooltip-plus-outline"
                          :trigger="() => addSubtask(idx)"
                        >
                        </RippleIconText>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog
      v-model="modal"
      width="700px"
      persistent
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

export default {
  name: 'Card',
  components: { RippleIconText },
  props: ['todoRef'],
  data() {
    return {
      datePickerView: null,
      dateTarget: null,
      modal: false,
      editing: null,
      showSubtasks: [],
    };
  },
  methods: {
    toggleCheck(parent, child) {
      const ref = this.todoRef.child(parent);
      /* eslint-disable no-param-reassign */
      ref.transaction((todo) => {
        if (todo) {
          if (child) {
            todo.subtask[child].isDone = !todo.subtask[child].isDone;
          } else {
            const val = !todo.isDone;
            todo.isDone = val;
            if (todo.subtask) {
              Object.keys(todo.subtask).forEach((c) => {
                todo.subtask[c].isDone = val;
              });
            }
          }
        }
        return todo;
      });
    },
    toggleExpansion(key) {
      this.todoRef.child(key).update({
        view: !this.todos[key].view,
      });
    },
    toggleDatePicker(key) {
      this.dateTarget = key;
      this.datePickerView = this.todos[key].date;
      this.modal = true;
    },
    addSubtask(key) {
      this.todoRef.child(key).child('subtask').push({
        text: 'New Subtask',
        isDone: false,
      });
    },
    removeTodo(parent, child) {
      let ref = this.todoRef.child(parent);
      if (child) {
        ref = ref.child('subtask').child(child);
      }
      ref.remove();
    },
    confirmDatePicker() {
      this.modal = false;
      this.todoRef.child(this.dateTarget).update({
        date: this.datePickerView,
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
        const doneLength = Object.keys(this.todos[key].subtask)
          .filter((k) => this.todos[key].subtask[k].isDone)
          .length;
        val = Math.ceil((doneLength / Object.keys(this.todos[key].subtask).length) * 100);
      }
      return this.todos[key].subtask ? val : this.todos[key].isDone * 100;
    },
    progressColor(progress) {
      return ['error', 'warning', 'success'][Math.floor(progress / 40)];
    },
  },
  computed: {
    ...mapGetters({
      todos: 'todo/todos',
    }),
  },
};
</script>

<style lang="scss">
.no-hover::before {
  background-color: transparent !important;
}

</style>
