<template>  
<v-flex class="login">
  <v-card class="pa-5 carta"  v-bind:dark="modIscrizione" ref="carta" v-bind:class="{clicked: modIscrizione}" >
        <v-card-title v-if="!modIscrizione" class="title">
          Accedi
        </v-card-title>
        <v-card-title v-else class="title">
          Iscriviti
        </v-card-title>
        <v-card-text>
          <v-form v-if="!modIscrizione" @keyup.native.enter="procedi" ref="formLogin" lazy-validation >
            <v-text-field
              ref="emailField"
              label="E-mail"
              color="warning"
              :rules="$store.getters['rules/email']"
              v-model="email"
              validate-on-blur
            ></v-text-field>
            <v-text-field
              label="Password"
              color="warning"
              v-model="password"
              :rules="$store.getters['rules/password']"
              :append-icon="e1 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (e1 = !e1)"
              :type="e1 ? 'password' : 'text'"
              validate-on-blur
            ></v-text-field>
          </v-form>
          <v-form v-else ref="formIscrizione" @keyup.native.enter="procedi" lazy-validation >
            <v-text-field
              box
              label="Nome utente"
              v-model="nomeUtente"
              :rules="$store.getters['rules/name']"
              color="warning"
              validate-on-blur
            ></v-text-field>
            <v-text-field
              box
              label="E-mail"
              v-model="email"
              :rules="$store.getters['rules/email']"
              color="warning"
              validate-on-blur
            ></v-text-field>
            <v-text-field
              box
              label="Password"
              v-model="password"
              :rules="$store.getters['rules/password']"
              color="warning"
              :append-icon="e2 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (e2 = !e2)"
              :type="e2 ? 'password' : 'text'"
              validate-on-blur
            ></v-text-field>
            <v-text-field
              box
              label="Conferma Password"
              v-model="confermaPassword"
              :rules="confirmPasswordRule"
              color="warning"
              :append-icon="e2 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (e2 = !e2)"
              :type="e2 ? 'password' : 'text'"
            ></v-text-field>
            <v-checkbox :rules="$store.getters['rules/checkbox']" v-model="termini"  required >
              <span slot="label">Ho letto e accetto i <a href='https://ipm.netlify.com/termini/' target="_blank">Termini e condizioni d'uso</a></span>
            </v-checkbox>
          </v-form>
          <v-btn
            absolute
            top
            right
            fab
            class="mt-5 ml-5 accent"
            v-on:click="modIscrizione = !modIscrizione">
            <v-icon>{{iconafab}}</v-icon>
          </v-btn>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn large
            class="info"
            @click="procedi"
            v-bind:flat="!modIscrizione"
            >
            Procedi
          </v-btn>
          <v-chip v-if="!modIscrizione" class="caption" color="transparent" v-on:click.native="resetPassword" style="position:absolute; bottom: 5px; right:10px">
            Hai dimenticato la password?
          </v-chip >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
</v-flex>
</template>

<script>
import {firebase, auth} from '@/middelware/firebaseInit'

export default {
  data () {
    return {
      color: undefined,
      icon: undefined,
      error: undefined,
      password: undefined,
      nomeUtente: undefined,
      confermaPassword: undefined,
      email: undefined,
      modIscrizione: false,
      termini: false,
      e1: true,
      e2: true
      }
  },
  methods: {
    procedi: function () {
      if (this.modIscrizione) {
        if (this.$refs.formIscrizione.validate()) this.signup(this.email, this.password)
      } else {
        if (this.$refs.formLogin.validate()) this.login(this.email, this.password)
      }
    },
    login: function (Email, Password) {
      auth.signInWithEmailAndPassword(Email, Password).then(
       (user) => {
         //console.log(user)
         this.$store.dispatch('snackbar/create',{
           model: true, 
           label:'Accesso effettuato',
           timeout: 3000, 
           right:true, 
           bottom:true})
       },
       (err) => {
        let label = 'Errore durante l\'accesso';
        if (err.code === 'auth/user-not-found') label = 'Nessun account associato a questo indirizzo'
        if (err.code === 'auth/wrong-password') label = 'Password non corretta' 
        if (err.code === 'auth/network-request-failed') label = 'Errore di comunicazione' 
        this.$store.dispatch('snackbar/create',{
          model: true, 
          label:label,
          timeout: 3000, 
          right:true, 
          bottom:true
        })
       }
      )
    },
    signup: function (Email, Password) {
      auth.createUserWithEmailAndPassword(Email, Password).then(
       (user) => {
          user.user.updateProfile({
            displayName: this.nomeUtente
          })
          user.user.sendEmailVerification()
          this.$store.dispatch('snackbar/create',{
            model: true, 
            label:'Una e-mail di conferma è stata spedita all\'indirizzo indicato',
            timeout: 3000, 
            right:true, 
            bottom:true
          })
       },
       (err) => {
         let label = 'Errore durante l\'iscrizione';
         if(err.code === 'auth/email-already-in-use') label = 'Indirizzo già in uso da un altro account'
         if (err.code === 'auth/network-request-failed') label = 'Errore di comunicazione' 
         this.$store.dispatch('snackbar/create',{
           model: true, 
           label: label,
           timeout: 3000, 
           right:true, 
           bottom:true})
       }
      )
    },
    resetPassword: function () {
      var context = this
      if (this.$refs.emailField.validate()) {
        firebase.auth().sendPasswordResetEmail(this.email).then(function () {
          const label = 'Un email di recupero password è stata mandata al tuo account: ' + context.email
          context.$store.dispatch('snackbar/create',{
           model: true, 
           label: label,
           timeout: 3000, 
           right:true, 
           bottom:true})
        }).catch(function (error) {
          let label = error.message
          if (error.code === 'auth/user-not-found') label = 'Nessun account associato a questo indirizzo'
          context.$store.dispatch('snackbar/create',{
           model: true, 
           label: label,
           timeout: 3000, 
           right:true, 
           bottom:true})
        })
      } else {
        this.$store.dispatch('snackbar/create',{
           model: true, 
           label: 'inserisci un email valida',
           timeout: 3000, 
           right:true, 
           bottom:true})
      }
    },
    confronta: function () {
      if (this.password === this.confermaPassword) {
        return true
      }
      return 'Le password non combaciano'
    }
  },
  created: function () {
  },
  computed: {
    iconafab: function () {
      if (this.modIscrizione) {
        return 'close'
      }
      return 'add'
    },
    confirmPasswordRule: function () {
      var rule = [v => !!v || 'Campo richiesto',
        this.confronta || 'Le password non combaciano']
      return rule
    }
  },
  watch: {
    modIscrizione: function (newmodIscrizione, oldmodIscrizione) {
      if (!newmodIscrizione) {
        this.$refs.formIscrizione.reset()
      } else {
        this.$refs.formLogin.reset()
      }
    }
  }
}
</script>

<style>
.login .card{
  -webkit-transition: max-height 0.5s, background-color 0.5s; /* Safari */
  transition: max-height 0.5s ease-in, background-color 0.5s;
}

.login .card.theme--dark.clicked{
	background-color: #00897B;
}

</style>
