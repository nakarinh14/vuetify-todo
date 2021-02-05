// import mock from '@/utils/mock';

export default {
  namespaced: true,
  state: {
    todos: null,
    editing: null,
    descEditing: null,
  },
  mutations: {
    setTodo(state, todos) {
      state.todos = todos;
    },
  },
  actions: {
    setTodo({ commit }, todos) {
      commit('setTodo', todos);
    },
  },
  getters: {
    todos(state) {
      return state.todos;
    },
  },
};
