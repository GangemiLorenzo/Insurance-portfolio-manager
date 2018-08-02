import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Pages/Home'
import Loading from '@/components/Pages/Loading'
import Manager from '@/components/Pages/Manager/Manager'
import Analisi from '@/components/Pages/Analisi/Analisi'
import Clienti from '@/components/Pages/Clienti/Clienti'
import Impostazioni from '@/components/Pages/Impostazioni/Impostazioni'
import Utente from '@/components/Pages/Utente/Utente'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Loading',
      component: Loading
    },
    {
      path: '/Welcome',
      name: 'Home',
      component: Home
    },
    {
      path: '/Manager',
      name: 'Manager',
      component: Manager,
      meta: {requiresAuth: true}
    },
    {
      path: '/Analisi',
      name: 'Analisi',
      component: Analisi,
      meta: {requiresAuth: true}
    },
    {
      path: '/Clienti',
      name: 'Clienti',
      component: Clienti,
      meta: {requiresAuth: true, tabs: true}
    },
    {
      path: '/Impostazioni',
      name: 'Impostazioni',
      component: Impostazioni,
      meta: {requiresAuth: true}
    },
    {
      path: '/Utente',
      name: 'Utente',
      component: Utente,
      meta: {requiresAuth: true}
    }
  ]
})
