export default {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async setUserProfile({ commit, dispatch }, user) {
      let userData = null;

      if (user) {
        userData = {
          email: user.email,
          uid: user.uid,
        };
      }
      commit('setUser', userData);
      dispatch('todo/setRef', userData, { root: true });
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
};
