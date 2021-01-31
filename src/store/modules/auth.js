export default {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    setUser(state, value) {
      state.user = value;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit('SET_LOGGED_IN', user);
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
};
