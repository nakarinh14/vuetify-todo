<template>
  <v-expand-transition>
    <div v-show="view">
      <v-card-text>
        <v-divider></v-divider>
        <v-container>
          <v-row
            align="center"
            v-for="(subtask, sub_idx) in subtask"
            :key="`${parent}_${sub_idx}`"
            no-gutters
          >
            <v-btn
              :ripple="false"
              :color="subtask.isDone ? 'green' : 'grey'"
              @click="() => toggleCheck(parent, sub_idx)"
              icon
            >
              <v-icon>
                mdi-check-circle-outline
              </v-icon>
            </v-btn>
            <span>{{ subtask.text }}</span>
            <v-spacer></v-spacer>
            <v-btn
              @click="() => removeTodo(parent, sub_idx)"
              :ripple=false
              color="red"
              icon
            >
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
            <v-col cols="12">
              <v-divider></v-divider>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12">
              <RippleIconText
                id="add-sub"
                display="Add Subtask"
                icon-color="blue"
                icon-name="mdi-tooltip-plus-outline"
                :trigger="() => addSubtask(parent)"
              >
              </RippleIconText>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </div>
  </v-expand-transition>
</template>

<script>
import RippleIconText from '@/components/RippleIconText.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Subtask',
  components: { RippleIconText },
  props: ['view', 'subtask', 'parent', 'toggleCheck', 'removeTodo'],
  methods: {
    addSubtask(key) {
      const refChild = this.todoRef.child(`${key}`);
      refChild.child('subtask').push({
        text: 'New Subtask',
        isDone: false,
      });
      refChild.update({
        isDone: false,
      });
    },
  },
  computed: {
    ...mapGetters({
      todoRef: 'todo/todosRef',
    }),
  },
};
</script>
