import axios from 'axios';
import moment from 'moment';
export const getItem = async (id) => {
  return await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
    .then(response => {
      if (response.status === 200) {
        // console.log(response.data);
        return response.data;
      }
      return {};
    })
    .catch(err => {
      console.log(err);
      return {};
    });
};

export const getCountries = async () => {
  let country = [];
  await axios.get('https://countriesnow.space/api/v0.1/countries/capital')
    .then(response => {
      if (response.status == 200) {
        country = response.data.data.map(obj => obj.name);
      }
    })
    .catch(console.log);
  return country;
};

export const getStates = async (country) => {
  let states = [];
  await axios.post('https://countriesnow.space/api/v0.1/countries/states', { country })
    .then(response => {
      if (response.status == 200) {
        states = response.data.data.states.map(obj => obj.name);
      }
    })
    .catch(console.log);
  return states;
};

export const getCities = async (country, state) => {
  let cities = [];
  await axios.post('https://countriesnow.space/api/v0.1/countries/state/cities', { country, state })
    .then(response => {
      if (response.status == 200) {
        cities = response.data.data;
      }
    })
    .catch(console.log);
  return cities;
};

export const getFlag = async (country) => {
  let flag = '';
  await axios.post('https://countriesnow.space/api/v0.1/countries/flag/unicode', { country })
    .then(response => {
      if (response.status == 200) {
        flag = response.data.data.unicodeFlag;
      }
    })
    .catch(console.log);
  return flag;
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