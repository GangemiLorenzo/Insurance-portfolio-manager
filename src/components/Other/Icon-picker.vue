<template>
    <v-flex class="text-md-center">
        <v-layout row justify-center>

            <v-btn class="hidden-sm-and-down" outline block @click="dialog_big=true">
                <v-icon left>{{icona_selezionata}}</v-icon>
                <span>Seleziona icona</span>
            </v-btn>
            <v-btn class="hidden-md-and-up" outline block @click="dialog_small=true">
                <v-icon left>{{icona_selezionata}}</v-icon>
                <span>Seleziona icona</span>
            </v-btn>

            <v-dialog
            v-model="dialog_big"
            max-width="60%"
            >
                <v-card flat>
                    <v-toolbar flat>
                        <v-text-field prepend-icon="search" color="accent" hide-details single-line v-model="filter" label="cerca" clearable></v-text-field>
                        <v-spacer></v-spacer>
                        <v-btn icon flat @click.native="dialog_big = false">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text pb-4>
                        <v-container fluid grid-list-sm style="max-height:400px; overflow-y:auto" class="scrbar">
                            <v-layout row wrap>
                                <v-flex v-for="i in number" :key="i" xs2 class="text-xs-center" >
                                <v-btn flat large  @click="icona_scelta(lista_icone[i])"><v-icon>{{lista_icone[i]}}</v-icon></v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-dialog
            fullscreen
            v-model="dialog_small"
            >
                <v-card flat>
                    <v-toolbar flat>
                        <v-text-field prepend-icon="search" color="accent" hide-details single-line v-model="filter" label="cerca" clearable></v-text-field>
                        <v-spacer></v-spacer>
                        <v-btn icon flat @click.native="dialog_small = false">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text pb-4>
                        <v-container fluid grid-list-sm style="overflow-y:auto" class="scrbar">
                            <v-layout row wrap>
                                <v-flex v-for="i in number" :key="i" xs3 class="text-xs-center" >
                                <v-btn flat large  @click="icona_scelta(lista_icone[i])"><v-icon>{{lista_icone[i]}}</v-icon></v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-layout>
    </v-flex>
</template>

<script>
import icone from '@/assets/icone.js'
import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  name: 'Icon-picker',
  data () {
    return {
        dialog_big: false,
        dialog_small: false,
        filter: ''
    }
  },
  methods: {
      icona_scelta: function (choosen) {
          this.dialog_big = false
          this.dialog_small = false
          store.commit('bus/tipo_polizza_icona',choosen)
      }
  },
  computed: {
    lista_icone: function () {
        if(icone && this.filter!== null && this.filter!== undefined){
            return icone.filter(item => {
                return item.toLowerCase().indexOf(this.filter.toLowerCase()) > -1
            })
        }
        else return icone
    },
    number: function () {
        if(this.lista_icone.length > 50)
            return 50
        else
            return this.lista_icone.length
    },
    ...mapGetters({
      icona_selezionata: 'bus/tipo_polizza_icona'
    })
  }
}
</script>


<style>
.scrbar::-webkit-scrollbar {
    width: 16px;
}
.scrbar::-webkit-scrollbar-track {
    background: #cccccc;
    XXborder-radius: 5px;
}
.scrbar::-webkit-scrollbar-thumb {
    XXborder-radius: 5px;
    background: gray;
}
</style>
