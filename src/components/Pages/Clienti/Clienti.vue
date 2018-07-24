<template>
<v-container>
  Clienti
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