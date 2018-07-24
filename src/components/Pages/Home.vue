<template>
<v-container>
  <my-snack></my-snack>
  <my-jum></my-jum>
  <v-flex xs12 lg8 offset-xs0 offset-lg2>
  <my-log v-if="user==undefined"></my-log>
  <my-ver v-if="user!=undefined && verificato==false"></my-ver>
  </v-flex>
</v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Jum from '@/components/Other/Jumbotron'
import Log from '@/components/Login/Login'
import Ver from '@/components/Login/Verifica'
import Snackbar from '@/components/Notifications/Snackbar'

export default {
  name: 'Home',
  data () {
    return {
    }
  },
  components: {
    'my-jum': Jum,
    'my-log': Log,
    'my-snack': Snackbar,
    'my-ver': Ver,
  },
  computed: {
    ...mapGetters({
      user: 'utente/user',
      verificato: 'utente/verificato'
    })
  }
}
</script>

<style>

</style>
