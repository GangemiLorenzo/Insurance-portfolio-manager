
const state = {
  dark_theme: false
}

// mutations
const mutations = {
    dark_theme (state,dark_theme) {
        state.dark_theme = dark_theme
    }
}

const actions = {
    download_impostazioni({commit, dispatch}, ref) {
        ref.get()
            .then(doc => {
                let data = doc.data()
                commit('dark_theme',data['dark_theme'])
            })
            .catch(err => {
                console.log(err)
            })
    },
    clear_impostazioni({commit})
    {
        commit('dark_theme',false)
    }
}

const getters = {
    dark_theme: state => { return state.dark_theme }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}