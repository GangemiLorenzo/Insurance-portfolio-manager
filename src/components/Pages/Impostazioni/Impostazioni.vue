<template>
<v-container fluid>
<v-layout row justify-center>
    <v-flex>
    <v-list three-line subheader>
    <v-subheader>Tema e colori</v-subheader>
    <v-list-tile>
        <v-list-tile-content>
        <v-list-tile-title>Tema scuro</v-list-tile-title>
        <v-list-tile-sub-title>Imposta il tema scuro per migliorare la visibilità in caso di poca illuminazione</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
            <v-spacer></v-spacer>
              <v-checkbox v-model="dark_theme">Tema scuro</v-checkbox>
        </v-list-tile-action>
    </v-list-tile>
    </v-list>
    </v-flex>
</v-layout>
</v-container>
</template>

<script>
import PaginaBase from '@/components/Pages/PaginaBase'

export default {
  name: 'Impostazioni',
   extends: PaginaBase,
  data () {
    return {
    }
  }
}
</script>

<style>

</style>