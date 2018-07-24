const state = {
    timeout:2000,
    top:false,
    bottom:true,
    right:true,
    left:false,
    model:false,
    label: ''
  }
  
  // mutations
  const mutations = {
    model (state,payload) {
        state.model = payload
        //console.log('model changed in: ')
        //console.log(payload)
    },
    timeout (state,payload) {
        state.timeout = payload
    },
    top(state) {
        state.top = true
        state.bottom = false
    },
    bottom (state) {
        state.top = false
        state.bottom = true
    },
    sleft(state) {
        state.left = true
        state.right = false
    },
    right (state) {
        state.left = false
        state.right = true
    },
    label (state,payload) {
        state.label = payload
    }

  }
  
  const actions = {
    create({commit},payload) { //Payload {model:true, label:'hello world', timeout:2000, top:false, right:true}
        //console.log('Snackbar commited')
        commit('label',payload.label)
        commit('timeout',payload.timeout)
        if(payload.right) commit('right')
        else commit('left')
        if(payload.top) commit('top')
        else commit('bottom')
        commit('model',payload.model)
    }
  }

  const getters = {
    timeout: state => { return state.timeout },
    top: state => { return state.top },
    bottom: state => { return state.bottom },
    right: state => { return state.right },
    left: state => { return state.left },
    model: state => { return state.model },
    label: state => { return state.label }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  }