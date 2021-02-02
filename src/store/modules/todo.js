import mock from '@/utils/mock';

export default {
  namespaced: true,
  state: {
    todos: mock,
    editing: null,
    descEditing: null,
  },
  mutations: {
    setTodo(state, todos) {
      if (todos) {
        state.todos = todos;
      }
    },
    pushTodos(state, val) {
      state.todos.push({
        text: val,
        isDone: false,
        desc: '',
        view: false,
      });
    },
  },
  actions: {
    setTodo({ commit }, todos) {
      commit('setTodo', todos);
    },
    pushTodos({ commit }, val) {
      commit('pushTodos', val);
    },
  },
  getters: {
    todos(state) {
      return state.todos;
    },
  },
};
