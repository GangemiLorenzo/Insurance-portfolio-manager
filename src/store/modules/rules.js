const state = {
    checkboxRule: [
        v => !!v || 'Campo richiesto'],
    passwordRules: [
        v => !!v || 'Password richiesta',
        v => (v && v.length >= 5) || 'Deve essere maggiore di 5 caratteri'],
    nameRules: [
        v => !!v || 'Campo richiesto',
        v => (v && v.length <= 15) || 'Deve essere minore di 15 caratteri'],
    emailRules: [
        v => !!v || 'E-mail richiesta',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid']
  }

  const getters = {
    checkbox: state => {
        return state.checkboxRule
      },
    password: state => {
        return state.passwordRules
      },
    name: state => {
        return state.nameRules
      },
    email: state => {
        return state.emailRules
      }
  }
  
  export default {
    namespaced: true,
    state,
    getters
  }