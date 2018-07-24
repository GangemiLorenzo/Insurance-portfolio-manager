
const state = {
    compagnie: [],
    colori: ['red lighten-1',
    'purple lighten-1',
    'indigo lighten-1',
    'light-blue lighten-1',
    'teal lighten-1',
    'green lighten-1',
    'amber lighten-1'
    ],
    ref: undefined,
    unsubscribe: undefined
  }
  
  // mutations
  const mutations = {
    compagnie(state,compagnie) {
        state.compagnie = compagnie
    },
    colori(state,colori) {
        state.colori = colori
    },
    ref(state,ref) {
        state.ref = ref
    },
    unsubscribe(state,unsubscribe) {
        state.unsubscribe = unsubscribe
    }
  }
  
  const actions = {
      download_compagnie({commit, dispatch}, ref) {
        commit('ref',ref)
        let unsub = ref.onSnapshot(function(querySnapshot) {
            var compagnie = [];
            querySnapshot.forEach(function(doc) {
                let dato = doc.data();
                dato['id'] = doc.id
                compagnie.push(dato)
            })
            commit('compagnie',compagnie)
        })
        commit('unsubscribe',unsub)
      },
      clear_compagnie({commit})
      {
        getters['unsubscribe']()
        commit('compagnie',[])
      },
      remove_compagnia({dispatch,getters},id)
      {
        getters['ref'].doc(id).delete().then(function() {
            dispatch('snackbar/create',{
                model: true, 
                label: 'Compagnia rimossa con successo',
                timeout: 3000, 
                right:true, 
                bottom:true},{root:true})
        }).catch(function(error) {
            console.error("Error removing document: ", error)
        });
      },
      add_compagnia({getters, dispatch},compagnia)
      {
        getters['ref'].add({
            Nome: compagnia.nome,
            Colore: compagnia.colore
        }).then(function() {
            dispatch('snackbar/create',{
                model: true, 
                label: 'Compagnia aggiunta con successo',
                timeout: 3000, 
                right:true, 
                bottom:true},{root:true})
        }).catch(function(error) {
            console.error("Error adding document: ", error)
        });
      }
  }
  
  const getters = {
    compagnie: state => { return state.compagnie },
    colori: state => { return state.colori },
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