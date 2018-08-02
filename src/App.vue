<template>
  <v-app :dark="dark_theme">
    <my-tool v-if="user && verificato"></my-tool>
      <v-container fluid class="JosefinFont" v-bind:class="{ wallpaper: !dark_theme, wallpaperDark: dark_theme }">
        <my-snack></my-snack>
        <my-confirm></my-confirm>
        <main fill-height><router-view></router-view></main>
      </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import Tool from '@/components/Other/Top-Toolbar'
import Snackbar from '@/components/Notifications/Snackbar'
import Confirm from '@/components/Notifications/Dialog-confirm'
import Footer from '@/components/Other/The-footer'
export default {
  name: 'app',
  data () {
    return {
      INFO: process.env.INFO
    }
  },
  created: () => {
  },
  components: {
    'my-tool': Tool,
    'my-snack': Snackbar,
    'my-confirm': Confirm,
    'my-footer': Footer
  },
  computed: {
    ...mapGetters({
      user: 'utente/user',
      verificato: 'utente/verificato'
    }),
    dark_theme: {
      get: ()=>{
        return store.getters['impostazioni/dark_theme']
      },
      set: function (dark_theme) {
        store.commit('impostazioni/dark_theme',dark_theme)
      }
    }
  }
}
</script>

<style>
.animate {
  background: gray url(https://subtlepatterns.com/patterns/geometry2.png) repeat 0 0;
  -webkit-animation: slide 20s linear infinite;
}
@-webkit-keyframes slide {
    from { background-position: 0 0; }
    to { background-position: -400px 0; }
}

.JosefinFont {
  font-family: 'Josefin Sans', sans-serif;
}

.wallpaper{
background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
.wallpaperDark{
background-image: linear-gradient(to top, #09203f 0%, #537895 100%);
}

</style>
