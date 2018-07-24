export default {
    mutations_listener({dispatch}) {
        this.subscribe((mutation) => {
            let module = mutation.type.split('/')[0]
            if(module === 'impostazioni') dispatch('upload_impostazioni',{state: mutation.type.split('/')[1], val: mutation.payload})
        })
    },

    upload_impostazioni({commit},data) {
        let ref = this.getters['utente/user_refs']['impostazioni']
        let imp = {}
        let val = data.val
        if(val === undefined) val = null
        imp[data.state] = val
        ref.update(imp);
    }
}