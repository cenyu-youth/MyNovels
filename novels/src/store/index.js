import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    search:'',
    chapter:'',
    content:'',
    listPage:'',
    searchBack:'selected',
    readBack:'detailsPage',
    index:{success:1},
    register:1,
    user:'',
    recharge:'selected'
  },
  mutations: {
    changeContent(state,a){
      state.content = a
    },
    changeSearch(state,a){
      state.search = a
    },
    changeList(state,a){
      state.listPage = a
      state.readBack = a.location
    },
    changeSearchBack(state,a){
      state.searchBack = a
    },
    changeIndex(state,a){
      state.index = a
      // state.readBack =a.location
    },
    changeIndexSuccess(state,a){
      state.index.success = a
    },
    changeReadBack(state,a){
      state.readBack = a
    },
    changeRegister(state,a){
      state.register = a.idx
      state.user=a.user
    },
    changeRecharge(state,a){
      state.recharge = a
    },
  },
  actions: {
  },
  modules: {
  }
})
