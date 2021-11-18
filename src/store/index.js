import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
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
    // user: null,
    error: null,
    loading: false,
    query: null,
    // favorites: {},
    // item: {}
  },

  mutations: {
    setCollection(state, payload) {
      state.collection = payload;
    },
    // setUser(state, payload) {
    //   state.user = payload;
    // },
    setError(state, payload) {
      state.error = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setQuery(state, payload) {
      state.query = payload;
    },
    // setFavorites(state, payload) {
    //   state.favorites = payload;
    // },
    // setItem(state, payload) {
    // 	state.item = payload;
    // }
  },

  actions: {
    fetchCollection({ state, commit }, query) {
      // console.log(query);
      if (query === state.query || (query === '' && state.collection.length))
        return;
      commit('setQuery', query);
      commit('setLoading', true);
      commit('setError', null);
      // let api_url = process.env.VUE_APP_API_URL;
      // let api_key = process.env.VUE_APP_API_KEY;
      // console.log('start fetch');
      // let collection = {};
      // let promiseList = [];

      // fetch trending movies and tv shows of the week
      let url, params;
      if (query === '') {
        url = 'https://openlibrary.org/subjects/new_york_times_bestseller.json';
        axios.get(url).then(response => {
          if (response.status === 200) {
            console.log(response.data);
            commit('setCollection', response.data.works.filter(obj => obj.cover_id));
          }
          else {
            console.log('Request failed');
          }
          commit('setLoading', false);
        })
          .catch(error => {
          // console.log('Some error occurred');
            commit('setError', error);
            commit('setLoading', false);
          });
      }
      else {
        console.log(query);
        url = 'https://openlibrary.org/search.json';
        params = {
          q: query,
          limit: 100,
        };
        axios.get(url, { params })
          .then(response => {
            console.log(response.config.url);
            if (response.status === 200) {
              console.log(response.data);
              commit('setCollection', response.data.docs.filter(obj => obj.ebook_count_i));
            }
            else {
              console.log('Request failed');
            }
            commit('setLoading', false);
          })
          .catch(error => {
            // console.log('Some error occurred');
            commit('setError', error);
            commit('setLoading', false);
          });
      }
      // for (let type of ['tv', 'movie']) {
      //   collection[type] = [];
      //   // let url = api_url,
      //   let params = {};
      //   params['api_key'] = api_key;
      //   if (query) {
      //     url += 'search/' + type;
      //     params['type'] = type;
      //     params['query'] = query;
      //   } else {
      //     url += `trending/${type}/week`;
      //   }

      //   promiseList.push(
      //     axios.get(url, { params }).then(response => {
      //       // console.log(response);
      //       if (response.status == 200) {
      //         collection[type] = response.data.results;
      //         collection[type].map(obj => (obj['type'] = type));
      //         commit('setCollection', collection);
      //       } else {
      //         // console.log('failed');
      //       }
      //     }),
      //   );
      // }
      // Promise.all(promiseList)
      //   .then(() => {
      //     commit('setLoading', false);
      //   })
      //   .catch(error => {
      //     // console.log('Some error occurred');
      //     commit('setError', error);
      //     commit('setLoading', false);
      //   });
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

    // userSignUp({ commit, dispatch }, { email, password, firstName, lastName }) {
    //   commit('setLoading', true);
    //   commit('setError', null);
    //   firebase
    //     .auth()
    //     .createUserWithEmailAndPassword(email, password)
    //     .then(user => {
    //       // console.log('User signed up');
    //       router.go();
    //       const userData = {
    //         id: user.user.uid,
    //         favorites: {},
    //         firstName: firstName,
    //         lastName: lastName,
    //       };
    //       dispatch('updateUserData', { userData: userData });
    //       // router.push({ name: 'Home' });
    //     })
    //     .catch(error => {
    //       commit('setUser', null);
    //       commit('setError', error);
    //       commit('setLoading', false);
    //     });
    // },

    // userSignIn({ commit, dispatch }, { email, password }) {
    //   commit('setLoading', true);
    //   commit('setError', null);
    //   firebase
    //     .auth()
    //     .signInWithEmailAndPassword(email, password)
    //     .then(user => {
    //       // console.log('User signed in');
    //       router.go();
    //       const userData = {
    //         id: user.user.uid,
    //         favorites: {},
    //       };
    //       commit('setUser', userData);
    //       dispatch('getUserData');
    //       // router.push({ name: 'Home' });
    //     })
    //     .catch(error => {
    //       commit('setError', error);
    //       commit('setLoading', false);
    //     });
    // },

    // autoSignIn({ commit, dispatch }, payload) {
    //   commit('setUser', { id: payload.uid, favorites: {} });
    //   dispatch('getUserData');
    // },

    // userSignOut({ commit }) {
    //   commit('setLoading', true);
    //   commit('setError', null);
    //   firebase
    //     .auth()
    //     .signOut()
    //     .then(() => {
    //       // console.log('User signed out');
    //       commit('setUser', null);
    //       commit('setLoading', false);
    //       // router.push({ name: 'Home' }).catch(() => router.go());
    //     })
    //     .catch(error => {
    //       commit('setError', error);
    //       commit('setLoading', false);
    //       // console.log(error);
    //       // router.push({ name: 'Home' }).catch(() => router.go());
    //     });
    // },

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

    // updateUserData({ commit }, { userData, message = '', loading = true }) {
    //   commit('setLoading', loading);
    //   commit('setError', null);
    //   commit('setUser', userData);
    //   // console.log(getters.user, userData);
    //   firebase
    //     .database()
    //     .ref('/users/' + userData.id)
    //     .update(userData)
    //     .then(() => {
    //       commit('setLoading', false);
    //       commit('setError', { message: message });
    //     })
    //     .catch(error => {
    //       commit('setLoading', false);
    //       commit('setError', error);
    //     });
    // },

    clearError({ commit }) {
      commit('setError', null);
    },
    setLoading({ commit }, payload) {
      commit('setLoading', payload);
    },
  },

  getters: {
    collection: state => state.collection,
    // user: state => state.user,
    error: state => state.error,
    loading: state => state.loading,
    getImage: () => id => {
      if (id)
        return `https://covers.openlibrary.org/b/id/${id}-M.jpg`;
      return 'http://books.google.com/books/publisher/content?id=2wgyBgAAQBAJ&printsec=frontcover&img=1';
    },
    // isAuthenticated: state => {
    //   return state.user !== null && state.user != undefined;
    // },
    // favorites: state => state.favorites,
  },
  modules: {},
});
