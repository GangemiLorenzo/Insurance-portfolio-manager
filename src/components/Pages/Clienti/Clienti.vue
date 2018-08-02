<template>
<v-container fluid>
  
  <my-tab-pers-fisiche v-if="selected_tab==0"></my-tab-pers-fisiche>
  <my-tab-pers-giuridiche v-if="selected_tab==1"></my-tab-pers-giuridiche>
</v-container>
</template>

<script>
import PaginaBase from '@/components/Pages/PaginaBase'
import store from '@/store'
import { mapGetters } from 'vuex'
import tab_p_fisiche from './Tabella_persone_fisiche'
import tab_p_giuridiche from './Tabella_persone_giuridiche'

export default {
  name: 'Clienti',
   extends: PaginaBase,
  data () {
    return {
      items: [{name:'Persone'},{name:'Aziende'}]
    }
  },
  components: {
    'my-tab-pers-fisiche':tab_p_fisiche,
    'my-tab-pers-giuridiche':tab_p_giuridiche
  },
  computed: {
    ...mapGetters({
      selected_tab: 'bus/selected_tab'
    })
  }
}
</script>

<style>

</style>