import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import utente from './modules/utente'
import rules from './modules/rules'
import snackbar from './modules/snackbar'
import confirm from './modules/confirm'
import tipi_polizza from './modules/tipi_polizza'
import frazionamenti from './modules/frazionamenti'
import compagnie from './modules/compagnie'
import impostazioni from './modules/impostazioni'
import bus from './modules/bus'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    utente,
    rules,
    snackbar,
    confirm,
    impostazioni,
    bus,
    tipi_polizza,
    frazionamenti,
    compagnie
  },
  actions
})