
const state = {
    menu_dialog_model: false,
    tipo_polizza_icona: 'open_in_new'
  }
  
  // mutations
  const mutations = {
    menu_dialog_model (state,menu_dialog_model) {
        state.menu_dialog_model = menu_dialog_model
    },
    tipo_polizza_icona (state,tipo_polizza_icona) {
      state.tipo_polizza_icona = tipo_polizza_icona
  }
  }
  
  const actions = {
  }
  
  const getters = {
    menu_dialog_model: state => { return state.menu_dialog_model },
    tipo_polizza_icona: state => { return state.tipo_polizza_icona }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  }