<template>
    <v-flex>
        <v-card class="hidden-sm-and-down elevation-0">
            <v-card-title class="title">
            Tipi di polizza
            </v-card-title>
            <v-card-text >
            <v-layout>
                <v-flex style="direction: rtl;">
                <v-list two-line style="max-height:350px; overflow-y:auto" class="scrbar">
                    <v-list-tile @click="" v-for="(tipo, index) in tipi" :key="index" >
                        <v-list-tile-action>
                        <v-btn outline fab small color="error" @click="cancella(tipo.id)">
                            <v-icon>remove</v-icon>
                        </v-btn>
                        </v-list-tile-action>
                        <v-list-tile-content>
                        <v-list-tile-title class="title">{{tipo.Nome}}</v-list-tile-title>
                        <v-list-tile-sub-title v-if="tipo.Veicolo"> Veicolo</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-avatar>
                        <v-icon>{{tipo.Icona}}</v-icon>
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
                        <p class="title">Aggiungi tipo di polizza</p>
                        <v-text-field
                        label="Nuovo tipo"
                        v-model="nometipo"
                        :rules="store.getters['rules/name']"
                        :counter="15">
                        </v-text-field>
                        <v-checkbox label="Veicolo" v-model="veicolo"></v-checkbox>
                        <my-icon-picker></my-icon-picker>
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
            Tipi di polizza
            </v-card-title>
            <v-card-text >
            <v-layout column>
                    <v-flex style="direction: rtl;">
                    <v-list two-line style="max-height:350px; overflow-y:auto" class="scrbar">
                        <v-list-tile @click="" v-for="(tipo, index) in tipi" :key="index" >
                            <v-list-tile-action>
                            <v-btn outline fab small color="error" @click="cancella(tipo.id)">
                                <v-icon>remove</v-icon>
                            </v-btn>
                            </v-list-tile-action>
                            <v-list-tile-content>
                            <v-list-tile-title class="title">{{tipo.Nome}}</v-list-tile-title>
                            <v-list-tile-sub-title v-if="tipo.Veicolo"> Veicolo</v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-avatar>
                            <v-icon>{{tipo.Icona}}</v-icon>
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
                <v-toolbar-title>Aggiungi tipo di polizza</v-toolbar-title>
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
                        label="Nuovo tipo"
                        v-model="nometipo"
                        :rules="store.getters['rules/name']"
                        :counter="15">
                        </v-text-field>
                        <v-checkbox label="Veicolo" v-model="veicolo"></v-checkbox>
                        <my-icon-picker></my-icon-picker>
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
import Iconpicker from '@/components/Other/Icon-picker'

export default {
  name: 'Tipi_polizza',
   extends: PaginaBase,
  data () {
      return {
        nometipo:'',
        veicolo: false,
        add_dialog: false
      }
  },
  methods: {
    cancella: function (id) {
        this.store.dispatch('confirm/create',{
            title: 'Conferma',
            message: 'Sei sicuro di voler eliminare questo tipo di polizza? I documenti associati ad esso rimarrano tali',
            txt1:'Conferma',
            color1:'warning',
            txt2:'Annulla',
            callback1: this.cancella_conf,
            extra: id}) 
    },
    cancella_conf: function (id) {
        this.store.dispatch('tipi_polizza/remove_tipo',id)  
    },
    aggiungi: function () {
        if (this.$refs.form_tipo.validate()) {
            this.add_dialog = false
        this.store.dispatch('tipi_polizza/add_tipo',{
            nome: this.nometipo, 
            icona: this.icona, 
            veicolo: this.veicolo
            }).then(() => {
                this.clear()
                this.$refs.form_tipo.reset() 
                this.$refs.form_tipo_dialog.reset() 
            })
        }
    },
    clear: function () {
        this.nometipo = ''
        this.veicolo = false
        this.store.commit('bus/tipo_polizza_icona','open_in_new')
    }
  },
  computed: {
    ...mapGetters({
      tipi: 'tipi_polizza/tipi',
      icona: 'bus/tipo_polizza_icona'
    })
  },
  components: {
      'my-icon-picker':Iconpicker
  }
}
</script>

<style>

</style>
