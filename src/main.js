import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
// import 'material-design-icons-iconfont/dist/material-design-icons.css';
// import '@/firebase/';
import Alert from '@/components/Alert';
import AsyncComputed from 'vue-async-computed';

Vue.use(AsyncComputed);
// import firebase from 'firebase/app';

Vue.config.productionTip = false;
Vue.component('app-alert', Alert);

// firebase.auth().onAuthStateChanged(user => {
//   if (user) {
//     store.dispatch('autoSignIn', user);
//   }
// });
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');