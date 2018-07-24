import {firebase, auth, VueFire} from './firebaseInit'
import store from '@/store'

const disconnessione = ( ) => {
    auth.signOut().then(function() {
        store.dispatch('snackbar/create',{
            model: true, 
            label: 'Sei stato disconnesso',
            timeout: 3000, 
            right:true, 
            bottom:true})
      }).catch(function(error) {
        store.dispatch('snackbar/create',{
            model: true, 
            label: 'Qualcosa è andato storto',
            timeout: 3000, 
            right:true, 
            bottom:true})
      });
}

const remove = ( ) => {
    const user = store.getters['utente/user']
    user.delete().then(function() {
        store.dispatch('snackbar/create',{
            model: true, 
            label: 'Account eliminato con successo',
            timeout: 3000, 
            right:true, 
            bottom:true})
      }).catch(function(error) {
        store.dispatch('snackbar/create',{
            model: true, 
            label: 'Qualcosa è andato storto',
            timeout: 3000, 
            right:true, 
            bottom:true})
      });
}

export {disconnessione,remove}