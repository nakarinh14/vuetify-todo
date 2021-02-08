import firebase from 'firebase/app';
import 'firebase/database';
import { sortedTodo } from '@/utils/formatTodo';

export default {
  namespaced: true,
  state: {
    todos: null,
    config: { hideComplete: false },
    todosRef: null,
    configRef: null,
  },
  mutations: {
    setTodo(state, todos) {
      state.todos = todos;
    },
    setTodosRef(state, ref) {
      state.todosRef = ref;
    },
    setConfigRef(state, ref) {
      state.configRef = ref;
    },
    setConfig(state, config) {
      state.config = config;
    },
  },
  actions: {
    setTodo({ commit }, todos) {
      commit('setTodo', sortedTodo(todos));
    },
    setConfig({ commit }, config) {
      commit('setConfig', config);
    },
    setRef({ commit, dispatch }, userData) {
      console.log('setting ref');
      if (userData) {
        console.log('user data exist');
        const todosRef = firebase.database().ref(`/todo/${userData.uid}/todos`);
        todosRef.on('value', (snapshot) => {
          dispatch('setTodo', snapshot.val());
        });
        const configRef = firebase.database().ref(`/todo/${userData.uid}/config`);
        configRef.on('value', (snapshot) => {
          // Set default config if doesn't exist yet
          if (!snapshot.exists()) {
            configRef.set({
              hideComplete: false,
              hideActive: false,
            });
          } else {
            dispatch('setConfig', snapshot.val());
          }
        });
        commit('setTodosRef', todosRef);
        commit('setConfigRef', configRef);
      } else {
        commit('setTodosRef', null);
        commit('setConfigRef', null);
      }
    },
  },
  getters: {
    todos(state) {
      return state.todos;
    },
    hideComplete(state) {
      return state.config.hideComplete;
    },
    hideActive(state) {
      return state.config.hideActive;
    },
    todosRef(state) {
      return state.todosRef;
    },
    configRef(state) {
      return state.configRef;
    },
  },
};
