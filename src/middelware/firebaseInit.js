import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase/app';
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import "firebase/firestore";

firebase.initializeApp(firebaseConfig);

Vue.use(VueFire)

const auth = firebase.auth();
const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

export {firebase, auth, db, VueFire}