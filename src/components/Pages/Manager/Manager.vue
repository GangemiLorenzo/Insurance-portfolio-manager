<template>
<v-container>
<v-layout column justify-center>
<my-tipi-polizza></my-tipi-polizza>
<my-frazionamenti></my-frazionamenti>
<my-compagnie></my-compagnie>
</v-layout>
</v-container>
</template>

<script>
import PaginaBase from '@/components/Pages/PaginaBase'
import Compagnie from './Compagnie'
import Tipi_polizza from './Tipi_polizza'
import Frazionamenti from './Frazionamenti'

export default {
  name: 'Manager',
   extends: PaginaBase,
  data () {
      return {
        headers: [
          {
            text: 'Compagnie',
            align: 'left',
            sortable: false
          }
        ],
        compagnie: [
          {
            nome: 'Allianz',
            colore: 100
          },
          {
            nome: 'Itas',
            colore: 100
          },
          {
            nome: 'IBM',
            colore: 100
          },
          {
            nome: 'Alleanza',
            colore: 100
          }
        ]
      }
  },
  created: function () {
  },
  components: {
    'my-compagnie': Compagnie,
    'my-tipi-polizza': Tipi_polizza,
    'my-frazionamenti': Frazionamenti
  }
}
</script>

<style>

</style>
