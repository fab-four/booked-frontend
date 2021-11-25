import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import Alert from '@/components/Alert';
import AsyncComputed from 'vue-async-computed';
import { api } from '@/utils/services';

Vue.use(AsyncComputed);

Vue.config.productionTip = false;
Vue.component('app-alert', Alert);

new Vue({
  router,
  store,
  vuetify,
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      api('/auth/getProfile', {}).then((response) => {
        if (response.success) {
          store.commit('setUserData', {token, user: response.user});
          // if (response.user.isAdmin) {
          //   router.push({name: 'Admin'});
          // }
          // else {
          //   router.push({name: 'A1'});
          // }
        } else {
          localStorage.removeItem('token');
        }
      });
    }
  },
  render: h => h(App),
}).$mount('#app');
