<template>
    <v-flex class="text-md-center" ma-4 >
      <h3 class="display-3">{{INFO.FULL_APP_NAME}}</h3>
      <span class="subheading">{{subheading_content}}</span>
      <v-divider class="my-3"></v-divider>
    </v-flex>
</template>

<script>
export default {
  name: 'Jumbotron',
  data () {
    return {
      INFO: process.env.INFO,
      subheading_content: 'Inizia da qui. Accedi al tuo gestore di portafoglio o creane uno nuovo.'
    }
  }
}
</script>


<style>

</style>
