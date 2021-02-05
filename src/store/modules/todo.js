import firebase from 'firebase/app';
import 'firebase/database';

export default {
  namespaced: true,
  state: {
    todos: null,
    ref: null,
  },
  mutations: {
    setTodo(state, todos) {
      state.todos = todos;
    },
    setRef(state, ref) {
      state.ref = ref;
    },
  },
  actions: {
    setTodo({ commit }, todos) {
      commit('setTodo', todos);
    },
    setRef({ commit }, userData) {
      commit('setRef', userData ? firebase.database().ref(`/todo/${userData.uid}`) : null);
    },
  },
  getters: {
    todos(state) {
      return state.todos;
    },
    ref(state) {
      return state.ref;
    },
  },
};
