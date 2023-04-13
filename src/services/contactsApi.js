import axios from 'axios';
axios.defaults.baseURL = 'https://6436c09b8205915d34fbfd41.mockapi.io/api/v1';

export const addContactsApi = contact => {
  return axios.post('/contacts', contact).then(({ data }) => {
    return { ...contact, id: data.id };
  });
};

export const getContactsApi = () => {
  return axios.get('/contacts').then(({ data }) => data);
};

export const removeContactsApi = id => {
  return axios.delete(`/contacts/${id}`).then(() => id);
};
