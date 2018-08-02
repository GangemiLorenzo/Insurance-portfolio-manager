
const state = {
    menu_dialog_model: false,
    tipo_polizza_icona: 'open_in_new',
    tabs: false,
    selected_tab: 0
  }
  
  // mutations
  const mutations = {
    menu_dialog_model (state,menu_dialog_model) {
        state.menu_dialog_model = menu_dialog_model
    },
    tipo_polizza_icona (state,tipo_polizza_icona) {
      state.tipo_polizza_icona = tipo_polizza_icona
    },
    tabs (state,tabs) {
      state.tabs = tabs
    },
    selected_tab (state,selected_tab) {
      state.selected_tab = selected_tab
    }
  }
  
  const actions = {
  }
  
  const getters = {
    menu_dialog_model: state => { return state.menu_dialog_model },
    tipo_polizza_icona: state => { return state.tipo_polizza_icona },
    tabs: state => { return state.tabs },
    selected_tab: state => { return state.selected_tab }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  }