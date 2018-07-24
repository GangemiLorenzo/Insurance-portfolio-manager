<template>
<v-flex>

<v-toolbar class="hidden-sm-and-down">
    <v-toolbar-title>{{ INFO.APP_NAME }}</v-toolbar-title>
    <v-divider class="mx-2" inset vertical></v-divider>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <template v-for="(item, index) in items">
        <v-divider v-if="item.divider" :key="index" vertical></v-divider>
        <v-btn flat v-else
            :key="index"
            router :to="item.event"> <v-icon left>{{item.icona}}</v-icon>{{ item.title }}</v-btn>
      </template>
      <v-menu offset-y open-on-hover transition="slide-y-transition">
        <v-btn flat slot="activator" ><v-icon>menu</v-icon></v-btn>
        <v-list>
          <v-list-tile
            v-for="(action, index) in menu_actions" 
            :key="index"
            @click="action.event">
          <v-list-tile-title >{{ action.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
      </v-menu>
    </v-toolbar-items>
</v-toolbar>


<v-toolbar class="hidden-md-and-up">
    <v-toolbar-title>{{ INFO.APP_NAME }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <template v-for="(item, index) in items">
        <v-btn flat v-if="!item.divider"
            :key="index"
            router :to="item.event"> <v-icon >{{item.icona}}</v-icon></v-btn>
      </template>
    <v-btn flat v-on:click="menu_dialog_model = true" ><v-icon>menu</v-icon></v-btn>
    </v-toolbar-items>
</v-toolbar>

<v-dialog @keydown.esc="menu_dialog_model = false" v-model="menu_dialog_model" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar flat class="transparent">
          <v-spacer></v-spacer>
          <v-btn icon flat @click.native="menu_dialog_model = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-list>
            <template v-for="(item, index) in menu_actions">
            <v-list-tile v-if="!item.divider" 
                :key="index"
                @click.native="item.event"> <v-list-tile-title class="text-xs-center">{{ item.title }}</v-list-tile-title>
            </v-list-tile>
            <v-divider :key="index + menu_actions.length"></v-divider>
          </template>
          </v-list>
        </v-card-text>
        <my-footer></my-footer>
      </v-card>
      </v-dialog>

</v-flex>
</template>

<script>
import { disconnessione, remove } from '@/middelware/authMethods'
import Footer from '@/components/Other/The-footer'
import router from '@/router'
import { mapGetters } from 'vuex'
import store from '@/store'
export default {
  name: 'Toolbar',
  data () {
    return {
      INFO: process.env.INFO,
      home: "/",
      items: [
        { title: 'Analisi', icona: 'bar_chart', event: '/Analisi'},
        { divider: true },
        { title: 'Clienti', icona: 'people', event: '/Clienti'},
        { divider: true },
        { title: 'Gestione', icona: 'build', event: '/Manager'},
        { divider: true }
      ],
      menu_actions: [
        { title: 'Impostazioni', icona: 'exit_to_app', event: this.impostazioni},
        { title: 'Utente', icona: 'exit_to_app', event: this.utente},
        { title: 'Documentazione', icona: 'exit_to_app', event: this.documentazione},
        { title: 'Offrimi un caffe', icona: 'exit_to_app', event: this.donate},
        { title: 'Esci', icona: 'exit_to_app', event: this.logout}
      ]
    }
  },
  methods: { 
    logout: () => {
      store.commit('bus/menu_dialog_model',false)
      disconnessione()
    },
    donate: () => {
      store.commit('bus/menu_dialog_model',false)
      window.open(process.env.DONATE_LINK)
    },
    impostazioni: () => {
      store.commit('bus/menu_dialog_model',false)
      router.push({ path: '/Impostazioni' })
    },
    utente: () => {
      store.commit('bus/menu_dialog_model',false)
      router.push({ path: '/Utente' })
    },
    documentazione: () => {
      store.commit('bus/menu_dialog_model',false)
      window.open(process.env.DOC_LINK)
    }
  },
  components: {
    'my-footer': Footer
  },
  computed: {
    menu_dialog_model: {
      get: ()=>{
        return store.getters['bus/menu_dialog_model']
      },
      set: function (menu_dialog_model) {
        store.commit('bus/menu_dialog_model',menu_dialog_model)
      }
    }
  }
}
</script>


<style>

</style>