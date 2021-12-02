import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { api } from '@/utils/services';
import router from '@/router';
import _ from 'lodash';

Vue.use(Vuex);
let notificationId = 1;

export default new Vuex.Store({
  state: {
    collection: [],
    totalItems: 0,
    token: null,
    user: null,
    loading: false,
    query: '',
    pageIndex: 1,
    notifications: [],
  },

  mutations: {
    setCollection(state, payload) {
      state.collection = payload;
    },
    setTotalItems(state, payload) {
      state.totalItems = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setQuery(state, payload) {
      state.query = payload;
    },
    setPageIndex(state, payload) {
      state.pageIndex = payload;
    },
    setUserData(state, data) {
      if (data.token) {
        state.token = data.token;
        localStorage.setItem('token', data.token);
      }
      state.user = _.merge(state.user, data.user);
    },
    pushNotification(state, notification) {
      state.notifications.push({
        ...notification,
        id: notificationId++,
      });
    },
    deleteNotification(state, notificationToRemove) {
      state.notifications = state.notifications.filter(
        notification => notification.id !== notificationToRemove.id,
      );
    },
  },

  actions: {
    fetchCollection({ state, commit }, { query, pageIndex }) {
      // let { query, pageIndex } = payload;
      // console.log(query, pageIndex);
      if (query && (query === state.query) && (pageIndex === state.pageIndex))
        return;
      commit('setQuery', query);
      commit('setPageIndex', pageIndex);
      commit('setLoading', true);
      if (query === '')
        query = 'harry potter';
      let url = 'https://www.googleapis.com/books/v1/volumes';
      let params = {
        q: query,
        startIndex: (pageIndex - 1) * 12,
        maxResults: 12,
        langRestrict: 'en',
      };
      axios.get(url, { params })
        .then(response => {
          if (response.status === 200) {
            commit('setCollection', response.data.items);
            commit('setTotalItems', response.data.totalItems);
          }
          else {
            console.log('Request failed');
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => commit('setLoading', false));
    },
    
    authenticate({ commit, dispatch }, { path, data }) {
      commit('setLoading', true);
      api(path, data)
        .then((response) => {
          // console.log(response);
          if (response.success) {
            commit('setUserData', response);
            router.push({ name: 'Home' });
          }
          dispatch('addNotification', _.pick(response, ['success', 'msg']));
        })
        .catch(() => {
          commit('setUserData', { token: null, user: null });
        })
        .finally(() => commit('setLoading', false));
    },
    autoSignIn({ commit }) {
      return new Promise((resolve) => {
        const token = localStorage.getItem('token');
        if (token) {
          api('/auth/getProfile', {}).then((response) => {
            if (response.success) {
              commit('setUserData', {token, user: response.user});
              // if (response.user.isAdmin) {
              //   router.push({name: 'Admin'});
              // }
              // else {
              //   router.push({name: 'A1'});
              // }
            } else {
              localStorage.removeItem('token');
            }
          })
            .catch(console.log)
            .finally(() => resolve());
        }
        else {
          resolve();
        }
      });
      
    },
    userSignOut({ commit }) {
      commit('setUserData', { token: null, user: null });
      localStorage.removeItem('token');
      location.reload();
    },

    updateUserData({ state, commit, dispatch }, { user }) {
      commit('setLoading', true);
      commit('setUserData', { user });
      
      api('/auth/updateDetails', state.user)
        .then((response) => {
          dispatch('addNotification', _.pick(response, ['success', 'msg']));
        })
        .finally(() => commit('setLoading', false));
    },

    buyBook({ commit }, sellingInfo) {
      commit('setLoading', true);
      commit('setUserData', {
        user: {
          buyer: {
            bought: {
              ...sellingInfo,
              date: new Date(),
            },
          },
        },
      });
      api('/auth/buy', sellingInfo)
        .then((response) => {
          if (response.success) {
            localStorage.setItem('secret', response.secret);
            window.location = response.url;
          }
          // dispatch('addNotification', _.pick(response, ['success', 'msg']));
        })
        .finally(() => commit('setLoading', false));
    },

    setLoading({ commit }, payload) {
      commit('setLoading', payload);
    },
    addNotification({ commit }, notification) {
      commit('pushNotification', notification);
    },
    removeNotification({ commit }, notificationToRemove) {
      commit('deleteNotification', notificationToRemove);
    },
  },

  getters: {
    collection: state => state.collection,
    user: state => state.user,
    loading: state => state.loading,
    getImage: () => item => {
      let defaultImage = 'http://books.google.com/books/publisher/content?id=2wgyBgAAQBAJ&printsec=frontcover&img=1';
      let links = item.volumeInfo.imageLinks;
      let sizes = ['extraLarge', 'large', 'medium', 'small', 'thumbnail', 'smallThumbnail'];
      if (links) {
        for (let size of sizes) {
          if (size in links) 
            return links[size];
        }
      }  
      
      return defaultImage;
    },
    totalItems: state => state.totalItems,
    isAuthenticated: (state) => !!state.token,
    query: state => state.query,
    pageIndex: state => state.pageIndex,
  },
  modules: {},
});
