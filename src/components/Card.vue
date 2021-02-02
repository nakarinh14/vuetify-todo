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
                :color="calculateProgress(todo) === 100 ? 'green' : 'grey'"
                icon>
                <v-icon
                  large
                  left
                >
                  mdi-check-circle
                </v-icon>
              </v-btn>
              <span>{{ todo.text }}</span>
            </v-card-title>
            <v-progress-linear
              :value="calculateProgress(todo)"
              color="purple lighten-1"
              height="20"
            >
              <template v-slot:default="{ value }">
                <strong>{{ Math.ceil(value) }}%</strong>
              </template>
            </v-progress-linear>
            <v-card-actions>
              <RippleIconText
                :trigger="()=>toggleDatePicker(todo)"
                :display="parseViewDate(todo.date)"
                :icon-color="todo.date? 'blue' : 'grey'"
                icon-name="mdi-calendar"
                :left="true"
              >
              </RippleIconText>
              <v-spacer></v-spacer>
              <v-btn
                icon
                @click="toggleExpansion(todo)"
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

                        <v-btn :ripple="false" :color="subtask.isDone ? 'green' : 'grey'" icon>
                          <v-icon>
                            mdi-check-circle-outline
                          </v-icon>
                        </v-btn>
                        {{ subtask.text }}
                        <v-divider inset></v-divider>
                      </v-col>
                      <v-col cols="12">
                        <RippleIconText
                          id="add-sub"
                          display="Add Subtask"
                          icon-color="blue"
                          icon-name="mdi-tooltip-plus-outline"
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
      expandTarget: null,
      modal: false,
      editing: null,
      showSubtasks: [],
    };
  },
  methods: {
    toggleCheck(todo) {
      console.log(todo);
      // todo.isDone = !todo.isDone;
      // if (todo.subtask) {
      //
      // }
    },
    toggleNameEdit(idx) {
      this.todos[idx].isDone = !this.todos[idx].isDone;
    },
    toggleExpansion(todo) {
      this.expandTarget = todo;
      this.expandTarget.view = !this.expandTarget.view;
    },
    toggleDatePicker(todo) {
      this.dateTarget = todo;
      this.datePickerView = todo.date;
      this.modal = true;
    },
    confirmDatePicker() {
      this.modal = false;
      this.dateTarget.date = this.datePickerView;
      this.datePickerView = null;
      this.dateTarget = null;
    },
    parseViewDate(val) {
      return val || 'Set a date';
    },
    calculateProgress(todo) {
      let val = 0;
      if (todo.subtask) {
        const doneLength = todo.subtask.filter((item) => item.isDone).length;
        val = Math.ceil((doneLength / todo.subtask.length) * 100);
      }
      return val;
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
