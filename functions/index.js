const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore()

exports.inizializza_db_utente = functions.auth.user().onCreate((user) => {
    console.log('Nuovo utente: ' + user.uid + ' - email: ' + user.email)
    let impostazioni_ref = db.collection('impostazioni').doc(user.uid)
    let settings_ref = db.collection('settings').doc(user.uid)
    settings_ref.set({})
    let utente_ref = db.collection('utenti').doc(user.uid)
    impostazioni_ref.set({})
    .then(()=>{
        utente_ref.set({impostazioni:impostazioni_ref})
        .then(()=>{
            console.log('Funzione completata con successo')
            return 0
        }).catch(err=>{
            console.log(err)
            return err
        })
    }).catch(err=>{
        console.log(err)
        return err
    })
});