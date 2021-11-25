import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import Alert from '@/components/Alert';
import AsyncComputed from 'vue-async-computed';

Vue.use(AsyncComputed);

Vue.config.productionTip = false;
Vue.component('app-alert', Alert);

new Vue({
  router,
  store,
  vuetify,
  created() {
    store.dispatch('autoSignIn');
  },
  render: h => h(App),
}).$mount('#app');
