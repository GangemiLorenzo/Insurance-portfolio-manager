<template>
<v-container fluid>
    <v-toolbar flat>
      <v-toolbar-title>Aziende</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-text-field
        v-model="filter"
        hide-details
        color="accent"
        prepend-icon="search"
        single-line
      ></v-text-field>
      <v-spacer></v-spacer>
      <template v-if="selected.length > 0">
        <v-btn icon large flat class="mb-2" @click="elimina_multipli()"><v-icon>delete</v-icon></v-btn>
      </template>
      <v-dialog v-if="selected.length == 0" :fullscreen="xs_dev" persistent  v-model="add_cliente_dialog" max-width="500px">
        <v-btn slot="activator" icon large flat class="mb-2"><v-icon>add</v-icon></v-btn>
        <v-card>
          <v-card-title :class="dark_theme? 'grey darken-4':'grey lighten-3'">
            <span class="headline">Nuovo cliente</span>
            <v-spacer></v-spacer>
            <v-icon @click="info">info</v-icon>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-form ref="add_cliente_form" lazy-validation>
                <v-layout wrap>
                  <v-flex xs12 sm6>
                    <v-text-field required :rules="store.getters['rules/name']" v-model="nuovo_cliente.RagFiscale" label="Ragione Fiscale"/>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field required :rules="store.getters['rules/name']" v-model="nuovo_cliente.SedeLegale" label="Sede Legale"/>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field required :rules="store.getters['rules/name']" v-model="nuovo_cliente.PIva" label="Partita Iva"/>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click.native="clear()">Annulla</v-btn>
            <v-btn color="accent" flat @click.native="add_cliente_dialog = nuovo()">Conferma</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      v-model="selected"
      select-all
      :items="anagrafiche"
      :search="filter"
      :rows-per-page-items="righe_per_pagina"
      rows-per-page-text = "Clienti per pagina"
    >
      <template slot="items" slot-scope="props">
        <td>
          <v-checkbox
            v-model="props.selected"
            hide-details
          ></v-checkbox>
        </td>
        <td><span v-if="props.item.RagFiscale">{{ props.item.RagFiscale }}</span></td>
        <td><span v-if="props.item.SedeLegale">{{ props.item.SedeLegale }}</span></td>
        <td class="text-xs-right"><span v-if="props.item.PIva">{{ props.item.PIva}}</span></td>
        <td class="justify-center layout px-0">
          <v-tooltip bottom>
            <v-icon
              color="secondary"
              slot="activator"
              :small="xs_dev"
              class="mr-2 pt-3"
              @click="modifica(props.item)"
            >
              edit
            </v-icon>
            <span>Modifica</span>
          </v-tooltip>
          <v-tooltip bottom>
            <v-icon
              color="info"
              slot="activator"
              :small="xs_dev"
              class="mr-2 pt-3"
            >
              contact_phone
            </v-icon>
            <span>Contatti</span>
          </v-tooltip>
          <v-tooltip bottom>
            <v-icon
              color="info"
              slot="activator"
              :small="xs_dev"
              class="mr-2 pt-3"
            >
              work
            </v-icon>
            <span>Polizze</span>
          </v-tooltip>
          
        </td>
      </template>
      <template slot="no-results">
        <v-flex class="text-xs-center">
          Nessun elemento corrispondente a "{{filter}}"
        </v-flex>
      </template>
      <template slot="no-data">
        <v-flex class="text-xs-center">
          Nessun cliente
        </v-flex>
      </template>
    </v-data-table>
</v-container>
</template>

<script>
import PaginaBase from '@/components/Pages/PaginaBase'
import store from '@/store'
import { mapGetters } from 'vuex'

export default {
  name: 'Tabella_persone_fisiche',
   extends: PaginaBase,
  data () {
    return {
      selected: [],
      filter: '',
      righe_per_pagina: [10,25,{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}],
      ModificaInCorso: false,
      isEditingCod: false,
      idModifica: undefined,
      add_cliente_dialog: false,
      nuovo_cliente: {selected: false, RagFiscale: undefined, SedeLegale: undefined, PIva: undefined},
      headers: [
        { text: 'Rag.Fiscale', value: 'RagFiscale'},
        { text: 'Sede Legale', value: 'SedeLegale'},
        { text: 'Partita Iva', value: 'PIva',sortable: false, align:'right'},
        { text: 'Azioni',sortable: false, align:'center' }
      ]
    }
  },
  methods: {
    elimina_multipli: function() {
      this.store.dispatch('confirm/create',{
            title: 'Conferma',
            message: 'Sei sicuro di voler eliminare '+ this.selected.length +' clienti? Perderai ogni documento associato ad essi',
            txt1:'Conferma',
            color1:'warning',
            txt2:'Annulla',
            callback1: function (Data) {
              Data.lista.forEach(function(cliente) {
                store.dispatch('clienti_persone_giuridiche/remove_anagrafica',cliente.id)
              })
              Data.contesto.selected = []
            },
            extra: {lista: this.selected, contesto: this}
            })
    },
    modifica: function (oldCliente) {
      this.ModificaInCorso = true
      this.idModifica = oldCliente['id']
      let oc = oldCliente
      let nc = this.nuovo_cliente
      nc['RagFiscale'] = oc['RagFiscale']
      if(oc['SedeLegale'] !==undefined) nc['SedeLegale'] = oc['SedeLegale']
      if(oc['PIva'] !==undefined) nc['PIva'] = oc['PIva']
      //Data
      this.add_cliente_dialog = true
    },
    nuovo: function () {
      if (this.$refs.add_cliente_form.validate()) {
          let nc = this.nuovo_cliente
          if(this.ModificaInCorso) store.dispatch('clienti_persone_giuridiche/update_anagrafica',{cliente: nc, id: this.idModifica}) //modifca
          else store.dispatch('clienti_persone_giuridiche/add_anagrafica',nc) //aggiungi nuovo
          this.clear()
          return false
      }else
      return true
    },
    info: function () {
      this.store.dispatch('confirm/create',{
            title: 'Info',
            message: 'I seguenti campi compongono l\'anagrafica del cliente che si vuol aggiungere.',
            txt1:'Conferma',
            color1:'info'})
    },
    clear: function () {
      this.add_cliente_dialog = false
      this.nuovo_cliente = {RagFiscale: undefined, SedeLegale: undefined, PIva: undefined}
      this.isEditingCod = false
      this.$refs.add_cliente_form.reset()
    }
  },
  computed: {
    ...mapGetters({
      anagrafiche: 'clienti_persone_giuridiche/lista_anagrafica'
    })
  }
}
</script>

<style>

</style>