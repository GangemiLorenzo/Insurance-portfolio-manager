
const state = {
    frazionamenti: [],
    ref: undefined,
    unsubscribe: undefined
  }
  
  // mutations
  const mutations = {
    frazionamenti(state,frazionamenti) {
        state.frazionamenti = frazionamenti
    },
    ref(state,ref) {
        state.ref = ref
    },
    unsubscribe(state,unsubscribe) {
        state.unsubscribe = unsubscribe
    }
  }
  
  const actions = {
      download_frazionamenti({commit, dispatch}, ref) {
        commit('ref',ref)
        let unsub = ref.onSnapshot(function(querySnapshot) {
            var frazionamenti = [];
            querySnapshot.forEach(function(doc) {
                let dato = doc.data();
                dato['id'] = doc.id
                frazionamenti.push(dato)
            })
            commit('frazionamenti',frazionamenti)
        })
        commit('unsubscribe',unsub)
      },
      clear_frazionamenti({commit})
      {
        getters['unsubscribe']()
        commit('frazionamenti',[])
      },
      remove_frazionamento({dispatch,getters},id)
      {
        getters['ref'].doc(id).delete().then(function() {
            dispatch('snackbar/create',{
                model: true, 
                label: 'Frazionamento rimosso con successo',
                timeout: 3000, 
                right:true, 
                bottom:true},{root:true})
        }).catch(function(error) {
            console.error("Error removing document: ", error)
        });
      },
      add_frazionamento({getters, dispatch},frazionamento)
      {
        getters['ref'].add({
            Nome: frazionamento.nome,
            Periodo: frazionamento.periodo,
        }).then(function() {
            dispatch('snackbar/create',{
                model: true, 
                label: 'frazionamento aggiunto con successo',
                timeout: 3000, 
                right:true, 
                bottom:true},{root:true})
        }).catch(function(error) {
            console.error("Error adding document: ", error)
        });
      }
  }
  
  const getters = {
    frazionamenti: state => { return state.frazionamenti },
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