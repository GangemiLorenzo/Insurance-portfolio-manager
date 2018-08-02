
const state = {
    lista_anagrafica: [],
    ref: undefined,
    unsubscribe: undefined
  }
  
  // mutations
  const mutations = {
    lista_anagrafica(state,lista_anagrafica) {
        state.lista_anagrafica = lista_anagrafica
    },
    ref(state,ref) {
        state.ref = ref
    },
    unsubscribe(state,unsubscribe) {
        state.unsubscribe = unsubscribe
    }
  }
  
  const actions = {
      download_anagrafica({commit, getters}, ref) {
        commit('ref',ref)
        let unsub = ref.orderBy("Nome").onSnapshot(function(querySnapshot) {
            var lista_anagrafica = [];
            querySnapshot.forEach(function(doc) {
                let dato = doc.data();
                dato['id'] = doc.id
                lista_anagrafica.push(dato)
            })
            commit('lista_anagrafica',lista_anagrafica)
        })
        commit('unsubscribe',unsub)
      },

      clear_anagrafica({commit})
      {
        getters['unsubscribe']()
        commit('lista_anagrafica',[])
      },

      add_anagrafica({getters,dispatch},anagrafica)
      {
        //rimuovo per property vuote
        for (var property in anagrafica) {
            if (anagrafica.hasOwnProperty(property)) {
                if(anagrafica[property] == undefined) delete anagrafica[property]
            }
        }

        //fix data
        if(anagrafica['Data']!== undefined)
        {
            let d = anagrafica['Data']
            d = d.slice(4,8) + '-' + d.slice(2,4) + '-' + d.slice(0,2)
            anagrafica['Data'] = new Date(d)
        }

        //Upload
        getters['ref'].add(anagrafica)
        .then(function() {
            dispatch('snackbar/create',{
                model: true, 
                label: 'Cliente aggiunto con successo',
                timeout: 3000, 
                right:true, 
                bottom:true},{root:true})
        }).catch(function(error) {
            console.error("Error adding document: ", error)
        })
      },

      update_anagrafica({getters,dispatch},Dati)
      {
        let anagrafica = Dati.cliente
        let id = Dati.id

        //rimuovo per property vuote
        for (var property in anagrafica) {
            if (anagrafica.hasOwnProperty(property)) {
                if(anagrafica[property] == undefined) delete anagrafica[property]
            }
        }

        //fix data
        if(anagrafica['Data']!== undefined)
        {
            let d = anagrafica['Data']
            d = d.slice(4,8) + '-' + d.slice(2,4) + '-' + d.slice(0,2)
            anagrafica['Data'] = new Date(d)
        }

        //Upload
        getters['ref'].doc(id).update(anagrafica)
        .then(function() {
            dispatch('snackbar/create',{
                model: true, 
                label: 'Cliente modificato con successo',
                timeout: 3000, 
                right:true, 
                bottom:true},{root:true})
        }).catch(function(error) {
            console.error("Error adding document: ", error)
        })
      },

      remove_anagrafica({getters,dispatch},id)
      {
        getters['ref'].doc(id).delete().then(function() {
            dispatch('snackbar/create',{
                model: true, 
                label: 'Cliente rimosso con successo',
                timeout: 3000, 
                right:true, 
                bottom:true},{root:true})
        }).catch(function(error) {
            console.error("Error removing document: ", error)
        })
      }
  }
  
  const getters = {
    lista_anagrafica: state => { return state.lista_anagrafica },
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