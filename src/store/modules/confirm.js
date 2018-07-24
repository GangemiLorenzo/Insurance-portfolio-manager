const state = {
    model:false,
    title:undefined,
    message:undefined,
    txt1:undefined,
    txt2:undefined,
    color1:undefined,
    color2:undefined,
    callback1:undefined,
    callback2:undefined,
    extra: undefined
  }
  
  // mutations
  const mutations = {
    model (state,payload) {state.model = payload},
    title (state,payload) {state.title = payload},
    message (state,payload) {state.message = payload},
    txt1 (state,payload) {state.txt1 = payload},
    txt2 (state,payload) {state.txt2 = payload},
    color1 (state,payload) {state.color1 = payload },
    color2 (state,payload) {state.color2 = payload},
    callback1 (state,payload) {state.callback1 = payload },
    callback2 (state,payload) {state.callback2 = payload},
    extra (state,payload) {state.extra = payload}
  }
  
  const actions = {
    create({commit,dispatch},payload) { 
        //clear all variables
        dispatch('clear')
        //set variables
        commit('title',payload.title)
        commit('message',payload.message)
        commit('txt1',payload.txt1)
        commit('txt2',payload.txt2)
        commit('color1',payload.color1)
        commit('color2',payload.color2)
        //set callbacks
        commit('callback1',payload.callback1)
        commit('callback2',payload.callback2)
        commit('extra',payload.extra)
        //turn on model to show
        commit('model',true)
    },
    clear({commit}){
        commit('title',undefined)
        commit('message',undefined)
        commit('txt1',undefined)
        commit('txt2',undefined)
        commit('color1',undefined)
        commit('color2',undefined)
        commit('callback1',undefined)
        commit('callback2',undefined)
        commit('extra',undefined)
        commit('model',false)
    }
  }

  const getters = {
    title: state => { return state.title },
    message: state => { return state.message },
    txt1: state => { return state.txt1 },
    txt2: state => { return state.txt2 },
    color1: state => { return state.color1 },
    color2: state => { return state.color2 },
    callback1: state => { return state.callback1 },
    callback2: state => { return state.callback2 },
    extra: state => { return state.extra },
    model: state => { return state.model }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  }