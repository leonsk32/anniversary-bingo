import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dates: [['', '', ''], ['', '', ''], ['', '', '']],
  },
  mutations: {
    setDates(state, dates: string[][]) {
      state.dates = dates;
    },
  },
  getters: {
    getDates(state) {
      return state.dates;
    },
  },
  actions: {
  },
  modules: {
  },
});
