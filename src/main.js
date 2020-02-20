import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex';
import * as VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
export const eventBus = new Vue()
import store from './store/index'
Vue.use(Vuex);
Vue.use(VueFire)
firebase.initializeApp({
  apiKey: "AIzaSyBiCAV7HLZMGjSHqMn-S_o1f7lrmixGvCQ",
  authDomain: "mypr-17866.firebaseapp.com",
  databaseURL: "https://mypr-17866.firebaseio.com",
  projectId: "mypr-17866",
  storageBucket: "mypr-17866.appspot.com",
  messagingSenderId: "193365158587",
  appId: "1:193365158587:web:134c53d61f83c7552dd79e",
  measurementId: "G-7EB0YSDRG7"
})
export const db = firebase.firestore()

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  store
}).$mount('#app')
