<template>
<v-flex>
  <v-snackbar class="hidden-sm-and-down"
        :timeout="timeout"
        :top="top"
        :bottom="bottom"
        :right="right"
        :left="left"
        v-model="snackModel"
    >
      {{label}}
  </v-snackbar>
  <v-snackbar class="hidden-md-and-up"
        multi-line
        :timeout="timeout"
        :top="top"
        :bottom="bottom"
        :right="right"
        :left="left"
        v-model="snackModel"
    >
      {{label}}
  </v-snackbar>
</v-flex>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
export default {
  name: 'Snackbar',
  computed: {
    ...mapGetters({
      timeout: 'snackbar/timeout',
      top: 'snackbar/top',
      bottom: 'snackbar/bottom',
      right: 'snackbar/right',
      left: 'snackbar/left',
      label: 'snackbar/label'
    }),
    snackModel: {
    get: ()=>{
      //console.log('snak ' + store.getters['snackbar/model'])
      return store.getters['snackbar/model']
    },
    set: function (model) {
      store.commit('snackbar/model',model)
    }
  }
  }
}
</script>

<style>

</style>
