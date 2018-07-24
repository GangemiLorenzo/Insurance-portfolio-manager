<template>
<v-container>
<v-layout row justify-center>
    <v-flex>
    <v-list subheader>
    <v-subheader>Profilo</v-subheader>
    <v-list-tile>
        <v-list-tile-content>
        <v-list-tile-title>Nome utente</v-list-tile-title>
        <v-list-tile-sub-title>{{username}}</v-list-tile-sub-title>
        </v-list-tile-content>
    </v-list-tile>
    <v-list-tile>
        <v-list-tile-content>
        <v-list-tile-title>Email</v-list-tile-title>
        <v-list-tile-sub-title>{{email}}</v-list-tile-sub-title>
        </v-list-tile-content>
    </v-list-tile>
    <v-list-tile>
        <v-list-tile-content>
        <v-list-tile-title>Riferimenti</v-list-tile-title>
        <v-list-tile-sub-title>{{user_refs['impostazioni'].path}}</v-list-tile-sub-title>
        </v-list-tile-content>
    </v-list-tile>
    </v-list>
    </v-flex>
</v-layout>
</v-container>
</template>

<script>
import PaginaBase from '@/components/Pages/PaginaBase'
import { mapGetters } from 'vuex'

export default {
  name: 'Utente',
   extends: PaginaBase,
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      user: 'utente/user',
      uid: 'utente/uid',
      verificato: 'utente/verificato',
      email: 'utente/email',
      username: 'utente/username',
      user_refs: 'utente/user_refs'
    })
  }
}
</script>

<style>

</style>