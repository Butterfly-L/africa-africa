import { createStore } from 'vuex'
import africaCountries from "../assets/scripts/africaCountries";

const state = createStore({
  state: {
    isPageLoading: false,
    isMenuOpen: true,
    africanCountries: Object.keys(africaCountries),
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
    setMenuOpen(state, value){
      state.isMenuOpen = value;
    }
  }
})

export default state;
