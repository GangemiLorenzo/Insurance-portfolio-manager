<template>
<v-container>
  <v-layout row fill-height>
    <v-flex>1</v-flex>
    <v-flex>2</v-flex>
  </v-layout>
</v-container>
</template>

<script>
import PaginaBase from '@/components/Pages/PaginaBase'

export default {
  name: 'Clienti',
   extends: PaginaBase,
  data () {
    return {
    }
  },
  created: function () {
    /*this.str.dispatch('snackbar/create',{
            model: true, 
            label: 'Clienti',
            timeout: 3000, 
            right:true, 
            bottom:true})*/
  }
}
</script>

<style>

</style>