
const state = {
  user: undefined,
  uid: undefined,
  verificato: false,
  email: undefined,
  username: undefined,
  user_refs: undefined,
  auth_flag: false  //flag to check if the app has already checked the auth state or not
                    //once the app check the auth, this flag is set to true even if the user is not logged in
                    //Capitava che ricaricando la pagina anche se si era gia loggati veniva mostrato momentaneamente il login
                    //Questo perchè la pagina di login ancora non sapeva di essere loggata e finche non arrivava il riscontro
                    //della Auth lei aveva la priorità di essere mostrata
}

// mutations
const mutations = {
    user (state,user) {
        state.user = user
    },
    uid (state,uid) {
        state.uid = uid
    },
    verificato (state,verificato) {
        state.verificato = verificato
    },
    email (state,email) {
        state.email = email
    },
    username (state,username) {
        state.username = username
    },
    user_refs (state, ref) {
        state.user_refs = ref
    },
    auth_flag (state, auth_flag) {
        state.auth_flag = auth_flag
    }
}

const actions = {
    user ({commit, dispatch}, user) {
        if (user != undefined) {
            commit('user',user)
            commit('uid',user.uid)
            commit('verificato',user.emailVerified)
            commit('email',user.email)
            commit('username',user.displayName)
            dispatch('download_refs',user)
        }
        else {
            commit('user',undefined)
            commit('uid',undefined)
            commit('verificato',false)
            commit('email',undefined)
            commit('username',undefined)
        }
    },

    download_refs({commit, dispatch}, user) {
        let user_ref = user.db.collection('utenti').doc(user.uid)
        user_ref.get()
            .then(doc => {
                if (!doc.exists) commit('user_refs',undefined)
                else commit('user_refs',doc.data())
                //Passo la ref di là cosi posso scaricarle e settarle
                dispatch('impostazioni/download_impostazioni', doc.data()['impostazioni'], {root:true})
                dispatch('tipi_polizza/download_tipi', doc.data()['settings'].collection('tipi-di-polizza'), {root:true})
                dispatch('frazionamenti/download_frazionamenti', doc.data()['settings'].collection('frazionamenti'), {root:true})
                dispatch('compagnie/download_compagnie', doc.data()['settings'].collection('compagnie'), {root:true})
                //avvio il listeners per uploadare i cambiamenti
                dispatch('mutations_listener',{},{root:true})
            })
            .catch(err => {
                commit('user_refs',{error:true})
        })
    }
}

const getters = {
    user: state => { return state.user },
    uid: state => { return state.uid },
    verificato: state => { return state.verificato },
    email: state => { return state.email },
    username: state => { return state.username },
    user_refs: state => { return state.user_refs},
    auth_flag: state => { return state.auth_flag}
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}