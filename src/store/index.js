import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { api } from '@/utils/services';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';
// import router from '@/router';
// import { cloneDeep } from 'lodash';
// import router from '../router';
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
    // favorites: {},
    // item: {}
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
    // setFavorites(state, payload) {
    //   state.favorites = payload;
    // },
    // setItem(state, payload) {
    // 	state.item = payload;
    // }
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
          }
        })
        .catch(error => {
          commit('setUserData', { token: null, user: null });
          commit('setError', error);
        })
        .finally(() => commit('setLoading', false));
    },
    // async fetchFavorites({ state, commit }) {
    //   while (state.loading) await new Promise(r => setTimeout(r, 50));
    //   commit('setLoading', true);
    //   commit('setError', null);
    //   let favorites = cloneDeep(state.favorites);
    //   let favorites_ids = cloneDeep(state.user.favorites);
    //   // console.log(state.user);
    //   let api_url = process.env.VUE_APP_API_URL;
    //   let api_key = process.env.VUE_APP_API_KEY;

    //   let params = { api_key };
    //   let promiseList = [];

    //   for (let type in favorites_ids) {
    //     // filter out user favorites for which data is already present in state favorites
    //     favorites_ids[type] = favorites_ids[type].filter(
    //       id => !(state.favorites[type] || []).some(obj => obj['id'] == id),
    //     );

    //     let url = api_url + type + '/';
    //     favorites_ids[type].map(id => {
    //       promiseList.push(
    //         axios.get(url + id, { params }).then(response => {
    //           if (response.status == 200) {
    //             // console.log('fetched for', type, id);
    //             // console.log(response.data);
    //             if (!favorites[type]) {
    //               favorites[type] = [];
    //             }
    //             favorites[type].push(response.data);
    //           } else {
    //             // console.log('failed for', type, id);
    //           }
    //         }),
    //       );
    //     });
    //   }
    //   Promise.all(promiseList)
    //     .then(() => {
    //       for (let type in favorites) {
    //         favorites[type].map(obj => (obj['type'] = type));
    //       }
    //       commit('setLoading', false);
    //       commit('setFavorites', favorites);
    //     })
    //     .catch(error => {
    //       // console.log(error);
    //       commit('setLoading', false);
    //       commit('setError', error);
    //     });
    // },

    // removeFromFavorites({ state, commit }, { type, id }) {
    //   let favorites = cloneDeep(state.favorites);
    //   if (favorites[type]) {
    //     favorites[type] = favorites[type].filter(obj => obj['id'] != id);
    //   }
    //   commit('setFavorites', favorites);
    //   // console.log(state.favorites);
    // },

    // autoSignIn({ commit, dispatch }, payload) {
    //   commit('setUser', { id: payload.uid, favorites: {} });
    //   dispatch('getUserData');
    // },

    userSignOut({ commit }) {
      commit('setUserData', { token: null, user: null });
      localStorage.removeItem('token');
      location.reload();
    },

    // getUserData({ commit, getters }) {
    //   commit('setLoading', true);
    //   commit('setError', null);
    //   firebase
    //     .database()
    //     .ref('/users/' + getters.user.id)
    //     .once('value')
    //     .then(data => data.val())
    //     .then(userData => {
    //       commit('setUser', { ...getters.user, ...userData });
    //       // console.log(getters.user);
    //       commit('setLoading', false);
    //     })
    //     .catch(error => {
    //       commit('setError', error);
    //       commit('setLoading', false);
    //     });
    // },

    updateUserData({ commit }, { user, loading = true, message = '' }) {
      commit('setLoading', loading);
      commit('setError', null);
      commit('setUserData', { user });
      // console.log(getters.user, userData);
      api('/auth/updateDetails', user)
        .then((response) => {
          if (response.success) {
            console.log(message);
            // commit('setError', { message: message });
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
    isAuthenticated: state => {
      return state.user !== null && state.user != undefined;
    },
    // favorites: state => state.favorites,
  },
  modules: {},
});
