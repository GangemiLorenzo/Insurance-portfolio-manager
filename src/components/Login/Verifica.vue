<template>
<v-container class="text-md-center">
  <v-layout mb-5>
    <v-flex>
      <span class="subheading">Ciao {{username}}, abbiamo inviato una email di conferma a questo indirizzo.</span><br>
      <span class="title">{{email}}</span>
    </v-flex>
  </v-layout>
  <v-layout mb-3>
    <v-flex>
      <span class="subheading">Se l'indirizzo non è corretto, puoi chiudere velocemente l'account da qui.</span><br>
      <v-btn outline v-on:click="rimozione" color="error">Cancella account</v-btn>
    </v-flex>
  </v-layout>
  <v-layout>
    <v-flex>
      <span class="subheading">Se vuoi solamente disconnetterti puoi farlo tramite questo pulsante.</span><br>
      <v-btn outline  v-on:click="sconnessione" color="warning">Esci</v-btn>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { disconnessione, remove } from '@/middelware/authMethods'
export default {
  name: 'Verifica',
  data () {
    return {
    }
  },
  methods: {
    sconnessione: function () {
      disconnessione()
    },
     rimozione: function () {
      remove()
    }
  },
  computed: {
    ...mapGetters({
      username: 'utente/username',
      email: 'utente/email'
    })
  }
}
</script>


<style>

</style>
