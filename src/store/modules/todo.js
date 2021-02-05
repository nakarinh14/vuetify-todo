// import mock from '@/utils/mock';

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
    setRef({ commit }, ref) {
      commit('setRef', ref);
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
