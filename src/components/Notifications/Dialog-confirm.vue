<template>
<v-flex>
  <v-dialog
      v-if="!$vuetify.breakpoint.xsOnly"
      v-model="confirmModel"
      max-width="290"
    >
      <v-card>
        <v-card-title v-if="title" class="headline" :class="color1" primary-title>
          {{title}}
          </v-card-title>

        <v-card-text v-if="message">
          {{message}}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn v-if="txt2"
            :color="color2"
            flat
            @click="btn2Click"
          >
            {{txt2}}
          </v-btn>

          <v-btn v-if="txt1"
            :color="color1"
            flat
            @click="btn1Click"
          >
            {{txt1}}
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
  <v-dialog
      v-else
      v-model="confirmModel"
      fullscreen
    >
      <v-card>
        <v-card-title v-if="title" class="headline" :class="color1" primary-title>
          {{title}}
          </v-card-title>

        <v-card-text v-if="message">
          {{message}}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn v-if="txt2"
            :color="color2"
            flat
            @click="btn2Click"
          >
            {{txt2}}
          </v-btn>

          <v-btn v-if="txt1"
            :color="color1"
            flat
            @click="btn1Click"
          >
            {{txt1}}
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</v-flex>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
export default {
  name: 'Dialog-confirm',
  methods: {
    btn1Click:() =>{
      store.commit('confirm/model',false)
      let CB = store.getters['confirm/callback1']
      if(typeof CB === "function" && CB!= undefined)
      if(store.getters['confirm/extra'] !== undefined) CB(store.getters['confirm/extra'])
      else CB()
    },
    btn2Click:() =>{
      store.commit('confirm/model',false)
      let CB = store.getters['confirm/callback2']
      if(typeof CB === "function" && CB!= undefined)
      if(store.getters['confirm/extra'] !== undefined) CB(store.getters['confirm/extra'])
      else CB()
    }
  },
  computed: {
    ...mapGetters({
      title: 'confirm/title',
      message: 'confirm/message',
      txt1: 'confirm/txt1',
      txt2: 'confirm/txt2',
      color1: 'confirm/color1',
      color2: 'confirm/color2',
      callback1: 'confirm/callback1',
      callback2: 'confirm/callback2',
      extra: 'confirm/extra'
    }),
    confirmModel: {
    get: ()=>{
      return store.getters['confirm/model']
    },
    set: function (model) {
      store.commit('confirm/model',model)
    }
  }
  }
}
</script>

<style>

</style>
