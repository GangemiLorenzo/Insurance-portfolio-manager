const state = {
    checkboxRule: [
        v => !!v || 'Campo richiesto'],
    passwordRule: [
        v => !!v || 'Password richiesta',
        v => (v && v.length >= 5) || 'Deve essere maggiore di 5 caratteri'],
    nameRule: [
        v => !!v || 'Campo richiesto',
        v => (v && v.length <= 15) || 'Deve essere minore di 15 caratteri'],
    emailRule: [
        v => !!v || 'E-mail richiesta',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid']
  }

  const getters = {
    checkbox: state => {
        return state.checkboxRule
      },
    password: state => {
        return state.passwordRule
      },
    name: state => {
        return state.nameRule
      },
    email: state => {
        return state.emailRule
      }
  }
  
  export default {
    namespaced: true,
    state,
    getters
  }