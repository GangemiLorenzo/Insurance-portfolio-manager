// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import {firebase, auth, db, VueFire} from './middelware/firebaseInit'


Vue.config.productionTip = false
Vue.use(Vuetify, {
  theme: {
    primary: "#B0BEC5",
    secondary: "#00897B",
    accent: "#FF8A65",
    error: "#FF3D00",
    warning: "#FBC02D",
    info: "#00ACC1",
    success: "#00BFA5",
    success_light: "#b7e5d2"
  }
})

auth.onAuthStateChanged(function(user) {
  if(user!=undefined && user.emailVerified == true){ 
    router.push({ path: `/Analisi` }) 
    user['db'] = db
    store.dispatch('utente/user',user)
  }
  else if(user!=undefined && user.emailVerified == false){
    router.push({ path: `/` })
    user['db'] = db
    store.dispatch('utente/user',user)
  }
  else { 
    router.push({ path: `/` })
    store.dispatch('impostazioni/clear_impostazioni')
    store.dispatch('utente/user',undefined)
  }
})


router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) {
   next('/');
  } else if (requiresAuth && currentUser) {
   next();
  } else {
   next();
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
