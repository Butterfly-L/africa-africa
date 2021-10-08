import { createStore } from 'vuex'

const state = createStore({
  state: {
    isPageLoading: false,
  },
  action:{
  },
  getters:{
  },
  mutations: {
    setLoading (state, value) {
      const body = document.querySelector('body')
      state.isPageLoading = value;
      if(state.isPageLoading) body.style.overflow ="hidden";
      if(!state.isPageLoading) body.style.overflow ="auto";
    },
  }
})

export default state;
