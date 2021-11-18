import axios from 'axios';

export const getItem = async (id) => {
  return await axios.get(`https://openlibrary.org/works/${id}.json`)
    .then(response => {
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      }
      return {};
    })
    .catch(err => {
      console.log(err);
      return {};
    });
};