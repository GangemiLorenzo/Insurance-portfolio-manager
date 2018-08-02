<template>

</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  data () {
    return {
      INFO: process.env.INFO,
      store: store,
      mapGetters: mapGetters
    }
  },
  computed: {
    ...mapGetters({
      user: 'utente/user',
      verificato: 'utente/verificato'
    }),
    dark_theme: {
      get: ()=>{
        return store.getters['impostazioni/dark_theme']
      },
      set: function (dark_theme) {
        store.commit('impostazioni/dark_theme',dark_theme)
      }
    },
    xs_dev: function () {
      return this.$vuetify.breakpoint.xsOnly
    }
  }
}
</script>

<style>
.scrbar::-webkit-scrollbar {
    width: 16px;
}
.scrbar::-webkit-scrollbar-track {
    background: #cccccc;
    XXborder-radius: 5px;
}
.scrbar::-webkit-scrollbar-thumb {
    XXborder-radius: 5px;
    background: gray;
}
</style>
