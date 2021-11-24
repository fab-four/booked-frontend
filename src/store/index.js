import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { api } from '@/utils/services';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collection: [],
    totalItems: 0,
    token: null,
    user: null,
    error: null,
    loading: false,
    query: '',
    index : -1,
  },

  mutations: {
    setCollection(state, payload) {
      state.collection = payload;
    },
    setTotalItems(state, payload) {
      state.totalItems = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setQuery(state, payload) {
      state.query = payload;
    },
    setIndex(state, payload) {
      state.index = payload;
    },
    setUserData(state, data) {
      if (data.token) {
        state.token = data.token;
        localStorage.setItem('token', data.token);
      }
      state.user = Object.assign({}, state.user, data.user);
    },
  },

  actions: {
    fetchCollection({ state, commit }, { query, index }) {
      // let { query, index } = payload;
      // console.log(query, index);
      if ((query === state.query) && (index === state.index))
        return;
      commit('setQuery', query);
      commit('setIndex', index);
      commit('setLoading', true);
      commit('setError', null);
      if (query === '')
        query = 'harry potter';
      let url = 'https://www.googleapis.com/books/v1/volumes';
      let params = {
        q: query,
        startIndex: index,
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
          commit('setLoading', false);
        })
        .catch(error => {
          commit('setError', error);
          commit('setLoading', false);
        });
    },
    
    authenticate({ commit }, { path, data }) {
      commit('setLoading', true);
      commit('setError', null);
      api(path, data)
        .then((response) => {
          if (response.success) {
            commit('setUserData', response);
            router.push({ name: 'Home' });
          }
        })
        .catch(error => {
          commit('setUserData', { token: null, user: null });
          commit('setError', error);
        })
        .finally(() => commit('setLoading', false));
    },

    userSignOut({ commit }) {
      commit('setUserData', { token: null, user: null });
      localStorage.removeItem('token');
      location.reload();
    },

    updateUserData({ commit }, { user, loading = true, message = '' }) {
      commit('setLoading', loading);
      commit('setError', null);
      commit('setUserData', { user });
      api('/auth/updateDetails', user)
        .then((response) => {
          if (response.success) {
            console.log(message);
          }
          else {
            console.log('update failed');
          }
        })
        .catch(error => {
          commit('setError', error);
        })
        .finally(() => commit('setLoading', false));
    },

    clearError({ commit }) {
      commit('setError', null);
    },
    setLoading({ commit }, payload) {
      commit('setLoading', payload);
    },
  },

  getters: {
    collection: state => state.collection,
    user: state => state.user,
    error: state => state.error,
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
  },
  modules: {},
});
