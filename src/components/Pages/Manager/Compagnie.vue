<template>
    <v-flex mt-4>
        <v-card class="hidden-sm-and-down elevation-0">
            <v-card-title class="title">
            Compagnie
            </v-card-title>
            <v-card-text >
            <v-layout>
                <v-flex style="direction: rtl;">
                <v-list two-line style="max-height:350px; overflow-y:auto" class="scrbar">
                    <v-list-tile @click="" v-for="(compagnia, index) in compagnie" :key="index" >
                        <v-list-tile-action>
                        <v-btn outline fab small color="error" @click="cancella(compagnia.id)">
                            <v-icon>remove</v-icon>
                        </v-btn>
                        </v-list-tile-action>
                        <v-list-tile-content>
                        <v-list-tile-title class="title">{{compagnia.Nome}}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-avatar>
                            <v-icon large :color="compagnia.Colore">layers</v-icon>
                        </v-list-tile-avatar>
                    </v-list-tile>
                </v-list>
                </v-flex>
                <v-flex md5 pa-2>
                <v-card flat>
                <v-card-text pb-4>
                <v-layout>
                    <v-flex xs12>
                    <v-form ref="form_tipo">
                        <p class="title">Aggiungi Compagnia</p>
                        <v-text-field
                        label="Nuova compagnia"
                        v-model="nomeCompagnia"
                        :rules="store.getters['rules/name']"
                        :counter="15">
                        </v-text-field>
                        <v-layout row>
                            <v-flex xs2 pa-1 @click="color = C" v-for="C in listacolori" :key="C" >
                            <v-card ripple :color="C" class="colorcard">
                            </v-card>
                            </v-flex>
                        </v-layout>
                        <v-layout row mt-1>
                            <v-flex xs12 pa-1> <v-card ripple tile :color="color" style="height:10px" > </v-card> </v-flex>
                        </v-layout>
                    </v-form>
                    </v-flex>
                </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-btn flat block color="success" @click="aggiungi">Aggiungi</v-btn>
                </v-card-actions>
                </v-card>
                </v-flex>
            </v-layout>
            </v-card-text>
        </v-card>
        <v-card class="hidden-md-and-up">
            <v-card-title class="title">
            Compagnie
            </v-card-title>
            <v-card-text >
            <v-layout column>
                    <v-flex style="direction: rtl;">
                    <v-list two-line style="max-height:350px; overflow-y:auto" class="scrbar">
                        <v-list-tile @click="" v-for="(compagnia, index) in compagnie" :key="index" >
                            <v-list-tile-action>
                            <v-btn outline fab small color="error" @click="cancella(compagnia.id)">
                                <v-icon>remove</v-icon>
                            </v-btn>
                            </v-list-tile-action>
                            <v-list-tile-content>
                            <v-list-tile-title class="title">{{compagnia.Nome}}</v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-avatar>
                            <v-icon large :color="compagnia.Colore">layers</v-icon>
                            </v-list-tile-avatar>
                        </v-list-tile>
                    </v-list>
                    </v-flex>
                <v-flex pa-2>
                <v-btn
                    fab
                    color="accent"
                    bottom
                    right
                    absolute
                    @click.native.stop="add_dialog = !add_dialog">
                    <v-icon>add</v-icon>
                </v-btn>
                </v-flex>
            </v-layout>
            </v-card-text>
        </v-card>

        <v-dialog v-model="add_dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card flat>
            <v-toolbar flat class="transparent">
                <v-toolbar-title>Aggiungi compagnia</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon flat @click.native="add_dialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text pb-4>
            <v-layout>
                <v-flex xs12>
                    <v-form ref="form_tipo_dialog">
                        <v-text-field
                        label="Nuova compagnia"
                        v-model="nomeCompagnia"
                        :rules="store.getters['rules/name']"
                        :counter="15">
                        </v-text-field>
                        <v-layout row>
                            <v-flex xs2 pa-1 @click="color = C" v-for="C in listacolori" :key="C" >
                            <v-card ripple :color="C" class="colorcard">
                            </v-card>
                            </v-flex>
                        </v-layout>
                        <v-layout row mt-1>
                            <v-flex xs12 pa-1> <v-card ripple tile :color="color" style="height:10px" > </v-card> </v-flex>
                        </v-layout>
                    </v-form>
                </v-flex>
            </v-layout>
            </v-card-text>
            <v-card-actions>
                <v-btn flat block color="secondary" @click="aggiungi">Aggiungi</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-flex>
</template>

<script>
import PaginaBase from '@/components/Pages/PaginaBase'
import { mapGetters } from 'vuex'

export default {
  name: 'Compagnie',
   extends: PaginaBase,
  data () {
      return {
        add_dialog: false,
        nomeCompagnia: undefined,
        color: 'red lighten-1'
      }
  },
  methods: {
    cancella: function (id) {
        this.store.dispatch('confirm/create',{
            title: 'Conferma',
            message: 'Sei sicuro di voler eliminare questa compagnia? I documenti associati ad esso rimarrano tali',
            txt1:'Conferma',
            color1:'warning',
            txt2:'Annulla',
            callback1: this.cancella_conf,
            extra: id}) 
    },
    cancella_conf: function (id) {
        this.store.dispatch('compagnie/remove_compagnia',id)  
    },
    aggiungi: function () {
        if (this.$refs.form_tipo.validate()) {
            this.add_dialog = false
        this.store.dispatch('compagnie/add_compagnia',{
            nome: this.nomeCompagnia, 
            colore: this.color
            }).then(() => {
                this.clear()
                this.$refs.form_tipo.reset() 
                this.$refs.form_tipo_dialog.reset() 
            })
        }
    },
    clear: function () {
        this.nomeCompagnia = ''
        this.color = 'red lighten-1'
    }
  },
  computed: {
    ...mapGetters({
      compagnie: 'compagnie/compagnie',
      listacolori: 'compagnie/colori'
    })
  }
}
</script>

<style>
.colorcard {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    height:50px
}
.colorcard:hover {
    box-shadow: 0 5px 10px 0 rgba(0,0,0,0.2);
}
</style>
