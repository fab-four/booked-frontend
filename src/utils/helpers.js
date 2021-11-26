import axios from 'axios';
import moment from 'moment';
import store from '../store';
import { api } from './services';

export const getItem = (id) => {
  let item = store.getters.collection.filter(obj => obj.id === id);
  if (item.length)
    return item[0];
  
  let data = {};
  return axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
    .then(response => {
      if (response.status === 200) {
        // console.log(response.data);
        data = response.data;
      }
      return data;
    })
    .catch(err => {
      console.log(err);
      return data;
    });
};

export const getSellers = (id) => {
  let sellers = [];
  return api('/auth/getSellers', { id })
    .then(response => {
      if (response.success) {
        sellers = response.data;
      }
      return sellers;
    })
    .catch(err => {
      console.log(err);
      return sellers;
    });
};

export const getCountries = () => {
  let country = [];
  return axios.get('https://countriesnow.space/api/v0.1/countries/capital')
    .then(response => {
      if (response.status == 200) {
        country = response.data.data.map(obj => obj.name);
      }
      return country;
    })
    .catch(err => {
      console.log(err);
      return country;
    });
};

export const getStates = (country) => {
  let states = [];
  return axios.post('https://countriesnow.space/api/v0.1/countries/states', { country })
    .then(response => {
      if (response.status == 200) {
        states = response.data.data.states.map(obj => obj.name);
      }
      return states;
    })
    .catch(err => {
      console.log(err);
      return states;
    });
};

export const getCities = (country, state) => {
  let cities = [];
  return axios.post('https://countriesnow.space/api/v0.1/countries/state/cities', { country, state })
    .then(response => {
      if (response.status == 200) {
        cities = response.data.data;
      }
      return cities;
    })
    .catch(err => {
      console.log(err);
      return cities;
    });
};

export const getFlag = (country) => {
  let flag = '';
  return axios.post('https://countriesnow.space/api/v0.1/countries/flag/unicode', { country })
    .then(response => {
      if (response.status == 200) {
        flag = response.data.data.unicodeFlag;
      }
      return flag;
    })
    .catch(err => {
      console.log(err);
      return flag;
    });
};

export const formattedDate = (date) => {
  if (Array.isArray(date))
    return date.length ? date.map(val => moment(val).format('DD/MM/YYYY')).join(' ~ ') : '';
  if (date === Object(date))
    return date.from  && date.to ? 
      `${moment(date.from).format('DD/MM/YYYY')} ~ ${moment(date.to).format('DD/MM/YYYY')}` 
      : '';
  return date ? moment(date).format('DD/MM/YYYY') : '';
};