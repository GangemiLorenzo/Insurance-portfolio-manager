
const state = {
    anagrafica: [],
    ref: undefined,
    unsubscribe: undefined
  }
  
  // mutations
  const mutations = {
    tipi(state,tipi) {
        state.tipi = tipi
    },
    ref(state,ref) {
        state.ref = ref
    },
    unsubscribe(state,unsubscribe) {
        state.unsubscribe = unsubscribe
    }
  }
  
  const actions = {
      download_tipi({commit, dispatch}, ref) {
        commit('ref',ref)
        let unsub = ref.onSnapshot(function(querySnapshot) {
            var tipi = [];
            querySnapshot.forEach(function(doc) {
                let dato = doc.data();
                dato['id'] = doc.id
                tipi.push(dato)
            })
            commit('tipi',tipi)
        })
        commit('unsubscribe',unsub)
      },
      clear_tipi({commit})
      {
        getters['unsubscribe']()
        commit('tipi',[])
      },
      remove_tipo({dispatch,getters},id)
      {
        getters['ref'].doc(id).delete().then(function() {
            dispatch('snackbar/create',{
                model: true, 
                label: 'Tipo rimosso con successo',
                timeout: 3000, 
                right:true, 
                bottom:true},{root:true})
        }).catch(function(error) {
            console.error("Error removing document: ", error)
        });
      },
      add_tipo({getters, dispatch},tipo)
      {
        getters['ref'].add({
            Nome: tipo.nome,
            Veicolo: tipo.veicolo,
            Icona: tipo.icona
        }).then(function() {
            dispatch('snackbar/create',{
                model: true, 
                label: 'Tipo aggiunto con successo',
                timeout: 3000, 
                right:true, 
                bottom:true},{root:true})
        }).catch(function(error) {
            console.error("Error adding document: ", error)
        });
      }
  }
  
  const getters = {
    tipi: state => { return state.tipi },
    ref: state => { return state.ref },
    unsubscribe: state => { return state.unsubscribe }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  }