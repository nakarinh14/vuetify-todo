<template>
  <v-expand-transition>
    <div v-show="view">
      <v-card-text>
        <v-divider></v-divider>
        <v-hover v-slot="{ hover }">
          <v-container>
            <v-row
              align="center"
              v-for="(subtask, sub_idx) in subtask"
              :key="`${parent}-${sub_idx}`"
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
              <span
                v-if="editing !== `${parent}-${sub_idx}`"
                @click="startEdit(subtask.text, parent, sub_idx)"
              >
                {{subtask.text}}
              </span>
              <v-text-field
                v-else
                :value="value"
                @input="$emit('input', $event)"
                dense
                outlined
                @keyup.enter="confirmEdit(parent, sub_idx)"
                @keyup.esc="cancelEdit"
              >
              </v-text-field>
              <v-spacer></v-spacer>
              <v-btn
                :class="{ 'on-hover': hover, 'hide': !hover, 'no-hover':true }"
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
        </v-hover>
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
  props: [
    'view', 'subtask', 'parent',
    'toggleCheck', 'removeTodo', 'startEdit',
    'confirmEdit', 'cancelEdit', 'editing', 'value',
  ],
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
