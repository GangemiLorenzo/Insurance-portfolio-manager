<template>
    <v-flex mt-4>
        <v-card class="hidden-sm-and-down elevation-0">
            <v-card-title class="title">
            Frazionamenti
            </v-card-title>
            <v-card-text >
            <v-layout>
                <v-flex style="direction: rtl;">
                <v-list two-line style="max-height:350px; overflow-y:auto" class="scrbar">
                    <v-list-tile @click="" v-for="(frazionamento, index) in frazionamenti" :key="index" >
                        <v-list-tile-action>
                        <v-btn outline fab small color="error" @click="cancella(frazionamento.id)">
                            <v-icon>remove</v-icon>
                        </v-btn>
                        </v-list-tile-action>
                        <v-list-tile-content>
                        <v-list-tile-title class="title">{{frazionamento.Nome}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{frazionamento.Periodo}} mesi</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                </v-flex>
                <v-flex md5 pa-2>
                <v-card flat>
                <v-card-text pb-4>
                <v-layout>
                    <v-flex xs12>
                    <v-form ref="form_tipo">
                        <p class="title">Aggiungi Frazionamento</p>
                        <v-text-field
                        label="Nuovo frazionamento"
                        v-model="nomefrazionamento"
                        :rules="store.getters['rules/name']"
                        :counter="15">
                        </v-text-field>
                        <v-layout row text-xs-center align-center>
                            <v-flex xs4>
                                <v-btn outline block @click="changePeriodo(-1)">-</v-btn>
                            </v-flex>
                            <v-flex xs4 class="body-2">
                                {{periodo}}
                            </v-flex>
                            <v-flex xs4>
                                <v-btn outline block @click="changePeriodo(+1)">+</v-btn>
                            </v-flex>
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
            Frazionamenti
            </v-card-title>
            <v-card-text >
            <v-layout column>
                    <v-flex style="direction: rtl;">
                    <v-list two-line style="max-height:350px; overflow-y:auto" class="scrbar">
                        <v-list-tile @click="" v-for="(frazionamento, index) in frazionamenti" :key="index" >
                            <v-list-tile-action>
                            <v-btn outline fab small color="error" @click="cancella(frazionamento.id)">
                                <v-icon>remove</v-icon>
                            </v-btn>
                            </v-list-tile-action>
                            <v-list-tile-content>
                            <v-list-tile-title class="title">{{frazionamento.Nome}}</v-list-tile-title>
                            <v-list-tile-sub-title>{{frazionamento.Periodo}} mesi</v-list-tile-sub-title>
                            </v-list-tile-content>
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
                <v-toolbar-title>Aggiungi frazionamento</v-toolbar-title>
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
                        label="Nuovo frazionamento"
                        v-model="nomefrazionamento"
                        :rules="store.getters['rules/name']"
                        :counter="15">
                        </v-text-field>
                        <p>Periodo:</p>
                        <v-layout row text-xs-center align-center>
                            <v-flex xs4>
                                <v-btn outline block @click="changePeriodo(-1)">-</v-btn>
                            </v-flex>
                            <v-flex xs4 class="body-2">
                                {{periodo}}
                            </v-flex>
                            <v-flex xs4>
                                <v-btn outline block @click="changePeriodo(+1)">+</v-btn>
                            </v-flex>
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
  name: 'Frazionamenti',
   extends: PaginaBase,
  data () {
      return {
        add_dialog: false,
        nomefrazionamento:'',
        periodo: 1
      }
  },
  methods: {
    cancella: function (id) {
        this.store.dispatch('confirm/create',{
            title: 'Conferma',
            message: 'Sei sicuro di voler eliminare questo frazionamento? I documenti associati ad esso rimarrano tali',
            txt1:'Conferma',
            color1:'warning',
            txt2:'Annulla',
            callback1: this.cancella_conf,
            extra: id}) 
    },
    cancella_conf: function (id) {
        this.store.dispatch('frazionamenti/remove_frazionamento',id)  
    },
    aggiungi: function () {
        if (this.$refs.form_tipo.validate()) {
            this.add_dialog = false
        this.store.dispatch('frazionamenti/add_frazionamento',{
            nome: this.nomefrazionamento, 
            periodo: this.periodo
            }).then(() => {
                this.clear()
                this.$refs.form_tipo.reset() 
                this.$refs.form_tipo_dialog.reset() 
            })
        }
    },
    clear: function () {
        this.nomefrazionamento = ''
        this.periodo = 1
    },
    changePeriodo: function (x) {
      var newperiodo = this.periodo + x
      if (newperiodo >= 1) {
        this.periodo = newperiodo
      }
    }
  },
  computed: {
    ...mapGetters({
      frazionamenti: 'frazionamenti/frazionamenti'
    })
  }
}
</script>

<style>

</style>
