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
    setTodo(state, todos) {
      state.todos = todos;
    },
  },
  getters: {
    todo(state) {
      return state.todos;
    },
  },
};
