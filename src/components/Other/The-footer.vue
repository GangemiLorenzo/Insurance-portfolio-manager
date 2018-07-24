<template>
    <v-footer height="auto" class="transparent" flat>
    <v-layout row wrap justify-center> 
      <v-flex xs12 py-3 text-xs-center>
        &copy;2018 — <strong>{{ INFO.DEV_NAME }}</strong>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      INFO: process.env.INFO
    }
  }
}
</script>


<style>

</style>

